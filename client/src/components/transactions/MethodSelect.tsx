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

import {IParamGroup, IParamValue, ParamGroup} from "./ParamGroup";
import {IParamType, IMethodInfo, serviceApiMethods} from "../../pages/transactions/DataTypes";
import {generateClasses, CommonSettings} from "../../pages/transactions/AllStyling";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import axios, {AxiosResponse} from "axios";
import OrganizationSelect, {IOrgIdSelectParams} from './OrganizationSelect';
import ResponseResult from './ResponseResult';



export const MethodSelect = ({ defaultMethod, defaultValue, options, onFocus, onChange, onBlur }) => {

    const [methodIndex, setMethodIndex] = useState(defaultValue ?? 0);  // we want to keep value locally
    const [methodName, setMethodName] = useState(options[defaultValue].name ?? undefined);  // we want to keep value locally
    const [orgName, setOrgName]=useState('');
    const [orgId, setOrgId]=useState('');
    const [pubParams, setPubParams]=useState({});
    const [tranParams, setTranParams]=useState({});

    // 'http://10.208.253.184:8888'; // 'http://localhost:8080';
    const [endpointUrl, setEndpointUrl]=useState('http://10.208.253.184:8888');

    useEffect( () => setMethodIndex(defaultValue ?? 0), [defaultValue] );     // we want to update local value on prop value change
    useEffect( () => setMethodName(defaultMethod ?? ''), [defaultMethod] );

    const isDataReady = (methodIndex>0 && endpointUrl);
    const colorStatus = isDataReady?'#003300':'grey';

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
        if (    methodIndex 
            && options[methodIndex] 
            && options[methodIndex].public 
            && options[methodIndex].public.length>0){
            return options[methodIndex].public;
        }
        return [undefined];
    }
    
    const getTrans = ()=>{
        if (    methodIndex 
            && options[methodIndex] 
            && options[methodIndex].trans 
            && options[methodIndex].trans.length>0){
            return options[methodIndex].trans;
        }
        return [undefined];
    }

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleMethodChange = (event) => {
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleMethodChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        // setLocalValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleOrgChanges=(org: IBlossomIdentity)=>{
        console.log(org);
        setOrgName(org.name);
        setOrgId(org.mspId);
    }

    const handleBlur = (event) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };

    const handleParamsChanged=(param:IParamValue)=>{
        let  newCopy = {...pubParams};
        if(param.paramName in Object.keys(pubParams) ){
            newCopy[param.paramName] = param.newValue;
        }else{
            newCopy[`${param.paramName}`]=param.newValue;
        }
        setPubParams(newCopy);
    }

    const handleTransChanged=(param:IParamValue)=>{
        let  newCopy = {...tranParams};
        if(param.paramName in Object.keys(tranParams) ){
            newCopy[param.paramName] = param.newValue;
        }else{
            newCopy[`${param.paramName}`]=param.newValue;
        }
        setPubParams(newCopy);
    }


    return (
        <div style={{ minWidth: "680px", width: "680px", marginTop: 18, marginBottom: 9,}}>
            <FormControl    style={{ m: 1, minWidth: "680px", width: "680px", marginTop: 18, marginBottom: 9,}} >
                { /* BEGIN-METHOD-SELECT MENU */ }
                <InputLabel 
                            id="demo-method-select-label" 
                            htmlFor="demo-method-select"
                            >Select Method</InputLabel>
                <Select  
                    style={{height:34}}
                    id="demo-method-select"
                    labelId="demo-method-select-label"
                    placeholder="Method to Call"
                    onFocus={handleFocus}
                    onChange={handleMethodChange}
                    onBlur={handleBlur}
                    key={methodName}
                    name={methodName}
                    value={methodIndex}
                    defaultValue={defaultValue}
                >
                    {options?.map((option, index: number) => {
                        return (
                            <MenuItem key={option.name} value={index}>
                                {`${index>0?index+'.':''} ${option.name}` ?? index}
                            </MenuItem>
                        );
                    })}
                </Select>

                <FormLabel  
                            style={{ marginTop: 6, marginBottom: 24,color:"darkBlue"}}>
                                {updateDescription(methodIndex)}
                </FormLabel>
                { /* END-METHOD-SELECT MENU */ }

                { /* BEGIN-PARAMETERS-SELECT-INPUT FUNCTIONALITY */ }
                <ParamGroup values={getParams()} title="Public Parameters:" onParamChanges={handleParamsChanged}/>
                <ParamGroup values={getTrans()} title="Transient Parameters:" onParamChanges={handleTransChanged}/>
                { /* END--PARAMETERS-SELECT-INPUT FUNCTIONALITY */ }

                <TextField  
                            style={{marginBottom:9}}
                            label="Service URL"  
                            helperText="Please enter endpoint URL if different from default" 
                            value={endpointUrl}
                            onChange={(e)=> setEndpointUrl(e.target.value)}/>
                
                {/* BEGIN-ORGANIZATION-ID MENU */}
                <OrganizationSelect onOrgSelectChanges={handleOrgChanges}></OrganizationSelect>
                {/* END-ORGANIZATION-ID MENU */}

                <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:colorStatus}}
                    onClick={ ()=>{
                            console.log(`Values:`+
                                        `\n\tMethod${methodName}`+
                                        `\n\tUrl:${endpointUrl}`+
                                        `\n\tId2Use:${orgId}`+
                                        `\n\tName2Use:${orgName}`+
                                        `\n\tPub:${Object.keys(pubParams)}`+
                                        `\n\tPVals:${Object.values(pubParams)}`+
                                        `\n\tTrans:${Object.keys(tranParams)}`+
                                        `\n\tTVals:${Object.values(tranParams)}`

                                        );
                        }
                    }>Submit Request
                </Button>
                
                {/* INFORMATIVE LABEL */}
                <FormLabel  style={{ marginTop: 4, marginBottom: 4,color:colorStatus,}}>
                    For [{methodName}] to [{endpointUrl}] as [{orgName}] Organization
                </FormLabel>
            </FormControl>
            <ResponseResult
                responseTitle={`${methodName} Call Produced the Following:`}
            />
        </div>
    );
};

export default MethodSelect;