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
import {generateClasses, CommonSettings} from "../../pages/transactions/AllStyling";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import axios, {AxiosResponse} from "axios";
import OrganizationSelect, {IOrgIdSelectParams} from './OrganizationSelect';
import ResponseResult from './ResponseResult';
import {IParamType, IMethodInfo, serviceApiMethods} from "../../pages/transactions/DataTypes";


export interface IMethodSelect{
    defaultMethod: string;
    defaultValue: number;
    options:Array<IMethodInfo>;
    onFocus?: (e: Event)=>void;
    onChange?: (e: Event)=>void;
    onBlur?: (e: Event)=>void;
}

// { defaultMethod, defaultValue, options, onFocus, onChange, onBlur }
export const MethodSelect = (props: IMethodSelect) => {

    const [methodIndex, setMethodIndex] = useState(props.defaultValue ?? 0);  // we want to keep value locally
    const [methodName, setMethodName] = useState(props.options[props.defaultValue].name ?? undefined);  // we want to keep value locally
    const [orgName, setOrgName]=useState('');
    const [orgId, setOrgId]=useState('');
    const [pubParams, setPubParams]=useState({});
    const [tranParams, setTranParams]=useState({});
    const [request, setRequest] = useState( 
        ()=>{
            let objRequest:ITransactionRequestBody={ 
                    name:'', 
                    args:new Array<string>(), 
                    transient:{},
                    identity: '',
                }; 
                return objRequest
            });

    // 'http://10.208.253.184:8888'; // 'http://localhost:8080';
    const [endpointUrl, setEndpointUrl]=useState('http://10.208.253.184:8888');

    useEffect( () => setMethodIndex(props.defaultValue ?? 0), [props.defaultValue] );     // we want to update local value on prop value change
    useEffect( () => setMethodName(props.defaultMethod ?? ''), [props.defaultMethod] );

    const isDataReady = (methodIndex>0 && endpointUrl);
    const colorStatus = isDataReady?'#003300':'grey';

    const updateDescription = (index: number) => {        
        // setLocalValue(index)
        if (index >=0 && props.options && props.options[index] && props.options[index].info){
            console.log(`index:${index}`);
            return  props.options[index].info;
        }else{
            return 'No method selected yet';
        }
    }   
    
    const getParams = ():Array<IParamType|undefined> =>{
        if (    methodIndex 
            && props.options[methodIndex] 
            && props.options[methodIndex].public 
            && props.options[methodIndex].public.length>0){
            return props.options[methodIndex].public;
        }
        return [undefined];
    }
    
    const getTrans = ():Array<IParamType|undefined>=>{
        if (    methodIndex 
            && props.options[methodIndex] 
            && props.options[methodIndex].trans 
            && props.options[methodIndex].trans.length>0){
            return props.options[methodIndex].trans;
        }
        return [undefined];
    }

    const handleFocus = () => {
        if (props.onFocus) {
            props.onFocus();
        }
    };

    const handleMethodChange = (event) => {
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleMethodChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        // setLocalValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    const handleOrgChanges=(org: IBlossomIdentity)=>{
        console.log(org);
        setOrgName(org.name);
        setOrgId(org.mspId);
    }

    const handleBlur = (event) => {
        if (props.onBlur) {
            props.onBlur(event.target.value);
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
        setTranParams(newCopy);
        if (   methodIndex 
            && props.options[methodIndex] 
            && props.options[methodIndex].trans 
            && props.options[methodIndex].trans.length>0){
                props.options[methodIndex].trans.forEach(
                    (element: IParamType)=>{
                        if(element.name === param.paramName){
                            element.value = newCopy;
                        }
                    }
                );
            }
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
                    defaultValue={props.defaultValue}
                >
                    {props.options?.map((option, index: number) => {
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
                <ParamGroup values={getParams()} 
                            valuesHistory={pubParams}
                            title="Public Parameters:" 
                            onParamChanges={handleParamsChanged}
                            useHistoryValues={true}
                        />
                <ParamGroup values={getTrans()} 
                            valuesHistory={tranParams}
                            title="Transient Parameters:" 
                            onParamChanges={handleTransChanged}
                            useHistoryValues={true}
                        />
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
                                        `\n\tTVals:${Object.values(tranParams)}`+
                                        '\n\tGetTrans:${getTrans()}'+
                                        ''+
                                        ''+
                                        ''
                                        );
                             let objRequest:ITransactionRequestBody={ 
                                        name:methodName, 
                                        args:new Array<string>(), 
                                        identity: orgId,
                                    };
                                const trans = getTrans();
                                if(trans && trans[0]){

                                } 
                            setRequest(objRequest);
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
                endPointUrl={endpointUrl}
                
                requestBody={request}
            />
        </div>
    );
};

export default MethodSelect;