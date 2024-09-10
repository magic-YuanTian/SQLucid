import * as React from 'react';
import {Helmet} from "react-helmet";
import Script from 'react-load-script';
// import useScript from '../component/useScript';
import { Box } from '@mui/system';

const {
    box,
    CssBaseline,
    ThemeProvider,
    createTheme,
  } = MaterialUI;
  const { ChatController, MuiChat } = ChatUiReact;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#007aff',
      },
    },
  });


  
function Robot() {
    const [chatCtl] = React.useState(new ChatController());
    React.useMemo(async () => {
        await chatCtl.addMessage({
          type: 'text',
          content: `Please enter something.`,
          self: false,
        });
        chatCtl.setActionRequest({ type: 'text', always: true }, (res) =>
          chatCtl.addMessage({
            type: 'text',
            content: `You have entered:\n${res.value}`,
            self: false,
          }),
        );
      }, [chatCtl]);
    

    return (
            <div>
            <div id="bot"></div>
            <Helmet>
                
                
                <title>Chat UI React</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta name="description" content="Chat UI React example" />
                <script crossorigin="anonymous" src="https://unpkg.com/react@17/umd/react.development.js" ></script>
                <script crossorigin="anonymous" src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" ></script>
                <script crossorigin="anonymous" src="https://unpkg.com/@mui/material@v5/umd/material-ui.development.js" ></script>
                <script crossorigin="anonymous" src="https://unpkg.com/chat-ui-react@latest/dist/browser/chat-ui-react.umd.polyfill.js"></script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <noscript>You need to enable JavaScript to run this app.</noscript>
                {/* <script type="text/javascript" src="./BotRender.js"/> */}
            </Helmet>

            <Box sx={{ backgroundColor: '#e0e0e0' }}>
            <Box sx={{
              minHeight: '100vh',
              height: '100vh',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <MuiChat chatController={chatCtl} />
            </Box>
          </Box>

            </div>
        
    );

    // ReactDOM.render(
    //     <ThemeProvider theme={theme}>
    //       <CssBaseline />
    //       <App />
    //     </ThemeProvider>,
    //     document.querySelector('#root'),
    // );
  }

  export default Robot;