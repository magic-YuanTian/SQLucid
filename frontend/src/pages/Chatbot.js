import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Card, CardContent, Container, Table } from '@mui/material';
import DBTable from '../component/DBTable'
import ResultTable from '../component/ResultTable'
import DBshow from '../component/DBshow'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { margin } from '@mui/system';
import Robot from '../component/Robot'
import { StyledEngineProvider } from '@mui/material/styles';
import { DataGrid, gridColumnReorderDragColSelector } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import {
    ActionRequest,
    AudioActionResponse,
    ChatController,
    FileActionResponse,
    MuiChat} from 'chat-ui-react';



const theme = createTheme({
    palette: {
        primary: {
            main: '#007aff',
        },
    },
});

export default function Chatbot() {



    const [chatCtl] = React.useState(new ChatController());

    React.useMemo(async () => {
        await chatCtl.addMessage({
            type: 'text',
            content: `Please input your question.`,
            self: false,
        });
        console.log("here");
        // await chatCtl.addMessage({
        //     type: 'text',
        //     content: `xxxxsss.`,
        //     self: false,
        // });
        chatCtl.setActionRequest({ type: 'text', always: true }, (res) =>
            fetch('http://localhost:5001/question', {
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

                    // json.sql

                }
                )
        );
    }, [chatCtl]);

    return (
        <Box sx={{
            width: '100%',
            minHeight: '10vh',
            height: '45vh',
            // maxWidth: '940px',
            marginLeft: '1%',
            marginRight: '1%',
        }} >
            <MuiChat chatController={chatCtl} />
        </Box>
    );
}