{/*
Project: SQLucid
Author: Yuan Tian
Github: https://github.com/magic-YuanTian/SQLucid
*/}


import * as React from 'react';

import { AccessAlarm, ThreeDRotation, TimerSharp } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Button } from '@mui/material';


import { DataGrid, gridColumnReorderDragColSelector } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import Chatbot from './Chatbot';
import { ActionRequest, AudioActionResponse, ChatController, FileActionResponse, MuiChat } from 'chat-ui-react';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Icon from '@mui/material/Icon';

import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Highlight from 'react-highlight'



import { createRegexRenderer, RichTextarea } from "rich-textarea";





const script1 = document.createElement("script");
script1.src = "https://unpkg.com/react@17/umd/react.development.js";
script1.async = true;
document.head.appendChild(script1);

const script2 = document.createElement("script");
script2.src = "https://unpkg.com/react-dom@17/umd/react-dom.development.js";
script2.async = true;
document.head.appendChild(script2);

const script3 = document.createElement("script");
script3.src = "https://unpkg.com/@mui/material@v5/umd/material-ui.development.js";
script3.async = true;
document.head.appendChild(script3);

const script4 = document.createElement("script");
script4.src = "https://unpkg.com/chat-ui-react@latest/dist/browser/chat-ui-react.umd.polyfill.js";
script4.async = true;
document.head.appendChild(script4);

const script5 = document.createElement("script");
script5.src = "https://unpkg.com/@babel/standalone@7/babel.min.js";
script5.async = true;
document.head.appendChild(script5);



const globalURL = "http://localhost:5001"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Chatbot(props) {
  const [chatCtl] = React.useState(new ChatController());

  React.useMemo(async () => {
    await chatCtl.addMessage({
      type: 'text',
      content: `Please input your question.`,
      self: false,
    });

    chatCtl.setActionRequest({ type: 'text', always: true }, (res) => {
      props.handleQuestion(res.value);

      fetch(globalURL + '/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: res.value
      }).then(response => response.json())
        .then((json) => {
          chatCtl.addMessage({
            type: 'text',
            content: `${json.message}`,
            self: false,
          });
        })
    });
  }, [chatCtl]);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      boxSizing: 'border-box',
    }}>
      <MuiChat
        chatController={chatCtl}
        sx={{
          width: '100%',
          height: '100%',
          '& .MuiPaper-root': {
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiList-root': {
            padding: '16px',
          },
          '& .MuiListItem-root': {
            marginBottom: '8px',
          },
          '& .MuiTypography-root': {
            fontSize: '14px',
          },
          '& .MuiInputBase-root': {
            marginTop: '8px',
          },
          '& .MuiButton-root': {
            borderRadius: '20px',
          },
        }}
      />
    </Box>
  );
}

var autoTextarea = function (elem, extra, maxHeight) {
  extra = extra || 0;
  var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
    addEvent = function (type, callback) {
      elem.addEventListener ?
        elem.addEventListener(type, callback, false) :
        elem.attachEvent('on' + type, callback);
    },
    getStyle = elem.currentStyle ? function (name) {
      var val = elem.currentStyle[name];
      if (name === 'height' && val.search(/px/i) !== 1) {
        var rect = elem.getBoundingClientRect();
        return rect.bottom - rect.top -
          parseFloat(getStyle('paddingTop')) -
          parseFloat(getStyle('paddingBottom')) + 'px';
      };

      return val;

    } : function (name) {
      return getComputedStyle(elem, null)[name];

    },

    minHeight = parseFloat(getStyle('height'));

  elem.style.resize = 'none';






  var change = function () {
    var scrollTop, height,

      padding = 0,

      style = elem.style;

    if (elem._length === elem.value.length) return;

    elem._length = elem.value.length;

    if (!isFirefox && !isOpera) {
      padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));

    };

    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    elem.style.height = minHeight + 'px';

    if (elem.scrollHeight > minHeight) {
      if (maxHeight && elem.scrollHeight > maxHeight) {
        height = maxHeight - padding;

        style.overflowY = 'auto';

      } else {
        height = elem.scrollHeight - padding;

        style.overflowY = 'hidden';

      };

      style.height = height + extra + 'px';

      scrollTop += parseInt(style.height) - elem.currHeight;

      document.body.scrollTop = scrollTop;

      document.documentElement.scrollTop = scrollTop;

      elem.currHeight = parseInt(style.height);

    };

  };
  addEvent('propertychange', change);
  addEvent('input', change);
  addEvent('focus', change);
  change();

};


function findElement(list, key) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i].db == key) {

      return list[i];
    }
  }
  return ['nonono']
}



