import re
import random
import string
import sqlparse
import re
from sql_metadata import Parser
import editdistance

# def isNumber(aString):
#     try:
#         float(aString)
#         return True
#     except:
#         return False
#
# # get the description of nouns
# # should input a sub sql expression
# def getNouns(sub_sql, ori_sql):
#     p = Parser(ori_sql)
#     g_p = Parser(ori_sql)
#     temp_subexpression = 'SELECT ' + sub_sql  # adding SELECT is for ignoring the exception
#     p1 = Parser(temp_subexpression)  # get the parser for subexpression
#
#     # lower possible function names
#     functionNames = ['count', 'max', 'min', 'avg', 'sum']
#
#     temp_explanation = ''
#
#     nouns = []
#     noun = ''
#
#     # find all functions and the corresponding paramenters
#     funcs = []
#     paras = []
#     temp_paras = []
#
#     # find the starting position of parameters (after '(' )
#     positions = []
#     for i in range(0, len(p1.tokens)):
#         if p1.tokens[i].value == '(':
#             positions.append(i)
#
#     positions1 = [i + 1 for i in positions]  # move from '(' to the index of parameter
#
#     # get function names (right in front of '(' )
#     for pos in positions:
#         funcs.append(p1.tokens[pos - 1].value.upper())
#
#     # get parameter for this function
#     for pos in positions1:
#         temp_paras = []
#         j = pos
#         while p1.tokens[j].value != ')':
#             if p1.tokens[j].value != ',':
#                 temp_paras.append(p1.tokens[j].value)
#             j += 1
#         paras.append(temp_paras)
#
#     # generate nouns
#     for i in range(0, len(funcs)):
#         noun = ''
#         # if i != 0:
#         #     noun += ', '
#
#         if funcs[i] == 'COUNT':
#             if paras[i][0] == '*':
#                 noun += 'the number'
#             else:
#                 noun += 'the number of '
#         elif funcs[i] == 'MAX':
#             noun += 'the maximum value of '
#         elif funcs[i] == 'MIN':
#             noun += 'the minimum value of '
#         elif funcs[i] == 'AVG':
#             noun += 'the average value of '
#         elif funcs[i] == 'SUM':
#             noun += 'the sum of '
#
#
#         for j in range(0, len(paras[i])):
#             if j != 0:
#                 noun += ' '
#             if paras[i][j] != '*':
#                 noun += paras[i][j]
#
#             # if len(paras) != 1 and j == len(paras)-1:
#             #     noun += 'and'
#
#             # if paras[i][j] != '*':
#             #     noun += paras[i][j]
#             # else:
#             #     if funcs[i] != 'COUNT':
#             #         noun += 'all the information'
#
#         nouns.append(noun)
#
#     # add column not included in functions to nouns
#     for i in range(1, len(p1.tokens)):
#         if p1.tokens[i].is_name and p1.tokens[i].parenthesis_level == 0 and not (p1.tokens[i].value.lower() in functionNames and p1.tokens[i].next_token.value == '('):
#             nouns.append(p1.tokens[i].value)
#             # nouns.insert(0, p1.tokens[i].value)
#         if p1.tokens[i].is_integer and p1.tokens[i].parenthesis_level == 0:
#             nouns.append(p1.tokens[i].value)
#             # nouns.insert(0, p1.tokens[i].value)
#         if p1.tokens[i].value == '*' and p1.tokens[i].parenthesis_level == 0:
#             nouns.append('all')
#             # nouns.insert(0, 'all')
#         # if p1.tokens[i].next_token.is_keyword:
#         #     print("exception: the subexpression should only contain 1 keyword!")
#         #     break
#
#     # add nouns to the explanation
#     for i in range(0, len(nouns)):
#         # if i != 0 and len(nouns) != 2:
#         #     # temp_explanation += ','
#         #     temp_explanation += ' '
#         if i != 0:
#             temp_explanation += ' and'
#             # temp_explanation += ' '
#         temp_explanation += ' '
#         temp_explanation += nouns[i]
#
#     # alias.Y ---> Y of X
#     exp_token = temp_explanation.split()
#     for i in range(0, len(exp_token)):
#         tok = exp_token[i]
#         if '.' in tok:
#             temp_tok = tok.split('.')
#             if len(temp_tok) != 2:
#                 print("exception: . should split it into 2 parts")
#                 break
#             if temp_tok[0] in g_p.tables_aliases.keys():
#                 table_name = g_p.tables_aliases[temp_tok[0]]
#             else:
#                 table_name = temp_tok[0]
#             # hold the comma
#             comma = ''
#             if ',' in temp_tok[1]:
#                 comma = ','
#                 temp_tok[1] = temp_tok[1].replace(',', '')
#             # Y of X
#             res_str = temp_tok[1] + ' of ' + table_name + comma
#             exp_token[i] = res_str
#
#     temp_explanation = ' '.join(exp_token)
#
#     # try:
#     #
#     # except Exception:
#     #     # print(Exception)
#     #     pass
#
#
#
#     return temp_explanation
#
#
#
# # ori_sql = 'SELECT template_type_description FROM Ref_template_types WHERE template_type_code  =  TOM GROUP BY people'
# # sub_sql = 'FROM Ref_template_types join asp as T1'
# # # sub_sql = 'WHERE template_type_code  =  TOM'
# # # sub_sql = 'GROUP BY people asc limit 1'
# #
# # nouns = getNouns(sub_sql, ori_sql)
# #
# # print(nouns)
#
#
# import difflib
#
# url1 = ['1', '2', '3']
# url1 = ['1', '4', '3']
#
# url1 = "hhselect a from b psspp\nhehloo"
# url2 = "hhselect psspp"
#
# url1 = url1.splitlines()
#
# print(url1)
#
# # d = difflib.Differ()
# # diff = d.compare(url1.splitlines(), url2.splitlines())
# # # diff_list = list(diff)
# #
# # print('\n'.join(list(diff)))

