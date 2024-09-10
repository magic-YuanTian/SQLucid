const {
    Box,
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

  function App() {
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
    );
  }

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
    document.querySelector('#root'),
  );
