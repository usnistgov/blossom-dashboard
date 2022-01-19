import * as React from 'react';
import { useEffect, useState } from 'react';
import { Theme, } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import FormControl from '@material-ui/core/FormControl/FormControl';

import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';

//import InputMask from "react-input-mask";
//import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

import {IParamGroup, ParamGroup} from "./ParamGroup";
import {ParamType, MethodInfo, tranApiMethods} from "../../pages/transactions/DataTypes";
import {generateClasses, CommonSettings} from "../../pages/transactions/AllStyling";




export const MethodSelect = ({ name, value, options, onFocus, onChange, onBlur }) => {


    let defaultUrl = 'http://localhost:8080';
    
    const [localValue, setLocalValue] = useState(value ?? -1);  // we want to keep value locally
    useEffect( () => setLocalValue(value ?? -1), [value]);       // we want to update local value on prop value change

    const classes = generateClasses;
    const updateDescription = (index: number) => {
        console.log(`index:${index}`);
        // setLocalValue(index)
        if (index >=0){
            return  options[index].info;
        }else{
            return 'No method selected yet';
        }
    }   
    
    const getParams = ()=>{
        if (localValue && options[localValue] && options[localValue].public && options[localValue].public.length>0){
            return options[localValue].public;
        }
        return [undefined];
    }
    
    const getTrans = ()=>{
            if (localValue && options[localValue] && options[localValue].trans && options[localValue].trans.length>0){
                return options[localValue].trans;
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



    return (
        <div>
            <FormControl required style={{ m: 1, minWidth: "640px", width: "640px", marginTop: 24, marginBottom: 124,}} className='classes.FormControl'>
                <InputLabel  id="demo-simple-select-required-label" className={classes.inputLabel} >Select Method</InputLabel>
                <Select  id="demo-simple-select-required-label" autoWidth className={classes.select}
                    label="demo-simple-select-required-label"
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
                <FormLabel className={classes.inputLabel} style={{ marginTop: 6, marginBottom: 24,color:"darkBlue"}}>{updateDescription(localValue)}</FormLabel>

                <ParamGroup values={getParams()} title="Public Parameters:"/>

                <ParamGroup values={getTrans()} title="Transient Parameters:"/>

                <TextField className={classes.textField} label="Service URL"  helperText="Please enter desired URL if different from default" value={defaultUrl}/>
                <Button variant="outlined"
                    onClick={ ()=>{
                            console.log(`value=${value}`);
                        }
                    }
                >Submit Request to {defaultUrl}</Button>
            </FormControl>
        </div>
    );
};

export default MethodSelect;