# transform spider dataset to structured explanation dataset
import json
from SQL2NL import *
from spiderData.process_sql import *
from spiderData.preprocess.parse_sql_one import *
from sql_metadata import Parser
import sqlparse


def isNumber(aString):
    try:
        float(aString)
        return True
    except:
        return False

# input: a sql
# return a no value token list
def removeValue(sql):
    # recognize the value: (1) number (2) quote

    tokens = sql.split('')

    for i in range(len(tokens)):
        # check if it is int
        if tokens[i].isdigit():
            tokens[i] = 'value'
            continue
        # check if it is float
        try:
            temp = float(tokens[i])
            tokens[i] = 'value'
            continue
        except ValueError:
            continue
        # check if it is quoted

    return result


input_path = 'dataset/spider/dev.json'
output_path = 'structured_dataset/dev.json'

input_path = 'dataset/spider/train_spider.json'
output_path = 'structured_dataset/train_spider.json'

input_path = 'dataset/spider/train_others.json'
output_path = 'structured_dataset/train_others.json'

# print(high_level_explanation)
# print(g_p)

with open(input_path) as load_f:
    load_dict = json.load(load_f)

# which will be stored as a json file
json_output = []

counter = 0
drop_num = 0

# for each data example, decompose it using SQL2NL
for cnt in range(0, int(len(load_dict))):
# for cnt in range(0, 1):

    data = load_dict[cnt]
    print(cnt)
    sql = data['query']

    # drop the data which contains IEU
    # if sql.lower().count('intersect') > 0 or sql.count('INTERSECT') > 0 or sql.count('union') > 0 or sql.count('UNION') > 0 or sql.count('except') > 0 or sql.count('EXCEPT') > 0:
    #     drop_num += 1
    #     continue
    # drop nested SQL
    if sql.lower().count('select ') > 1:
        drop_num += 1
        continue

    sql = sql.strip('; ')

    # keep " and ', replace back later
    sql = sql.replace('\"', 'quote12345symbol')
    sql = sql.replace('\'', 'quote12345symbol')

    parser = Parser(sql)
    ori_list = []
    # parser to token list
    for tok in parser.tokens:
        temp_str = tok.value
        temp_str = temp_str.lower()
        temp_str = temp_str.strip("\'")

        if isNumber(temp_str): # solve the confliction between float and .
            ori_list.append(temp_str)
        elif '.' in temp_str:
            firstPart = temp_str.split('.')[0].lower()
            table_list = parser.tables
            alias_list = parser.tables_aliases.keys()
            # lower them
            table_list = [tb.lower() for tb in table_list]
            alias_list = [als.lower() for als in alias_list]

            if firstPart in table_list or firstPart in alias_list:
                temp_str = temp_str.replace('.', ' . ')  # [X.Y] -> [X, ., Y]

            temp_str = temp_str.replace('(', ' ( ')  # (*) -> ( * )
            temp_str = temp_str.replace(')', ' ) ')  # (*) -> ( * )
            temp_str = temp_str.replace('=', ' = ')  # != -> ! =
            temp_str_l = temp_str.split()
            for tempTok in temp_str_l:
                ori_list.append(tempTok)
        elif '(' in temp_str or ')' in temp_str or 'order by' in temp_str or 'group by' in temp_str or '=' in temp_str or 'not in' in temp_str or 'not like' in temp_str:
            temp_str = temp_str.replace('(', ' ( ')  # (*) -> ( * )
            temp_str = temp_str.replace(')', ' ) ')  # (*) -> ( * )
            temp_str = temp_str.replace('=', ' = ')  # != -> ! =
            temp_str_l = temp_str.split()
            for tempTok in temp_str_l:
                ori_list.append(tempTok)
        else:
            ori_list.append(temp_str)



    # build the set of value in the original sql
    set_of_value = set()
    # preprocess the original token list
    # sql = sql.replace('.', ' . ') # [X.Y] -> [X, ., Y]
    # sql = sql.replace('(', ' ( ')  # (*) -> ( * )
    # sql = sql.replace(')', ' ) ')
    # sql = sql.replace('=', ' = ')
    # # sql = preprocessSQL(sql)
    # sql = sql.lower() # lower
    # ori_list = sql.split() # get the token list


    no_value_list = data['query_toks_no_value']
    # compare query_toks and query_toks_no_value
    if len(ori_list) != len(no_value_list):
        print(ori_list)
        print(no_value_list)
        # raise Exception("length are not equal, cannot compare!")
    else:
        for k in range(len(ori_list)):
            if ori_list[k] != no_value_list[k]:
                if no_value_list[k] == 'value':
                    set_of_value.add(ori_list[k])
                else:
                    print(ori_list)
                    print(no_value_list)
                    raise Exception("there should be no other case, check here!")

    sql = ' '.join(ori_list)
    # replace back for "
    sql = sql.replace('quote12345symbol', '\"')

    sql0 = sql
    sql = removeAlias(sql)

    if 't1' in sql.lower():
        raise Exception("there should be no other case, check here!")

    print(sql)
    sql1 = sql
    print(sql1)
    try:
        # g_dict = {}
        highLevelResult = []
        highLevelResult = oneTimeDecompose(sql1)
    except:
        drop_num += 1
        continue
    for subquery in highLevelResult:
        # parse the subquery and get the parsed sql structure
        # db_id = data["db_id"]
        # schemas, db_names, tables = get_schemas_from_json('tables.json')
        # schema = schemas[db_id]
        # table = tables[db_id]
        # schema = Schema(schema, table)
        # sql_label = get_sql(schema, sql1)

        sql_label = data["sql"]
        ori_query = data["query"]
        ori_question = data["question"]
        if not isinstance(subquery['explanation'], str):
            subexpressions = subquery['explanation'][0]
            explanations = subquery['explanation'][1]
            # lower subexpression again
            subexpressions = [tok.lower() for tok in subexpressions]

            for i in range(len(subexpressions)):
                # construct empty parsed sql
                parsed_sql = {
                    "from": {
                        "table_units": [],
                        "conds": []
                    },
                    "select": [],
                    "where": [],
                    "groupBy": [],
                    "having": [],
                    "orderBy": [],
                    "limit": None,
                    "intersect": None,
                    "union": None,
                    "except": None
                }

                # construct query_toks and query_toks_no_value
                queryToks = subexpressions[i].split()
                queryToksNoValue = []
                for j in range(len(queryToks)):
                    if queryToks[j] in set_of_value:
                        queryToksNoValue.append('value')
                    else:
                        queryToksNoValue.append(queryToks[j])

                # construct parsed sql
                temp_subexpression = subexpressions[i].lower()
                if 'where ' in temp_subexpression:
                    parsed_sql['where'] = sql_label['where']
                elif 'group by ' in temp_subexpression:
                    parsed_sql['groupBy'] = sql_label['groupBy']
                    parsed_sql['having'] = sql_label['having']
                elif 'order by ' in temp_subexpression:
                    parsed_sql['orderBy'] = sql_label['orderBy']
                    parsed_sql['limit'] = sql_label['limit']
                elif 'select ' in temp_subexpression and 'from ' in temp_subexpression:
                    parsed_sql['select'] = sql_label['select']
                    parsed_sql['from'] = sql_label['from']

                # construct the data dictionary
                data_piece = {
                    "db_id": data['db_id'],
                    "query": subexpressions[i],
                    "query_toks": queryToks,
                    "query_toks_no_value": queryToksNoValue,
                    "question": explanations[i],
                    "question_toks": explanations[i].split(),
                    "sql": parsed_sql,
                    "original_sql": ori_query,
                    "original_question": ori_question,
                    "instance_id": counter,
                }

                counter += 1
                json_output.append(data_piece)


with open(output_path, 'w') as out_f:
    outputFile = json.dumps(json_output)
    out_f.write(outputFile)

print('data number: ', counter)
print('dropped data: ', drop_num)