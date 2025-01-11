"""
Project: SQLucid
Author: Yuan Tian
Github: https://github.com/magic-YuanTian/SQLucid
"""


import copy
import os
import sys
import time
import sqlite3
from flask import Flask, render_template, g, session, jsonify, request
from flask import render_template
from flask import Blueprint
from flask import url_for
from json import *
from flask_cors import CORS, cross_origin
import json
import datetime, time
from backend.SQL2NL.SQL2NL import *
import numpy as np
import json
from openai_api import *




# read the json file under 'spider_schema_json/' directory, and return the dict as the schema
def get_db_schema(db_id):
    schema = {}
    try:
        f_name = 'spider_schema_json/' + db_id + '.json'
        with open(f_name, 'r') as f:
            schema = json.load(f)
    except Exception as e:
        print(e)
    return schema
    

def inference(question, db_id):
    """Generate a SQL query based on a natural language question and database ID."""
    schema = get_db_schema(db_id)
    


        
    messages=[
        {"role": "system", "content": "You are an expert SQL query generator. Your task is to create accurate SQL queries based on natural language requests, considering the given database schema."},
        {"role": "user", "content": f"\n### SCHEMA ###\n{schema}\n\n### NATURAL LANGUAGE QUESTION ###\n{question}\n\n### OBJECTIVE ###\nBased on the provided database schema and natural language question, please generate a SQL query to answer the question. Please make sure a SQL query even you are not sure about the answer.\n### FORMAT ###\nPlease include the SQL query in the following format:\n```sql\n<your generated SQL query here>\n```"}
    ]
    
    response_content = get_openai_response(messages)
    
    print('response_content: ', response_content)
    
    sql = extract_sql(response_content)  # extract the SQL query from the response
    sql = postprocess_sql(sql)  # postprocess the SQL query
    
    return sql
    # except Exception as e:
    #     print(f"Error generating SQL with OpenAI API: {e}")
    #     return ""



def clause_inference(question, db_id):
    """Convert a natural language explanation to a specific SQL clause."""
    schema = get_db_schema(db_id)
    
    print('-' * 50)
    print('###### question: ', question)
    print('-' * 50)
    
    
    try:
        
        messages=[
            {"role": "system", "content": "You are an expert SQL clause generator. Your task is to convert natural language explanations into specific SQL clauses (SELECT, FROM, WHERE, GROUP BY, ORDER BY), considering the given database schema."},
            {"role": "user", "content": f"\n### SCHEMA ###\n{schema}\n\n### NATURAL LANGUAGE QUESTION ###\n{question}\n\n### OBJECTIVE ###\nBased on the provided database schema and natural language explanation, please convert the explanation into a specific SQL clause. Determine the appropriate clause type (SELECT, FROM, WHERE, GROUP BY, or ORDER BY) based on the explanation. ### FORMAT ###\nPlease include the SQL clause in the following format:\n```sql\n<your generated SQL clause here>\n```Please keep in mind this is a specific SQL clause, not a full SQL query."},
        ]
        
        response_content = get_openai_response(messages)

        sql_clause = extract_sql(response_content)  # extract the SQL clause from the response
        sql_clause = postprocess_sql(sql_clause)  # postprocess the SQL clause
        return sql_clause
    except Exception as e:
        print(f"Error generating SQL clause with ChatGPT: {e}")
        return ""


# helper function to extract SQL query from the response
# between ```sql and ```
def extract_sql(response):
    sql = response.split('```sql')[1].split('```')[0].strip()
    return sql

def postprocess_sql(sql):
    # remove ; at the end of the SQL query
    sql = sql.strip()
    if sql.endswith(';'):
        sql = sql[:-1]
    # remove extra spaces
    # sql = ' '.join(sql.split())
    return sql



main = Blueprint('main', __name__, template_folder='templates', static_folder='static', static_url_path="/static")


def creat_app():
    app = Flask(__name__, template_folder="backend/templates", static_folder="backend/static", static_url_path="/backend/static")
    CORS(app)
    print('CORS!')
    # register blue print
    # from backend import main
    app.register_blueprint(main)
    app.config['SECRET_KEY'] = '...generate own secret key'
    app.debug = True
    # db.init_app(app)
    return app

@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def index(path):
  return render_template('index.html')

