import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6d6d6d',
            main: '#424242',
            dark: '#1b1b1b',
            contrastText: '#fff',
        },
        secondary: {
            light: '#82e9de',
            main: '#4db6ac',
            dark: '#00867d',
            contrastText: '#000',
        },
    },
});

export default theme;