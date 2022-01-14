import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import FormControl from '@material-ui/core/FormControl/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
//import InputMask from "react-input-mask";
//import TextField from '@material-ui/core/TextField/TextField';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
        width: "34vw",
        height: "8vh",
        alignSelf: "center"
    },
    selectEmpty: {
        alignSelf: "center",
        marginTop: theme.spacing(2)
    },
    select: {
        alignSelf: "center",
        width: "34vw",
        marginTop: theme.spacing(2),
        height: "3vh"
    },
    inputLabel: {
        fontSize: "1.5vh",
        alignSelf: "center"
    },
    menuItem: {
        alignSelf: "center",
        height: "15vh"
    },
    formLabel:{
        marginTop: theme.spacing(1),
        alignSelf: "center",
        height: "10vh",
        width: "34vw"
    },
    textField:{

    }
}));



export const MethodSelect = ({ name, value, options, onFocus, onChange, onBlur }) => {



    const classes = useStyles();
    const [localValue, setLocalValue] = useState(value ?? -1);  // we want to keep value locally
    useEffect( () => setLocalValue(value ?? -1), [value]);       // we want to update local value on prop value change

    const updateDescription = (index) => {
        console.log(`index:${index}`);
        // setLocalValue(index)
        if (index >=0){
            return  options[index].description;
        }else{
            return 'No method selected yet';
        }
    }   
    
    const getParams = ()=>{
        if (localValue && options[localValue]){
            return options[localValue].params;
        }
        return [undefined];
    }
    
    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(`e.target.value:${e.target.value}`);
        // setLocalValue(value);
        if (onChange) {
            onChange(value);
        }
    };
    const handleBlur = (e) => {
        if (onBlur) {
            onBlur(e.target.value);
        }
    };
    const theme = useTheme();

    const getStyle = ()=>{
        return {
            innerHeight: 180,
        }
    }

    return (
        <div>
            <FormControl required sx={{ m: 1, minWidth: 180 }} style={getStyle()} className='classes.FormControl'>
                <InputLabel  id="demo-simple-select-required-label" className={classes.inputLabel} >Select Method</InputLabel>
                <Select  id="demo-simple-select-required-label" autoWidth className={classes.select}
                    labelId="demo-simple-select-required-label"
                    placeholder="Method to Call"
                    name={name}
                    value={localValue}      // we want to work in controlled mode
                    onFocus={handleFocus}
                    onChange={handleChange} // we want to work in controlled mode
                    onBlur={handleBlur}
                >
                            <MenuItem value="-1">
                                <em>None</em>
                            </MenuItem>
                    {options?.map((option, index: number) => {
                        return (
                            <MenuItem key={option.name} value={index}>
                            {`${index+1}. ${option.name}` ?? index}
                            </MenuItem>
                        );
                    })}
                </Select>
                <FormLabel className={classes.formLabel}>{updateDescription(localValue)}</FormLabel>

                {getParams().map( (param, index: number)=>{
                    if( param && param.type){
                        return (<div>{`${index+1}. ${param.name} of-type ${param.type}`}</div>)
                    }else{
                        return (<div>No Parameters</div>)
                    }
                })}
            </FormControl>         
        </div>
    );
};

export default MethodSelect;