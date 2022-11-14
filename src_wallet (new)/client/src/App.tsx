import {useMemo, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter} from "react-router-dom";
import {Box, createTheme, CssBaseline, IconButton, ThemeProvider} from "@mui/material";
import {Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon} from '@mui/icons-material';
import {ColorModeContext} from './contexts';
import {QueryClient, QueryClientProvider} from "react-query";
import Routes from './Routes';

function App() {
    const queryClient = new QueryClient();
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]);

    return (
        <RecoilRoot>
            <ColorModeContext.Provider value={colorMode}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            {/* TODO: 제거*/}
                            <Box position="absolute" right={15} top={15}>
                                <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Box>
                            <Routes />
                        </BrowserRouter>
                    </ThemeProvider>
                </QueryClientProvider>
            </ColorModeContext.Provider>
        </RecoilRoot>
    );
}

export default App;
