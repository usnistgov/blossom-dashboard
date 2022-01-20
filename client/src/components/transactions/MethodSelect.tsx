import * as React from 'react';
import { useEffect, useState } from 'react';
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
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";



export const MethodSelect = ({ defaultMethod, defaultValue, options, onFocus, onChange, onBlur }) => {

    let defaultUrl = 'http://10.208.253.184:8888'; // 'http://localhost:8080';

    const idList:Array<IBlossomIdentity> = RequestHandler.GetIdentity();

    const [localValue, setLocalValue] = useState(defaultValue ?? 0);  // we want to keep value locally
    const [methodName, setMethodName] = useState(defaultMethod ?? undefined);  // we want to keep value locally

    useEffect( () => setLocalValue(defaultValue ?? 0), [defaultValue] );     // we want to update local value on prop value change
    useEffect( () => setMethodName(defaultMethod ?? ''), [defaultMethod] );

    const classes = generateClasses;
    const updateDescription = (index: number) => {        
        // setLocalValue(index)
        if (index >=0 && options && options[index] && options[index].info){
            console.log(`index:${index}`);
            return  options[index].info;
        }else{
            return 'No method selected yet';
        }
    }   
    
    const getParams = ()=>{
        if (    localValue 
            && options[localValue] 
            && options[localValue].public 
            && options[localValue].public.length>0){
            return options[localValue].public;
        }
        return [undefined];
    }
    
    const getTrans = ()=>{
        if (    localValue 
            && options[localValue] 
            && options[localValue].trans 
            && options[localValue].trans.length>0){
            return options[localValue].trans;
        }
        return [undefined];
    }


    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        // setLocalValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleBlur = (event) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };



    return (
        <div>
            <FormControl required style={{ m: 1, minWidth: "640px", width: "640px", marginTop: 24, marginBottom: 124,}} className='classes.FormControl'>
                <InputLabel  id="demo-simple-select-required-label" className={classes.inputLabel} >Select Method</InputLabel>
                <Select  variant="standard"
                    id="demo-simple-select-required-label" autoWidth className={classes.select}
                    label="demo-simple-select-required-label"
                    placeholder="Method to Call"
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    key={methodName}
                    name={methodName}
                    value={localValue}
                    defaultValue={localValue}
                >
                    {options?.map((option, index: number) => {
                        return (
                            <MenuItem key={option.name} value={index}>
                            {`${index>0?index+'.':''} ${option.name}` ?? index}
                            </MenuItem>
                        );
                    })}
                </Select>

                <FormLabel  className={classes.inputLabel} 
                            style={{ marginTop: 6, marginBottom: 24,color:"darkBlue"}}>
                                {updateDescription(localValue)}
                </FormLabel>

                <ParamGroup values={getParams()} title="Public Parameters:"/>

                <ParamGroup values={getTrans()} title="Transient Parameters:"/>

                <TextField  className={classes.textField} 
                            style={{marginBottom:18}}
                            label="Service URL"  
                            helperText="Please enter desired URL if different from default" 
                            value={defaultUrl}/>

                <InputLabel  id="demo2-select-id-label" className={classes.inputLabel}>Use Organization ID</InputLabel>
                <Select  variant="standard"
                    id="demo2-select-id-select" autoWidth className={classes.select}
                    label="demo2-select-id-label"
                    placeholder="Method to Call"
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    key={methodName}
                    name={methodName}
                    value={localValue}
                    defaultValue={localValue}
                >
                    {idList?.map((id, index: number) => {
                        return (
                            <MenuItem key={id.name} value={index}>
                            {`${index+1}. Org:${id.name}  mspId:${id.mspId}`}
                            </MenuItem>
                        );
                    })}
                </Select>    

                <Button variant="contained"
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