# needleman - wunsch 算法


# def needleman_wunsch(label, pred):
#     m = len(label)
#     n = len(pred)
#     dp = [[1] * n for i in range(m)]
#     for i in range(m):
#         if pred[0] != label[i]:
#             dp[i][0] = 0
#         else:
#             break
#     for j in range(n):
#         if pred[j] != label[0]:
#             dp[0][j] = 0
#         else:
#             break
#
#     for i in range(1, m):
#         for j in range(1, n):
#             if pred[j] == label[i]:
#                 dp[i][j] = dp[i - 1][j - 1] + 1
#             else:
#                 dp[i][j] = max(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
#     return dp
#
#
# def traceback(label, pred, dp):
#     m = len(dp)
#     n = len(dp[0])
#     outLabel = []
#     outPred = []
#     i, j = m - 1, n - 1
#     while i > 0 and j > 0:
#         # 需要加上label[i]==pred[j]的判断，要不然 类似"BBA"和"BAA"这种情况会出错
#         if dp[i - 1][j] == dp[i][j - 1] or label[i] == pred[j]:
#             outLabel.append(label[i])
#             outPred.append(pred[j])
#             i -= 1
#             j -= 1
#         elif dp[i - 1][j] > dp[i][j - 1]:
#             outLabel.append(label[i])
#             outPred.append("_")
#             i -= 1
#         else:
#             outLabel.append("_")
#             outPred.append(pred[j])
#             j -= 1
#
#     while i > 0:
#         if label[i] == pred[j]:
#             outLabel.append(label[i])
#             outPred.append(pred[j])
#             i -= 1
#             j -= 1
#         else:
#             outLabel.append(label[i])
#             outPred.append("_")
#             i -= 1
#
#     while j > 0:
#         if pred[j] == label[i]:
#             outLabel.append(label[i])
#             outPred.append(pred[j])
#             i -= 1
#             j -= 1
#         else:
#             outLabel.append("_")
#             outPred.append(pred[j])
#             j -= 1
#
#     if i == 0 and j == 0:
#         outLabel.append(label[i])
#         outPred.append(pred[j])
#     elif i == 0:
#         outLabel.append(label[i])
#         outPred.append("_")
#     elif j == 0:
#         outLabel.append("_")
#         outPred.append(pred[j])
#
#     return outLabel, outPred
#
#
# y_true = "GCATGCU"
# y_pred = "GATTACA"
#
# y_true = "Get the id of student"
# y_pred = "Get the name, id of student"
#
#
# y_true = y_true.split()
# y_pred = y_pred.split()
#
# dp = needleman_wunsch(y_true, y_pred)
# print("最长公共子串：", dp[-1][-1])
# outLabel, outPred = traceback(y_true, y_pred, dp)
# print(outLabel[::-1])
# print(outPred[::-1])
#
#
# # ignore ',' , 'and', get

# import json
#
# data_dir = '../../dataset/original/spider/dev.json'
#
# with open(data_dir) as f:
#     data = json.load(f)
#
# print(len(data))

dict = [{'db': 'bbbas', 'age':3}, {'db': 'hello', 'age':3}, {'db': 'aaaa', 'age':36}, {'db': 'xxx', 'age':88}]

dict = sorted(dict, key=lambda dict: dict['db'])

print(dict)