# initialize db_ids and table ids
@main.route('/initID', methods=['GET', 'POST'])
def initID():
    try:
        db_id_list = os.listdir('DBjson')
    except Exception as e:
        print(e)
        print(os.getcwd())
        # move to correct directory
        os.chdir("../..")


    json_list = []

    for db in db_id_list:
        temp_dict = {
            'db': db,
            'table': [],
            # 'column': [],
        }
        table_id_list = os.listdir('DBjson/' + db)
        for table in table_id_list:
            pure_tb = table.replace('.json', '')
            temp_dict['table'].append(pure_tb)


        temp_dict['table'] = [tb.replace('_', ' ') for tb in temp_dict['table']]  # remove '_' in table names
        json_list.append(temp_dict)

    # store the list globally
    G_DB_TB_list = json_list.copy()
    # alphabetically sort the list
    G_DB_TB_list = sorted(G_DB_TB_list, key=lambda dict:dict['db'])

    print(G_DB_TB_list)

    result_json = {
        "message": G_DB_TB_list,
        "time": time.asctime(time.localtime(time.time()))
    }

    return(jsonify(result_json))


# return an answer from the server regarding the question
@main.route('/question', methods=['GET', 'POST'])
def question():
    # msg = request.json['dataSend']['a'] # send json: variable name + keys...
    msg = request.data.decode('UTF-8') # string directly in body
    print(msg)

    answer = 'A SQL query has been successfully generated. Please check the query result and its explanation below. You can modify the explanation of each query step to correct mistakes and regenerate the SQL query.'
    answer = 'Sure! Please check and modify the explanation below.'

    messages = [
        {"role": "system", "content": "You are a helpful assistant who is familiar with SQL queries. Your task is to provide initial response to user queries and guide them read the explanaiton that will be generated in the 'Query Explanation' panel. Don't worry about generating SQL queries. Don't discuss SQL queries. Just focus on guidence and high-level concise responses. If users ask a query question which can be converted to a SQL query, please respond ending with 'Please check and modify the explanation below.'\nYou should not ask any follow-up questions."},
        {"role": "user", "content": msg}
    ]
    
    # get the response from OpenAI
    response_content = get_openai_response(messages)

    result_json = {
        "message": response_content,
        "time": time.asctime(time.localtime(time.time()))
    }

    return(jsonify(result_json))

# return a json of table content
@main.route('/getTable', methods=['GET', 'POST'])
def getTable():
    print('Get the table content')

    print('-' * 50)
    print(request.json)
    print('-' * 50)
    
    # receive db_id and table from the client
    dbid = request.json['dbid']
    tableid = request.json['tableid'].replace(' ', '_')

    db_dict = request.json['dict']

    column_list = request.json['col_list']

    # for getting the database dict
    table_list = request.json['tb_list']

    dict_flag = request.json['dict_flag']

    print(dict_flag)

    # only do this at the first time
    if dict_flag:
        db_dict = {}  # empty it
        column_list = []
        for tb in table_list:
            tb = tb.replace(' ', '_')
            f_name = 'DBjson/' + dbid + '/' + tb + '.json'

            with open(f_name, 'r') as ff:
                # the content of table (which is a dictionary list)
                print('open file:  ' + f_name)
                tb_content = json.load(ff)

                # get columns
                if len(tb_content) > 0:
                    col_list = list(tb_content[0].keys())
                else:
                    col_list = []

                col_list = [c.replace('_', ' ') for c in col_list]  # remove '_' in column name

                db_dict[tb] = copy.deepcopy(col_list)
                column_list += col_list


    # get table content
    file_name = 'DBjson/' + dbid + '/' + tableid + '.json'
    print(file_name)


    table_content = {}
    with open(file_name, 'r') as f:
        # the content of table (which is a dictionary list)
        print('open file:  ' + file_name)
        table_content = json.load(f)



    # add unique id to the rows in the table

    haveID = False # used to indicate if 'id' is original key

    if len(table_content) > 0:
        if 'id' not in table_content[0].keys():
            for i in range(len(table_content)):
                table_content[i]['id'] = i
        else:
            haveID = True

    result_json = {
        "message": table_content,
        'columns': column_list,
        'db_dict': db_dict,
        "haveID": haveID,
        "time": time.asctime(time.localtime(time.time()))
    }

    return (jsonify(result_json))

# return a json of query result
@main.route('/getQueryResult', methods=['GET', 'POST'])
def getQueryResult():
    print('Get query result')

    # get dbid + question
    question = request.json['question']
    dbid = request.json['dbid']

    sql = inference(question, dbid)

    print('#' * 50)
    print('Generated SQL:')
    print(sql)
    print('#' * 50)
    
    result_json = executeDB(dbid, sql)
    print(result_json)

    # result_json = [{'name': 'Tom', 'age': 36}]

    haveID = False # used to indicate if 'id' is original key

    if len(result_json) > 0:
        if 'id' not in result_json[0].keys():
            for i in range(len(result_json)):
                result_json[i]['id'] = i
        else:
            haveID = True

    result = {
        "result": result_json,
        "sql": sql,
        "haveID": haveID,
    }

    result_json = {
        "message": result,
        "time": time.asctime(time.localtime(time.time()))
    }

    return (jsonify(result_json))