export default class MainPage extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      explanation_title: 'Query Explanation', // a changable title
      DBlist: [],
      DBID: '',
      TableID: '',
      TableList: [],
      columnList: [],
      dbDict: {},
      dict_flag: true, // true means the dict has not been generated
      rows: [],
      columns: [],
      question: '',
      sql: '',
      intermediateSQL: '',
      SQL_show: <div></div>,
      entireSQL: '', // a copy of sql, storing the orignal sql when sql can handle intermedate result
      resultRows: [],
      resultColumns: [],
      explanation: [], // mainly used for restoring
      temporary_explanation: [], // used for modifying
      expHistoryList: [], // store all the explanation history (after input a question it will clear)
      expHistoryList_copy: [], // a copy, used to restore after the user modifies the original version
      previous_explanation: [], // the previous user-edited explanation, used to compare and restore
      previous_generated_explanation: [], // the previous model generated explanation, used to compare with the user-edited explanation, those explanations that user doesn't change should change
      waiting_flag: false, // indicate if server has responded, if not ---> show progress bar
      current_step: 0, // indicate current step of 
      isEdit: false, // a flag used to indicate if the text is in editing
      ticks: 0.0, // time stamp in float, used to record how long it takes for the user to edit the explanation
      isToggled: false, // indicate if the SQL show is toggled
    };

    this.handleDBSelect = this.handleDBSelect.bind(this);
    this.handleTableSelect = this.handleTableSelect.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleExplanation = this.handleExplanation.bind(this);
    this.handleRestore = this.handleRestore.bind(this);
    this.getPreviousExplanation = this.getPreviousExplanation.bind(this);
    this.getExplanation = this.getExplanation.bind(this);
    this.handleAddExp = this.handleAddExp.bind(this);
    this.handleDeleteExp = this.handleDeleteExp.bind(this);
    this.handleRegenerate = this.handleRegenerate.bind(this);
    this.handleIntermediate = this.handleIntermediate.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.getHighlightRex = this.getHighlightRex.bind(this);
    this.handleTableFocus = this.handleTableFocus.bind(this);
  }


  componentDidMount() {
    axios.get(globalURL + '/initID')
      .then(response => {
        this.setState({ DBlist: response.data.message });
        console.log("DBID");
        console.log(this.state.DBlist);
      }
      )
      .catch(error => {
        console.log(error)
      })

    const script = document.createElement("script");
    script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js";
    script.async = true;
    document.body.appendChild(script);
    hljs.highlightAll();


    console.log('wow1')
    this._handleHighlight();

  }

  componentDidUpdate() {
    // document.getElementsByTagName('body')[0].style.zoom = 1.15

    // <script>
    //   {() => {
    //     console.log("jQuery!!!!!!!!");
    //     $('textarea').highlightWithinTextarea({
    //     highlight: [
    //       {
    //         highlight: 'blueberry',
    //         className: 'red'
    //       },
    //       {
    //         highlight: 'age',
    //         className: 'blue'
    //       },
    //       {
    //         highlight: 'id',
    //         className: 'blue'
    //       },
    //       {
    //         highlight: 'student',
    //         className: 'yellow'
    //       }
    //     ]
    //   })}
    // }
    // </script>

  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  // tick() {
  //   this.setState({
  //     date: new Date()
  //   });
  // }

  _handleHighlight() {
    console.log('wow2')

  }




  clickedExp(str) {


    return (
      <div>
        <textarea onBlur={() => { this.state.isEdit = false; }} value={str} type="text" placeholder="Add explanation here ..."
          style={{ width: '100%', display: 'flex', borderStyle: "none", fontSize: "21px", borderRadius: "10px", WebkitTextSizeAdjust: 'none', textSizeAdjust: 'none', minHeight: '30px' }}
          cols="200"
          rows="1"
          onMouseMove={(e) => {
            var ob = e.currentTarget;
            autoTextarea(ob);
          }}
          onChange={(e) => {
            var ob = e.currentTarget;
            subexp.explanation = ob.value;
            this.forceUpdate();
            autoTextarea(ob); // make the textarea automatically increase the height based on the text
          }} />

        <div style={{}} >
          {str}
        </div>

      </div>
    )

   
  };

  // generate the highlight regular expression for rich text area
  getHighlightRex() {
    var regular_pattern_list = [];

    // column
    let column_reg_str = '';
    for (const str of this.state.columnList) {
      column_reg_str += str + '|';
    }
    column_reg_str = column_reg_str.slice(0, -1); // remove the last '|'
    // generate regular expression object
    let column_reg = new RegExp(column_reg_str, "gi");
    let column_pattern = { borderRadius: "3px", backgroundColor: "rgb(255, 242, 204)", color: "rgb(0, 51, 0)" };

    var column_pattern_pair = [];

    column_pattern_pair.push(column_reg);
    column_pattern_pair.push(column_pattern);
    regular_pattern_list.push(column_pattern_pair);

    // table
    let table_reg_str = '';
    for (var str of this.state.TableList) {
      str = str.replaceAll('_', ' ');
      table_reg_str += str + '|';
    }
    table_reg_str = table_reg_str.slice(0, -1); // remove the last '|'
    // generate regular expression object
    let table_reg = new RegExp(table_reg_str, "gi");
    let table_pattern = { borderRadius: "3px", backgroundColor: "rgb(0, 153, 153)", color: "white" };

    var table_pattern_pair = [];

    table_pattern_pair.push(table_reg);
    table_pattern_pair.push(table_pattern);
    regular_pattern_list.push(table_pattern_pair);


    // operator 
    let operator_reg = new RegExp("is|is greater than|is less than", "gi");
    let operator_pattern = { color: "rgb(179, 179, 0)" };

    var operator_pattern_pair = [];

    operator_pattern_pair.push(operator_reg);
    operator_pattern_pair.push(operator_pattern);
    regular_pattern_list.push(operator_pattern_pair);



    const res_reg = createRegexRenderer(regular_pattern_list);
    return res_reg
  }

  // handle toggle button
  handleToggleChange(event) {
    if (event.target.checked) {
      this.setState({ isToggled: true });
      this.setState({
        SQL_show: <div>
          <Highlight className='sql' style={{ borderRadius: '40px', width: '100%' }}>
            {/* {this.state.entireSQL} */}
            {this.state.intermediateSQL}
          </Highlight>
        </div>
      });
      this.forceUpdate();
    }
    else {
      this.setState({ SQL_show: <div></div> });
      this.setState({ isToggled: false });
    }

  }


  // add a new explanation at the end
  // obsolete
  handleAddExp() {

    const temp = {};
    temp['explanation'] = "";
    temp['subexpression'] = "";

    this.state.temporary_explanation.explanation.push(temp);
  }

  // obsolete
  handleDeleteExp(index) {
    this.state.temporary_explanation.explanation.splice(index, 1);
  }

  handleRestore() {
    // console.log(this.state.explanation);
    const temp = Object.assign([], this.state.explanation);
    this.setState({ temporary_explanation: temp });
    this.forceUpdate();
  }

  handleQuestion(data) {
    // pass to parent
    this.setState({ question: data });
    this.setState({ previous_explanation: [] }); // set the previous explanation to empty
    this.setState({ previous_generated_explanation: [] });
    this.setState({ expHistoryList: [] }); // clear explanation History
    this.setState({ expHistoryList_copy: [] }); // clear explanation History
    this.setState({ current_step: 0 });
    this.setState({ SQL_show: <div></div> });
    this.setState({ isToggled: false });

    // update explanation title
    this.setState({ explanation_title: 'Query Explanation' });

    this.forceUpdate();
    // send to server
    // create send message
    const msg = {
      dbid: this.state.DBID,
      question: this.state.question,
    };
    this.setState({ waiting_flag: true }); // set the waiting flag to be true
    axios
      .post(globalURL + '/getQueryResult', msg)
      .then(response => {
        this.handleResult(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })

  }

  handleResult(data) {
    this.setState({ sql: data.sql }, () => { this.handleExplanation(); });
    this.setState({ entireSQL: data.sql });
    this.setState({ intermediateSQL: data.sql });
    this.setState({ resultRows: data.result });
    // get resultColumns
    const colKeyList = Object.keys(data.result[0]);
    const cols = colKeyList.map((col) => {
      if (col == 'id' && !data.haveID) {
        return null;
      }
      else {
        return {
          'field': col,
          'flex': 1,
          'minWidth': 150,
        };
      }
    });
    // filter null in cols
    const cols2 = cols.filter((item) => { return item != null });
    this.setState({ resultColumns: cols2 });

  }

  handleExplanation() {
    console.log('sql');
    console.log(this.state.sql);
    const msg = { sql: this.state.sql, ticks: this.state.ticks };
    axios
      .post(globalURL + '/getExplanation', msg)
      .then(response => {
        this.setState({ explanation: response.data.message });
        // deep copy
        let newMSG = JSON.parse(JSON.stringify(response.data.message));

        this.setState({ temporary_explanation: newMSG });
        this.setState({ previous_generated_explanation: JSON.parse(JSON.stringify(newMSG)) });

        // restore the previous version before user-edit
        var temp_copy = JSON.parse(JSON.stringify(this.state.expHistoryList_copy));
        this.setState({ expHistoryList: temp_copy });



        // push new records
        this.state.expHistoryList.push(newMSG); // push the edit history to history list
        // update expHistoryList
        // this.setState({ expHistoryList_copy: JSON.parse(JSON.stringify(this.state.expHistoryList)) });

        this.setState({ current_step: this.state.expHistoryList.length - 1 }); // set current step to be last
        this.forceUpdate();
        this.setState({ ticks: response.data.ticks });

        console.log('explanation');
        console.log(response);

        this.setState({ waiting_flag: false }); // set the waiting flag to be true
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleRegenerate() {
    // set waiting flag to be false
    this.setState({ waiting_flag: true });

    var temp_obj = this.state.expHistoryList[this.state.current_step];
    const msg = { question: this.state.question, sql: temp_obj, dbid: this.state.DBID, TBid: this.state.TableID, ori_subs: this.state.explanation, ticks: this.state.ticks, previous_generated_explanation: this.state.previous_generated_explanation, entire_SQL: this.state.entireSQL };

    // update explanation title
    this.setState({ explanation_title: 'Query Explanation' });
    this.setState({ SQL_show: <div></div> });
    this.setState({ isToggled: false });


    // this.forceUpdate();
    // restore back
    this.setState({ expHistoryList: JSON.parse(JSON.stringify(this.state.expHistoryList_copy)) });
    // pop the previous template-based explanation
    this.state.expHistoryList.pop();

    console.log("previous exp");
    console.log(this.state.previous_explanation);


    axios
      .post(globalURL + '/regenerate', msg)
      .then(response => {
        // first, set the previous edited explanation
        let preEXP = JSON.parse(JSON.stringify(this.state.temporary_explanation));
        this.setState({ previous_explanation: preEXP });


        this.setState({ explanation: response.data.message });
        // deep copy
        let newMSG = JSON.parse(JSON.stringify(response.data.message));
        this.setState({ temporary_explanation: newMSG });

        this.setState({ sql: response.data.finalSQL });
        this.setState({ entireSQL: response.data.finalSQL });
        this.setState({ intermediateSQL: response.data.finalSQL });

        this.setState({ ticks: response.data.ticks });

        console.log("regenerated data");
        console.log(response.data.message);

        // push new records
        var temp_exp_copy = JSON.parse(JSON.stringify(this.state.temporary_explanation));

        this.state.expHistoryList.push(temp_exp_copy); // push the edit history to history list
        // update expHistoryList
        this.setState({ expHistoryList_copy: JSON.parse(JSON.stringify(this.state.expHistoryList)) });

        this.forceUpdate();

      }).then(() => {
        // set waiting flag to be true
        this.setState({ waiting_flag: false });
        this.setState({ current_step: this.state.expHistoryList.length - 1 }); // set current step to be last
        this.forceUpdate();
        console.log('SQL is updated from server');
        const msg = {
          dbid: this.state.DBID,
          sql: this.state.sql,
        };
        axios
          .post(globalURL + '/regenerateQueryResult', msg)
          .then(response => {
            console.log(response);
            this.handleResult(response.data.message);
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleIntermediate(range_num) {
    const msg = { sql: this.state.temporary_explanation, dbid: this.state.DBID, range: range_num }
    axios
      .post(globalURL + '/intermediateResults', msg)

      .then(response => {
        // handle result table
        // this.setState({ sql: response.data.message.sql })
        this.setState({ resultRows: response.data.message.result });
        this.setState({ intermediateSQL: response.data.intermediateSQL });
        if (this.state.isToggled) {
          this.setState({
            SQL_show: <div>
              <Highlight className='sql' style={{ borderRadius: '40px', width: '100%' }}>
                {/* {this.state.entireSQL} */}
                {this.state.intermediateSQL}
              </Highlight>
            </div>
          });
          this.forceUpdate();
        }

        this.forceUpdate();

        // get resultColumns
        const colKeyList = Object.keys(response.data.message.result[0]);
        const cols = colKeyList.map((col) => {
          if (col == 'id' && !response.data.message.haveID) {
            return null;
          }
          else {
            return {
              'field': col,
              'flex': 1,
              'minWidth': 150,
            };
          }
        });
        // filter null in cols
        const cols2 = cols.filter((item) => { return item != null });
        this.setState({ resultColumns: cols2 });
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDBSelect(event) {
    this.setState({ dict_flag: true });
    console.log(event.target)
    console.log('DB Changing select');
    this.setState({ DBID: event.target.value });
    this.setState({ TableID: '' }, () => {
      console.log('DBID  ' + this.state.DBID);
      const tbl = findElement(this.state.DBlist, this.state.DBID);
      console.log(tbl)
      this.setState({ TableList: tbl.table });
      // this.setState({ columnList: tbl.column });
    }
    );
  };

  // when hover on the table text, change to this table
  handleTableFocus(tbid) {
    console.log('handleTableFocus!!');
    this.setState({ TableID: tbid }, () => {
      const msg = {
        dbid: this.state.DBID,
        tableid: this.state.TableID,
        dict: this.state.dbDict,
        dict_flag: this.state.dict_flag,
        tb_list: this.state.TableList,
        col_list: this.state.columnList,
      }
      axios
        .post(globalURL + '/getTable', msg)
        .then(response => {

          this.setState({ dict_flag: false }); // get the dict, set the flag to false
          this.setState({ columnList: response.data.columns }); // all columns in the database
          this.setState({ dbDict: response.data.db_dict }); // the structure of this database

          this.setState({ rows: response.data.message });
          const colKeyList = Object.keys(response.data.message[0]);
          const cols = colKeyList.map((col) => {
            if (col == 'id' && !response.data.haveID) {
              return null;
            }
            else {
              return {
                'field': col,
                'flex': 1,
                'minWidth': 150,
              };
            }
          });
          // filter null in cols
          const cols2 = cols.filter((item) => { return item != null });

          this.setState({ columns: cols2 });
        })
        .catch(error => {
          console.log(error)
        })
    });
  }

  handleTableSelect(event) {

    this.setState({ TableID: event.target.value }, () => {
      const msg = {
        dbid: this.state.DBID,
        tableid: this.state.TableID,
        dict: this.state.dbDict,
        dict_flag: this.state.dict_flag,
        tb_list: this.state.TableList,
        col_list: this.state.columnList,
      }
      axios
        .post(globalURL + '/getTable', msg)
        .then(response => {
          this.setState({ dict_flag: false }); // get the dict, set the flag to false
          this.setState({ columnList: response.data.columns }); // all columns in the database
          this.setState({ dbDict: response.data.db_dict }); // the structure of this database

          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');
          console.log(this.state);

          this.setState({ rows: response.data.message });
          const colKeyList = Object.keys(response.data.message[0]);
          const cols = colKeyList.map((col) => {
            if (col == 'id' && !response.data.haveID) {
              return null;
            }
            else {
              return {
                'field': col,
                'flex': 1,
                'minWidth': 150,
              };
            }
          });
          // filter null in cols
          const cols2 = cols.filter((item) => { return item != null });

          this.setState({ columns: cols2 });
        })
        .catch(error => {
          console.log(error)
        })
    });
  };

  getPreviousExplanation() {
    if (this.state.previous_explanation.length == 0) {
      return <div></div>;
    }

    return (
      <Box sx={{ 
        mt: 2,
        p: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        {this.state.previous_explanation.map((exp, index1) => {
          const exps = exp.explanation.map((subexp, index2) => {
            // Check if this step matches with current explanation
            const currentExp = this.state.expHistoryList[this.state.current_step];
            const isModified = currentExp && 
              (index2 >= currentExp[0].explanation.length || 
               subexp.explanation !== currentExp[0].explanation[index2].explanation);

            return (
              <Box 
                key={index2}
                sx={{
                  mb: 1,
                  p: 1.5,
                  borderRadius: '6px',
                  backgroundColor: isModified ? 'rgba(255, 244, 229, 0.9)' : 'transparent',
                  border: isModified ? '1px solid #ffe0b2' : 'none'
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip 
                    label={index2 + 1} 
                    size="small" 
                    sx={{ 
                      backgroundColor: isModified ? '#ffb74d' : '#e0e0e0',
                      color: isModified ? '#fff' : '#666',
                      minWidth: '28px'
                    }} 
                  />
                  <Typography 
                    sx={{ 
                      color: isModified ? '#ed6c02' : '#666',
                      fontSize: '0.95rem',
                      fontStyle: isModified ? 'italic' : 'normal'
                    }}
                  >
                    {subexp.explanation}
                  </Typography>
                </Stack>
              </Box>
            );
          });

          return (
            <Box key={index1}>
              {exp.number && (
                <Typography 
                  sx={{ 
                    color: '#666',
                    mb: 1,
                    fontWeight: 500
                  }}
                >
                  {exp.number}
                </Typography>
              )}
              {exps}
            </Box>
          );
        })}
      </Box>
    );
  }

  getExplanation() {
    if (this.state.waiting_flag == true) {
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      );
    }

    // title: previous feedback
    let previous_feedback = <div></div>;
    if (this.state.previous_explanation.length != 0) {
      previous_feedback =
        <div style={{ padding: '10px 2px 2px 2px' }}>
          <h2 style={{ color: '#B2B2B2' }}>Previous feedback</h2>
        </div>;

    }




    const total_sql = <div style={{ padding: '20px 20px 20px 20px' }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Show SQL"
          onChange={this.handleToggleChange}
        // labelPlacement="end"
        /></FormGroup>
      <div>
        {this.state.SQL_show}
      </div>
    </div>




    // let cur_EXP = this.state.temporary_explanation; // single explanation, obsolete
    if (this.state.expHistoryList.length == 0) {
      return <div></div>
    }
    let cur_EXP = this.state.expHistoryList[this.state.current_step]; // store the explanation with current step

    console.log('-------------------')
    console.log(this.state.current_step)
    console.log(this.state.expHistoryList)

    if (cur_EXP.length == 1) {
      return <div> {cur_EXP.map((exp) => {


        const pre = exp.number

        const a1 = <Typography style={{ color: '#A9A9A9' }}> {pre} </Typography>

        var cnt = -1;
        const exps = exp.explanation.map((subexp, index2) => {
          cnt = cnt + 1;
          return (
            <div id={cnt + 10000} className='hoverShow' style={{ width: '100%', borderRadius: '12px', marginTop: '10px', marginLeft: '4px', marginRight: '5px' }}>
              <table style={{ width: '100%', textAlign: 'left', tableLayout: 'fixed' }}>

                <tr>
                  <th style={{ width: '90%' }}>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ minHeight: '20px' }}>

                      <Chip id={cnt + 1000} label={<div style={{ fontSize: 17 }}>{index2 + 1}</div>} size='medium' color='success' variant="filled" style={{ cursor: "pointer" }}

                        onClick={(e) => {
                          // get range_num
                          var range_num = e.currentTarget.id;
                          var temp_num = Number(e.currentTarget.id);
                          range_num = range_num - 1000 + 1;

                          // change background color

                          // make all to be white
                          // assume the maximum number of subexpressions is 100
                          for (let i = 1000; i < 1100; i++) {
                            // var ele = document.getElementById(Number(i)+Number(9000));
                            if (document.getElementById(Number(i) + Number(9000))) {
                              document.getElementById(Number(i) + Number(9000)).style.backgroundColor = "#FFFFFF";
                              document.getElementById(Number(i) + Number(9000)).addEventListener("mouseover", function () {
                                document.getElementById(Number(i) + Number(9000)).style.backgroundColor = "rgb(235, 235, 235)";
                              });
                              document.getElementById(Number(i) + Number(9000)).addEventListener("mouseout", function () {
                                document.getElementById(Number(i) + Number(9000)).style.backgroundColor = "#FFFFFF";
                              });
                            }
                            else {
                              break;
                            }
                          }

                          // just make that element high lighted
                          var ele = document.getElementById(Number(temp_num) + Number(9000));
                          var ele_chip = document.getElementById(e.currentTarget.id);
                          if (ele) {

                            document.getElementById(Number(temp_num) + Number(9000)).style.backgroundColor = "#DDDEF3";

                            document.getElementById(Number(temp_num) + Number(9000)).addEventListener("mouseout", function () {
                              document.getElementById(Number(temp_num) + Number(9000)).style.backgroundColor = "#DDDEF3";
                            });

                            document.getElementById(Number(temp_num) + Number(9000)).addEventListener("mouseover", function () {
                              document.getElementById(Number(temp_num) + Number(9000)).style.backgroundColor = "#DDDEF3";
                            });
                          }


                          // update result
                          this.handleIntermediate(range_num);

                          console.log(cur_EXP);
                          this.forceUpdate();
                        }}
                      />
                      <Tooltip 
                        title={
                          <Box sx={{
                            p: 1.5,
                            backgroundColor: '#2c3e50',
                            borderRadius: '8px',
                            maxWidth: 500,
                          }}>
                            <Typography
                              sx={{
                                fontSize: '0.95rem',
                                fontFamily: 'Consolas, Monaco, monospace',
                                color: '#ecf0f1',
                                whiteSpace: 'pre-wrap',
                                '& .keyword': {
                                  color: '#e74c3c',
                                  fontWeight: 'bold'
                                },
                                '& .function': {
                                  color: '#3498db'
                                },
                                '& .string': {
                                  color: '#2ecc71'
                                }
                              }}
                            >
                              {subexp.subexpression}
                            </Typography>
                          </Box>
                        }
                        placement="bottom"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#2c3e50',
                              '& .MuiTooltip-arrow': {
                                color: '#2c3e50'
                              }
                            }
                          }
                        }}
                      >
                        <Box style={{ width: "100%", height: "100%", borderRadius: "10px" }}>


                          <RichTextarea
                            value={subexp.explanation}
                            style={{
                              width: "100%",
                              display: 'flex',
                              backgroundColor: "white",
                              borderColor: "#e0e0e0",  // Light gray border color
                              borderWidth: "2.5px",
                              borderStyle: "solid",
                              fontSize: "21px",
                              margin: 0,
                              padding: 10,
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                              overflow: 'hidden',
                              zIndex: 4,
                            }}
                            onChange={(e) => {
                              subexp.explanation = e.target.value;
                              this.forceUpdate();
                            }}
                            onMouseMove={(e) => {
                              var ob = e.currentTarget;
                              autoTextarea(ob);
                            }}
                          >


                            {(v) => {

                              // column
                              let column_reg_str = '';
                              for (const str of this.state.columnList) {
                                column_reg_str += '\\b' + str + '\\b' + '|';
                              }
                              column_reg_str = column_reg_str.slice(0, -1); // remove the last '|'
                              // generate regular expression object
                              let column_reg = new RegExp(column_reg_str, "gi");
                              let column_pattern = {
                                color: "blue",
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                              };

                              // table
                              let table_reg_str = '';
                              for (var str of this.state.TableList) {
                                str = str.replaceAll('_', ' ');
                                table_reg_str += '\\b' + str + '\\b' + '|';
                              }
                              table_reg_str = table_reg_str.slice(0, -1); // remove the last '|'
                              // generate regular expression object
                              let table_reg = new RegExp(table_reg_str, "gi");
                              let table_pattern = {
                                color: "#28a745",
                                fontWeight: 'bold',
                                borderBottom: '2px solid #28a745',
                                transition: 'all 0.3s ease'
                              };

                              // operator 
                              let operator_reg_str = "\\bis\\b|\\bis not\\b|\\bis greater than\\b|\\bis less than\\b";
                              let operator_reg = new RegExp(operator_reg_str, "gi");
                              let operator_pattern = {
                                color: "#ffc107",
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                transition: 'all 0.3s ease'
                              };

                              console.log('column regular expression');
                              console.log(column_reg);
                              console.log('table regular expression');
                              console.log(table_reg);
                              console.log('operator regular expression');
                              console.log(operator_reg);

                              // matched substrings
                              let tb_matched_list = v.match(table_reg);
                              let col_matched_list = v.match(column_reg);
                              let op_matched_list = v.match(operator_reg);
                              console.log('list ----- ');
                              console.log(tb_matched_list);
                              console.log(col_matched_list);
                              console.log(op_matched_list);

                              let total_reg_str = table_reg_str + '|' + column_reg_str + '|' + operator_reg_str;
                              let total_reg = new RegExp(total_reg_str, "gi");
                              console.log(v);
                              // handle string to split
                              v = v.replace(total_reg, '_$&_')
                              console.log(v);
                              return v.split(/[_]+/).map((part, i) => {
                                console.log(part);

                                

                                if (tb_matched_list && tb_matched_list.includes(part)) {
                                  return (<span
                                    key={i}
                                    style={{
                                      color: "#28a745",  // Green color for tables
                                      fontWeight: 'bold',
                                      padding: '2px 4px',
                                      borderRadius: '3px',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = "rgba(40, 167, 69, 0.1)";  // Light green background
                                      if (this.state.TableList.includes(part) && this.state.TableID != part) {
                                        this.handleTableFocus(part);
                                      }

                                      // Update table select element
                                      var ele = document.getElementById('TABLESELECT');
                                      ele.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = "transparent";
                                      var ele = document.getElementById('TABLESELECT');
                                      ele.style.backgroundColor = "transparent";
                                    }}
                                  >
                                    {part}
                                  </span>);
                                }

                                else if (col_matched_list && col_matched_list.includes(part)) {
                                  return (<span 
                                    key={i}
                                    style={{
                                      color: "#0066cc",  // Blue color for columns
                                      fontWeight: 'bold',
                                      padding: '2px 4px',
                                      borderRadius: '3px',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = "rgba(0, 102, 204, 0.1)";  // Light blue background
                                      
                                      // Find and highlight table containing this column
                                      let tb_key = Object.keys(this.state.dbDict).find(key => 
                                        this.state.dbDict[key].map(col => col.toLowerCase()).includes(part.toLowerCase())
                                      );
                                      if (tb_key) {
                                        this.handleTableFocus(tb_key);
                                      }

                                      // Highlight column in table
                                      let ori_col_str = part.replaceAll(' ', '_');
                                      let elements = document.querySelectorAll('[data-field="' + ori_col_str + '"]');
                                      for (var ele of elements) {
                                        ele.style.backgroundColor = "rgba(0, 102, 204, 0.1)";
                                      }
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = "transparent";
                                      
                                      let ori_col_str = part.replaceAll(' ', '_');
                                      let elements = document.querySelectorAll('[data-field="' + ori_col_str + '"]');
                                      for (var ele of elements) {
                                        ele.style.backgroundColor = "transparent";
                                      }
                                    }}
                                  >
                                    {part}
                                  </span>);
                                }

                                else if (op_matched_list && op_matched_list.includes(part)) {
                                  return (<span key={i} style={operator_pattern}>
                                    {part}
                                  </span>);
                                }

                                else {
                                  return (<span key={i}>
                                    {part}
                                  </span>);
                                }
                              }
                              );
                            }}


                          </RichTextarea>



                         

                        </Box>
                      </Tooltip>
                    </Stack>
                  </th>


                  <th style={{ width: '10%' }}>
                    <Stack direction="row" spacing={1} className='icons'>
                      <Icon id={cnt * 100} baseClassName="material-icons-two-tone" style={{ cursor: "pointer" }}
                        // id = cnt * 100 because need to be distinguished from id in delete icon
                        onClick={(e) => {
                          console.log('add explanation');
                          var temp_id = e.currentTarget.id;

                          // console.log('add id: ')
                          // console.log(temp_id)
                          temp_id = temp_id / 100 + 1;

                          const temp = {};
                          temp['explanation'] = "";
                          temp['subexpression'] = "...";

                          cur_EXP[0].explanation.splice(temp_id, 0, temp);

                          this.forceUpdate();
                        }}
                      > add_circle </Icon>

                      <DeleteTwoToneIcon id={cnt} style={{ cursor: "pointer" }} onClick={(e) => {
                        var temp_id = e.currentTarget.id;
                        cur_EXP[0].explanation.splice(temp_id, 1);
                        this.forceUpdate();

                      }} />
                    </Stack>
                  </th>
                </tr>

              </table>
            </div>

          )
        })

        // return <div>{exps}<div></div><div style={{ height: '40px' }} /></div>
        return <div>{exps}</div>

      })
      } {total_sql}
        {previous_feedback}
        <div>{this.getPreviousExplanation()}</div>
      </div>
    }
    else {

      return <div> {cur_EXP.map((exp, index1) => {

        const pre = exp.number;

        const a1 = <div style={{ padding: '10px 10px 10px 2px' }}><Typography style={{ color: '#A9A9A9' }}> {pre} </Typography> </div>
        // const a1 = <div style={{ height: '28px' }}><Stack direction="row" spacing={1}><Chip label={index1+1} size='small' color="success"/> <Typography style={{ color: '#A9A9A9' }}> {pre} </Typography> </Stack></div>
        // const a1 = <Chip label={index1+1} size='small'/>;

        var cnt = -1;

        const exps = exp.explanation.map((subexp) => {
          cnt = cnt + 1;
          return (
            <div className='hoverShow' style={{ width: '100%', borderRadius: '12px', marginTop: '5px', marginLeft: '4px', marginRight: '5px' }} >
              {/* <Stack direction="row" spacing={1}> */}
              <table style={{ width: '100%', textAlign: 'left', tableLayout: 'fixed' }}>

                <tr>
                  <th style={{ width: '90%' }}>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ minHeight: '20px' }}>
                      <Chip label={<div style={{ fontSize: 17 }}>{cnt + 1}</div>} size='medium' color='success' variant="filled" style={{ cursor: "pointer" }} />


                      <Tooltip 
                        title={
                          <Box sx={{
                            p: 1.5,
                            backgroundColor: '#2c3e50',
                            borderRadius: '8px',
                            maxWidth: 500,
                          }}>
                            <Typography
                              sx={{
                                fontSize: '0.95rem',
                                fontFamily: 'Consolas, Monaco, monospace',
                                color: '#ecf0f1',
                                whiteSpace: 'pre-wrap',
                                '& .keyword': {
                                  color: '#e74c3c',
                                  fontWeight: 'bold'
                                },
                                '& .function': {
                                  color: '#3498db'
                                },
                                '& .string': {
                                  color: '#2ecc71'
                                }
                              }}
                            >
                              {subexp.subexpression}
                            </Typography>
                          </Box>
                        }
                        placement="bottom"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#2c3e50',
                              '& .MuiTooltip-arrow': {
                                color: '#2c3e50'
                              }
                            }
                          }
                        }}
                      >
                        <Box style={{ width: "100%", height: "100%", }}>

                          <RichTextarea
                            value={subexp.explanation}
                            style={{
                              width: "100%",
                              display: 'flex',
                              backgroundColor: "white",
                              borderColor: "#e0e0e0",  // Light gray border color
                              borderWidth: "2.5px",
                              borderStyle: "solid",
                              fontSize: "21px",
                              margin: 0,
                              padding: 10,
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                            onChange={(e) => {
                              subexp.explanation = e.target.value;
                              this.forceUpdate();
                            }}
                            onMouseMove={(e) => {
                              var ob = e.currentTarget;
                              autoTextarea(ob);
                            }}
                          >

                            {(v) => {

                              // column
                              let column_reg_str = '';
                              for (const str of this.state.columnList) {
                                column_reg_str += '\\b' + str + '\\b' + '|';
                              }
                              column_reg_str = column_reg_str.slice(0, -1); // remove the last '|'
                              // generate regular expression object
                              let column_reg = new RegExp(column_reg_str, "gi");
                              let column_pattern = { color: "blue" };

                              // table
                              let table_reg_str = '';
                              for (var str of this.state.TableList) {
                                str = str.replaceAll('_', ' ');
                                table_reg_str += '\\b' + str + '\\b' + '|';
                              }
                              table_reg_str = table_reg_str.slice(0, -1); // remove the last '|'
                              // generate regular expression object
                              let table_reg = new RegExp(table_reg_str, "gi");
                              // let table_pattern = { borderRadius: "3px", backgroundColor: "rgb(0, 153, 153)", color: "white" };
                              // let table_pattern = { color: "blue", textDecoration: "underline" };
                              let table_pattern = { color: "blue" };

                              // operator 
                              let operator_reg_str = "\\bis\\b|\\bis not\\b|\bis greater than\\b|\\bis less than\\b";
                              let operator_reg = new RegExp(operator_reg_str, "gi");
                              let operator_pattern = { color: "rgb(179, 179, 0)" };

                              console.log('column regular expression');
                              console.log(column_reg);
                              console.log('table regular expression');
                              console.log(table_reg);
                              console.log('operator regular expression');
                              console.log(operator_reg);

                              // matched substrings
                              let tb_matched_list = v.match(table_reg);
                              let col_matched_list = v.match(column_reg);
                              let op_matched_list = v.match(operator_reg);
                              console.log('list ----- ');
                              console.log(tb_matched_list);
                              console.log(col_matched_list);
                              console.log(op_matched_list);

                              let total_reg_str = column_reg_str + '|' + table_reg_str + '|' + operator_reg_str;
                              let total_reg = new RegExp(total_reg_str, "gi");
                              console.log(v);
                              // handle string to split
                              v = v.replaceAll(total_reg, '_$&_')
                              console.log(v);
                              return v.split(/[_]+/).map((part, i) => {
                                console.log(part);

                                if (tb_matched_list && tb_matched_list.includes(part)) {
                                  return (<span
                                    key={i}
                                    style={{
                                      color: "#28a745",  // Green color for tables
                                      fontWeight: 'bold',
                                      padding: '2px 4px',
                                      borderRadius: '3px',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = "rgba(40, 167, 69, 0.1)";  // Light green background
                                      if (this.state.TableList.includes(part) && this.state.TableID != part) {
                                        this.handleTableFocus(part);
                                      }

                                      // Update table select element
                                      var ele = document.getElementById('TABLESELECT');
                                      ele.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = "transparent";
                                      var ele = document.getElementById('TABLESELECT');
                                      ele.style.backgroundColor = "transparent";
                                    }}
                                  >
                                    {part}
                                  </span>);
                                }

                                else if (col_matched_list && col_matched_list.includes(part)) {
                                  return (<span 
                                    key={i}
                                    style={{
                                      color: "#0066cc",  // Blue color for columns
                                      fontWeight: 'bold',
                                      padding: '2px 4px',
                                      borderRadius: '3px',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = "rgba(0, 102, 204, 0.1)";  // Light blue background
                                      
                                      // Find and highlight table containing this column
                                      let tb_key = Object.keys(this.state.dbDict).find(key => 
                                        this.state.dbDict[key].map(col => col.toLowerCase()).includes(part.toLowerCase())
                                      );
                                      if (tb_key) {
                                        this.handleTableFocus(tb_key);
                                      }

                                      // Highlight column in table
                                      let ori_col_str = part.replaceAll(' ', '_');
                                      let elements = document.querySelectorAll('[data-field="' + ori_col_str + '"]');
                                      for (var ele of elements) {
                                        ele.style.backgroundColor = "rgba(0, 102, 204, 0.1)";
                                      }
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = "transparent";
                                      
                                      let ori_col_str = part.replaceAll(' ', '_');
                                      let elements = document.querySelectorAll('[data-field="' + ori_col_str + '"]');
                                      for (var ele of elements) {
                                        ele.style.backgroundColor = "transparent";
                                      }
                                    }}
                                  >
                                    {part}
                                  </span>);
                                }

                                else {
                                  return (<span key={i}
                                    onMouseOver={(e) => {
                                      console.log(part);
                                    }}>
                                    {part}
                                  </span>);
                                }
                              }
                              );
                            }}


                          </RichTextarea>

                          {/* <textarea value={subexp.explanation} type="text" placeholder="Add explanation here ..."
                            style={{ width: '100%', borderStyle: "none", fontSize: "21px", borderRadius: "10px", WebkitTextSizeAdjust: 'none', textSizeAdjust: 'none' }}
                            cols="200"
                            rows="1"
                            onMouseMove={(e) => {
                              var ob = e.currentTarget;
                              autoTextarea(ob);
                            }}
                            onChange={(e) => {
                              // console.log('text area!')
                              var ob = e.currentTarget;

                              // ob.value = ob.value.toUpperCase();
                              // console.log(this.state.temporary_explanation)
                              // this.setState({ DBlist: response.data.message })
                              subexp.explanation = ob.value;
                              this.forceUpdate();
                              autoTextarea(ob) // make the textarea automatically increase the height based on the text
                            }} /> */}




                        </Box>
                      </Tooltip>
                    </Stack>
                  </th>

                  <th style={{ width: '10%' }}>
                    <Stack direction="row" spacing={1} className="icons">
                      <Icon id={cnt * 100} baseClassName="material-icons-two-tone" style={{ cursor: "pointer" }}
                        // onClick={() => {this.handleAddExp}}

                        onClick={(e) => {
                          // console.log('add explanation');
                          // console.log(this.state.temporary_explanation[index1].explanation);
                          var temp_id = e.currentTarget.id;
                          temp_id = temp_id / 100 + 1;
                          const temp = {};
                          temp['explanation'] = "";
                          temp['subexpression'] = "...";
                          // this.state.temporary_explanation[index1].explanation.push(temp);
                          cur_EXP[index1].explanation.splice(temp_id, 0, temp);


                          console.log("temp explanation");
                          console.log(cur_EXP[index1].explanation);
                          // console.log(cur_EXP);
                          this.forceUpdate();
                        }}

                      > add_circle </Icon>

                      <DeleteTwoToneIcon id={cnt} style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          // console.log('delete explanation');
                          var temp_id = e.currentTarget.id;
                          // console.log('id: ' + temp_id);
                          // console.log(this.state.temporary_explanation[index1].explanation);
                          cur_EXP[index1].explanation.splice(temp_id, 1);

                          // var a = this.state.temporary_explanation
                          // // Object.JSON(Object.stringify(this.state.temporary_explanation));
                          // this.setState({ temporary_explanation: a })

                          // console.log(this.state.temporary_explanation[index1].explanation);
                          this.forceUpdate();



                          // window.location.reload();
                          // ele = document.getElementById("explanations");
                          // console.log(ele);
                          // ele = this.getExplanation();
                        }} />


                    </Stack>
                    {/* onClick={this.handleDeleteExp(index2)} */}
                  </th>
                </tr>
              </table>
              {/* </Stack> */}

            </div>

          )
        });


        // return <div><Icon sx={{ color: green[500] }}>add_circle</Icon></div>
        // return <div><Icon baseClassName="material-icons-two-tone">add_circle</Icon></div>
        return <div style={{ padding: '10px 1px 10px 1px' }}>{a1}{exps}</div>

      })
      } {total_sql}
        {previous_feedback}
        <div>{this.getPreviousExplanation()}</div>
      </div>
    }

  }



  render() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
          {/* <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                SQLucid
              </Typography>
            </Toolbar>
          </AppBar> */}

          <Grid container spacing={2} style={{ flex: 1, padding: '16px', background: '#f5f5f5' }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ height: '48vh', padding: '16px', borderRadius: '12px' }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{
                    fontWeight: 600,
                    color: '#1976d2',
                    mb: 2
                  }}
                >
                  Database
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Database</InputLabel>
                    <Select
                      value={this.state.DBID}
                      label="Database"
                      onChange={this.handleDBSelect}
                    >
                      {this.state.DBlist.map((db) => (
                        <MenuItem key={db.db} value={db.db}>{db.db}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Table</InputLabel>
                    <Select
                      value={this.state.TableID}
                      id="TABLESELECT"
                      label="Table"
                      onChange={this.handleTableSelect}
                    >
                      {this.state.TableList.map((tb) => (
                        <MenuItem key={tb} value={tb}>{tb}</MenuItem>
                      ))}
                    </Select>

                    {/* <Select
                      style={{ height: '100%', width: '100%', display: 'flex' }}
                      id="TABLESELECT"
                      value={this.state.TableID}
                      label="Table"
                      onChange={this.handleTableSelect}
                    >
                      {
                        this.state.TableList.map((tb) => (<MenuItem value={tb}> {tb} </MenuItem>))
                      }
                    </Select> */}
                  </FormControl>
                </Box>


                <div style={{ height: 'calc(100% - 100px)' }}>
                  <DataGrid
                    rows={this.state.rows}
                    columns={this.state.columns}
                    autoPageSize
                    pagination
                  />
                </div>
              </Paper>
              <Paper elevation={3} style={{ height: '48vh', marginTop: '16px', padding: '16px', borderRadius: '12px' }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{
                    fontWeight: 600,
                    color: '#1976d2',
                    mb: 2
                  }}
                >
                  Query Result
                </Typography>
                <div style={{ height: 'calc(100% - 40px)' }}>
                  <DataGrid
                    rows={this.state.resultRows}
                    columns={this.state.resultColumns}
                    autoPageSize
                    pagination
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0}
                // className='amazingBorder'
                style={{ height: '30%', width: '98%', flexWrap: 'wrap', borderRadius: 15, padding: '10px 10px 10px 10px' }}
              >
                <div id="bot" style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Chatbot handleQuestion={this.handleQuestion} handleResult={this.handleResult} />
                  </ThemeProvider>
                </div>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  height: '66vh',
                  marginTop: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{
                    fontWeight: 600,
                    color: '#1976d2',
                    mb: 2
                  }}
                >
                  {this.state.explanation_title}
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    marginBottom: '16px'
                  }}
                >
                  {this.getExplanation()}
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <Button
                    variant="contained"
                    onClick={this.handleRegenerate}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }}
                  >
                    Generate
                  </Button>
                  <MobileStepper
                    variant="dots"
                    steps={this.state.expHistoryList.length}
                    position="static"
                    activeStep={this.state.current_step}
                    sx={{
                      maxWidth: 400,
                      flexGrow: 1,
                      backgroundColor: 'transparent',
                      padding: '8px 0',
                      '& .MuiMobileStepper-dot': {
                        width: 10,
                        height: 10,
                        margin: '0 6px',
                        transition: 'all 0.3s ease',
                      },
                      '& .MuiMobileStepper-dotActive': {
                        backgroundColor: '#1976d2',
                        transform: 'scale(1.2)',
                      },
                      '& .MuiMobileStepper-dots': {
                        gap: '4px'
                      }
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={() => {
                          const newStep = this.state.current_step + 1;
                          this.setState({
                            current_step: newStep,
                            explanation_title: newStep === this.state.expHistoryList.length - 1 ? 'Query Explanation' : 'Edit History'
                          });
                        }}
                        disabled={this.state.current_step === this.state.expHistoryList.length - 1}
                      >
                        Next edit
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={() => {
                          const newStep = this.state.current_step - 1;
                          this.setState({
                            current_step: newStep,
                            explanation_title: newStep === this.state.expHistoryList.length - 1 ? 'Query Explanation' : 'Edit History'
                          });
                        }}
                        disabled={this.state.current_step === 0}
                      >
                        <KeyboardArrowLeft />
                        Previous edit
                      </Button>
                    }
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }


}




