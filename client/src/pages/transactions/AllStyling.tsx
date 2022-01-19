import { makeStyles, Theme, createStyles , useTheme} from "@material-ui/core/styles"; 
import shadows from "@material-ui/core/styles/shadows";

const insideW = '36vw';
const outsideW = '36vw';

export const generateClasses = makeStyles(
(theme: Theme) => ({
    formControl: {
        margin: theme.spacing(3),
        width: outsideW,
        height: "8vh",
        alignSelf: "center",
        border: '1px ',
        display: "flex",
        wrap: "wrap",
    },
    selectEmpty: {
        width: insideW,
        alignSelf: "center",
        marginTop: theme.spacing(5)
    },
    select: {
        alignSelf: "center",
        width: insideW,
        marginTop: theme.spacing(2),
        height: "3vh"
    },
    inputLabel: {
        width: insideW,
        fontSize: "1.5vh",
        alignSelf: "center"
    },
    menuItem: {
        width: insideW,
        alignSelf: "center",
        height: "15vh"
    },
    formLabel:{
        marginTop: theme.spacing(3),
        alignSelf: "center",
        height: "20vh",
        width: insideW,
        
    },
    textField:{
        width: "34vw",
    },
    containerDiv: {
            //  display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderColor: '#ccc', 
            borderWidth: '1px', 
            width: outsideW, 
            margin: 2,
            borderRadius: 5, 
            border: "1px solid green",
        },
}));