# return a json of query result
@main.route('/regenerateQueryResult', methods=['GET', 'POST'])
def regenerateQueryResult():
    print('regenerate query result')

    # get dbid + question
    sql = request.json['sql']
    dbid = request.json['dbid']


    result_json = executeDB(dbid, sql)
    print(result_json)

    haveID = False # used to indicate if 'id' is original key

    if len(result_json) > 0:
        if 'id' not in result_json[0].keys():
            for i in range(len(result_json)):
                result_json[i]['id'] = i
        else:
            haveID = True

    result = {
        "result": result_json,
        "sql": sql,
        "haveID": haveID,
    }

    result_json = {
        "message": result,
        "time": time.asctime(time.localtime(time.time()))
    }

    return (jsonify(result_json))

# intermediate results
# give all current info as well as a range number
# merge all subexpressions before this number
# execute this SQL query on database and return the result table
@main.route('/intermediateResults', methods=['GET', 'POST'])
def intermediateResults():
    # msg = request.json
    dbid = request.json['dbid']
    SQLs = request.json['sql']
    range_num = request.json['range']

    # assume there is no SQL composition
    i = 0
    explanation = SQLs[i]["explanation"]
    subs = []
    for j in range(range_num):
        sub = explanation[j]['subexpression']
        if sub != '...':
            subs.append(sub)

    # merge subexpressions before range_num
    # final_SQL = mergeSQL(subs, dbid)
    # final_SQL = composeSQL(subs, dbid)
    final_SQL = simpleCompose(subs)

    print("Intermediate composed SQL:")
    print(final_SQL)

    # execute this intermediate SQL query
    result_json = executeDB(dbid, final_SQL)
    print(result_json)

    haveID = False  # used to indicate if 'id' is original key

    if len(result_json) > 0:
        if 'id' not in result_json[0].keys():
            for i in range(len(result_json)):
                result_json[i]['id'] = i
        else:
            haveID = True

    result = {
        "result": result_json,
        # "sql": sql,
        "haveID": haveID,
    }

    result_json = {
        "message": result,
        "intermediateSQL": final_SQL,
        "time": time.asctime(time.localtime(time.time()))
    }

    return (jsonify(result_json))


def simpleModification(old_exp, new_exp, old_sub):
    # # if explanations are the same, no need to modify
    # if old_exp.lower() == new_exp.lower():
    #     return old_sub

    old_tok_list = old_exp.split()
    new_tok_list = new_exp.split()

    new_sub = old_sub

    if len(old_tok_list) == len(new_tok_list):
        for i in range(len(old_tok_list)):
            if new_tok_list[i] != old_tok_list[i]:
                if old_tok_list[i] in old_sub:
                    new_sub = new_sub.replace(old_tok_list[i], new_tok_list[i])
                else:
                    return False

        return new_sub

    else:
        if len(old_tok_list) > len(new_tok_list):

            # check if all tokens in the new_tok_list are in old_tok_list
            all_in_flag = True
            for tok in new_tok_list:
                if tok not in old_tok_list:
                    all_in_flag = False

            if all_in_flag:
                # get the removed tokens
                removed_tok_list = []
                for tok in old_tok_list:
                    if tok not in new_tok_list:
                        removed_tok_list.append(tok)

                for tok in removed_tok_list:
                    comma_tok = ', ' + tok
                    if comma_tok in new_sub:
                        new_sub = new_sub.replace(comma_tok, '')
                    elif tok in new_sub:
                        new_sub = new_sub.replace(tok, '')
                    else:
                        return False

                return new_sub
            else:
                return False

    return False



# regenerate the SQL based on the user's feedback explanation
@main.route('/regenerate', methods=['GET', 'POST'])
def regenerate():
    print(os.getcwd())
    os.chdir("backend/SQL2NL")

    print('Regenerating..')

    # get explanations ...
    msg = request.json
    dbid = request.json['dbid']
    SQLs = request.json['sql']
    previous_SQLs = request.json['previous_generated_explanation']
    old_entire_SQL = request.json['entire_SQL']

    cur_tick = time.time()
    duration = cur_tick - msg['ticks']

    # For each time the user click regenerate button, log all the interaction records into a local file
    log_record = msg.copy() # the record to be logged is a dictionary
    del log_record['sql']
    del log_record['ori_subs']
    del log_record['ticks']
    log_record['original explanations'] = msg['ori_subs']
    log_record['edited explanations'] = msg['sql']
    log_record['duration'] = duration
    # add time stamp to the record (time stamp as record ID)
    cur_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_record['time'] = cur_time
    temp_str = json.dumps(log_record) # convert dictionary to string and store it into the file
    File_path = "Interaction_log.json"
    log_File = open(File_path, "a")
    log_File.write(temp_str)
    log_File.write('\n')
    log_File.close()

    final_SQL_list = []

    for i in range(len(SQLs)):
        explanation = SQLs[i]["explanation"]

        if i < len(previous_SQLs):
            previous_explanation = previous_SQLs[i]["explanation"]
        else:
            previous_explanation = []

        subs = []
        for j in range(len(explanation)):
            exp = explanation[j]['explanation']

            if j < len(previous_explanation):
                prev_exp = previous_explanation[j]['explanation']
                prev_sub = previous_explanation[j]['subexpression']
            else:
                prev_exp = ''
                prev_sub = ''



            if exp == '': # in case the user input empty explanation
                new_sub = ''
                SQLs[i]["explanation"][j]['subexpression'] = new_sub
                continue
            else:


                # if the explanation doesn't change, use the original subexpression
                # find the same explanation from the original SQLs
                temp_search_flag = False
                for temp_exp_struct in previous_SQLs:
                    if temp_search_flag:
                        break
                    for temp_exp_struct2 in temp_exp_struct['explanation']:
                        # if the explanation-subexpression are the same, this explanation is guaranteed not changed
                        if temp_exp_struct2['explanation'].lower() == exp.lower() and temp_exp_struct2['subexpression'] == SQLs[i]["explanation"][j]['subexpression']:
                            new_sub = temp_exp_struct2['subexpression']
                            temp_search_flag = True
                            break

                # if this is a new explanation, generate the subexpression from scratch (using the model)
                # 1. simple modification 2. use the nl2sub model
                if not temp_search_flag:
                    # previous_explanation
                    simple_mod_res = simpleModification(prev_exp, exp, prev_sub)

                    # if simple modification return false, use the model
                    if simple_mod_res:
                        new_sub = simple_mod_res
                    else:
                        new_sub = clause_inference(exp, dbid)

                SQLs[i]["explanation"][j]['subexpression'] = new_sub
                subs.append(new_sub)

        # final_SQL.append(simpleConcatenate(subs))

        composed_sql = simpleCompose(subs)
        composed_sql = addQuotes(composed_sql)
        final_SQL_list.append(composed_sql)

    os.chdir("../..")



    # replace the old subquery with the new subquery in the old entire SQL

    if len(final_SQL_list) != len(SQLs):
        raise Exception('the number of regenerated subqueries should be equal to old subqueries')

    if len(final_SQL_list) == 1:
        final_SQL = final_SQL_list[0]
    # IEU
    else:
        final_SQL = SQLUnifiedProcess(old_entire_SQL)
        for idx in range(len(final_SQL_list)):
            temp = SQLUnifiedProcess(SQLs[idx]['subquery'])
            if temp in final_SQL:
                final_SQL = final_SQL.replace(temp, final_SQL_list[idx])
            else:
                # find the most matched part using edit distance
                matched_part = mostMatchedSubstring(final_SQL, temp)
                final_SQL = final_SQL.replace(matched_part, final_SQL_list[idx])


    print("new merged SQL: ", final_SQL)

    result_json = {
        "message": SQLs,
        "finalSQL": final_SQL,
        "ticks": time.time(),
        "time": time.asctime(time.localtime(time.time()))
    }
    return (jsonify(result_json))

# return structured explanation
@main.route('/getExplanation', methods=['GET', 'POST'])
def getExplanation():
    print('Get structured explanation..')

    # msg = request
    sql = request.json['sql']

    print('SQL from front end:')
    print(sql)

    result_explanation = sql2nl(sql)

    result_json = {
        "message": result_explanation,
        "ticks": time.time(),
        "time": time.asctime(time.localtime(time.time()))
    }
    return (jsonify(result_json))

# execute sql on the target database
def executeDB(dbname, sql):
    table_id = dbname
    path = "dataset/database/" + '{}/{}.sqlite'.format(table_id, table_id)
    print("\n" + path)
    conn = sqlite3.connect(path)
    cursor = conn.cursor()


    result = []

    try:
        executed_sql = addCollateNocase(sql)
        print(executed_sql)
        cursor.execute(executed_sql)
        results = cursor.fetchall()

        # extract information from results to result_dict

        # get the title name (description)
        description = []
        for tup in cursor.description:
            description.append(tup[0].lower())

        list = []  # which will be converted to json later

        for res in results:
            temp_dict = {}
            for j in range(0, len(description)):
                temp_dict[description[j]] = res[j]
            # print(temp_dict)
            list.append(temp_dict)


        result = list

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print('\n' + message)
        pass

    # close the database
    conn.close()

    return result


app = creat_app()

if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=3501, debug=False)
    app.run(host='0.0.0.0', port=5001, debug=False)


