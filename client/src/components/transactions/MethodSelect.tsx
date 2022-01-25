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
import ResponseResult, { IPostResponse } from './ResponseResult';
import {IParamType, IMethodInfo, serviceApiMethods} from "../../pages/transactions/DataTypes";
import ButtonGroup from '@material-ui/core/ButtonGroup/ButtonGroup';


export interface IMethodSelect{
    defaultMethod: string;
    defaultValue: number;
    options:Array<IMethodInfo>;
    onFocus?: (e: Event|undefined)=>void;
    onChange?: (e: Event|undefined)=>void;
    onBlur?: (e: Event|undefined)=>void;
}

// { defaultMethod, defaultValue, options, onFocus, onChange, onBlur }
export const MethodSelect = (props: IMethodSelect) => {

    const [isWaiting, setIsWaiting] = useState(false);
    const [resultReady, setResultReady]=useState(false);
    const [methodIndex, setMethodIndex] = useState(props.defaultValue ?? 0);  // we want to keep value locally
    const [methodName, setMethodName] = useState(props.options[props.defaultValue].name ?? undefined);  // we want to keep value locally
    const [orgName, setOrgName]=useState('');
    const [orgId, setOrgId]=useState('');
    const [pubParams, setPubParams]=useState({});
    const [tranParams, setTranParams]=useState({});
    const [allResponses, setAllResponses]=useState(new Array<IPostResponse>());
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

    const formWidth="800px";
    const isDataReady = (methodIndex>0 && endpointUrl);
    const colorStatus = isDataReady?'#006600':'grey';

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

    const handleFocus = (event: Event) => {
        if (props.onFocus) {
            props.onFocus(event);
        }
    };

    const handleMethodChange = (event: Event) => {
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleMethodChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        // setLocalValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    const handleOrgChanges=(org: IBlossomIdentity)=>{
        // console.log(org);
        setOrgName(org.name);
        setOrgId(org.mspId);
    }

    const handleBlur = (event: Event) => {
        if (props.onBlur) {
            props.onBlur(event);
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
        // Can not do that in COntrolled element !!!!
        // Only allowed to hang the object in the state!!!
        // if (   methodIndex 
        //     && props.options[methodIndex] 
        //     && props.options[methodIndex].trans 
        //     && props.options[methodIndex].trans.length>0){
        //         props.options[methodIndex].trans.forEach(
        //             (element: IParamType)=>{
        //                 if(element.name === param.paramName){
        //                     element.value = newCopy;
        //                 }
        //             }
        //         );
        //     }
    }

    const getSetParams = (methodParams: Array<IParamType>|undefined, setParams:Object): Array<IParamType>=>{
        const retArray = new Array<IParamType>();
        if (methodParams){
            const keys = Object.keys(setParams);
            const values = Object.values(setParams);
            methodParams.forEach( 
                (param:IParamType, order:number) => {
                    keys.forEach(
                        (setKey:string, idx:number) => {
                            if(setKey === param.name){
                                const paramCopy = {...param};
                                paramCopy.value = `${values[idx]}`;
                                retArray.push(paramCopy);
                                // console.log(`Pushed:[${paramCopy.name}]=${paramCopy.value}`);
                            }
                    });
            });
        }
        return retArray;
    }

    const callWasFinished = (newData: IPostResponse)=>{
        console.log(`IsError:${newData.isError} URL:${newData.originalUrl}`)
        const newCopy = [...allResponses];
        newCopy.unshift(newData);
        setAllResponses(newCopy);
        setResultReady(true);
        setIsWaiting(false);
    }


    const renderRequestingTab=(isReady:boolean)=>{
        if(isReady){
            return(
                <ResponseResult
                    responseWaitingTitle={`Posting ${methodName} call may take some time... Please, wait.`}
                    resultWaitingText={`Result is not ready yet. Loading...`}
                    onResultFinished={callWasFinished}
                    endPointUrl={endpointUrl}
                    call_name={methodName}
                    id_for_call={orgName}
                    trans={getSetParams(props.options[methodIndex].trans, tranParams)}
                    params={getSetParams(props.options[methodIndex].public, pubParams)}
                    call_info={props.options[methodIndex]}
                />
            );
        }else{
            return ('Press [Submit Request] Button, When Ready');
        }
    }

    const styleResponseTimeInfo = (response:IPostResponse)=>{
        return ((response.isError)?
                {color:'darkred', fontWeight: 'bold', textAlign:'left'}
                :{color:'black',fontWeight: 'bold', textAlign:'left'});
    }

    const styleResponse = (response:IPostResponse)=>{
        return (response.isError)?{color:'darkred',} :{color:'darkblue',};
    }

    const keepLast=(toKeep:number)=>{
        
    }

   const killOldest=(toKill:number)=>{

    }

    /*
            {
            "name": "UploadATO",
            "args": [],
            "transient": {
            "ato": "{\"ato\": \"jfkdljfkldasjfklas\"}"
            },
            "identity": "samsadmin"
            }

    */

    return (
        <div style={{ minWidth: "680px", width: formWidth, marginTop: 18, marginBottom: 9,}}>
            <FormControl    style={{ m: 1, minWidth: formWidth, width: formWidth, marginTop: 18, marginBottom: 9,}} >
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
                                {`${index>0?index+'. ':''} ${option.name}` ?? index}
                                {(option.isOptional)?` - (Optional for Demo)`:``}
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
                            useHistoryValues={false}
                        />
                <ParamGroup values={getTrans()} 
                            valuesHistory={tranParams}
                            title="Transient Parameters:" 
                            onParamChanges={handleTransChanged}
                            useHistoryValues={false}
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
                    disabled = {(isWaiting)}
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
                                        `\n\tGetTrans:${Object.keys(getTrans())}`+
                                        `\n\tGetTransV:${Object.values(getTrans())}`+
                                        ``+
                                        ``
                                        );
                            setIsWaiting(true);
                            setResultReady(false);
                        }
                    }>Submit Request
                </Button>
                
                {/* INFORMATIVE LABEL */}
                <hr/>
                <FormLabel  style={{ marginTop: 4, marginBottom: 4, color:colorStatus, 
                                justifyContent: 'left',alignItems: 'left', textAlign:`left`}}>
                    Calling Method: &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;[{methodName}] <br/>
                    Endpoint URL: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[{endpointUrl}] <br/>
                    Organization Name: &nbsp; [{orgName}]  <br/>
                    Organization ID: &nbsp; &nbsp; &nbsp; &nbsp; [{orgId}]
                </FormLabel>
                <hr/>
                <div>
                    {renderRequestingTab(isWaiting)}
                </div>            
                <hr/>            
            </FormControl>

            <FormControl style={{ m: 1, minWidth: formWidth, width: formWidth, marginTop: 18, marginBottom: 9, border:`2px solid #222222`}} >
                <div>
                    <ButtonGroup style={{width:`100%`, itemAlign:`center`, textAlign:`center`, justifyContent: 'center'}}>       
                        <Button variant="contained" 
                                style={{ marginTop: 4, marginBottom: 4,backgroundColor:`#330033`, color:'yellow'}} 
                                disabled={true}>
                            <h4>{`${allResponses.length} Resp.`}</h4>
                        </Button>
               

                        <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkred`, border:`1px color:purple`}}
                            onClick={
                            setAllResponses[new Array<IPostResponse>()]}>
                            Remove All 
                        </Button>
                        <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkorange`}/*backgroundColor*/ }
                            onClick={ 
                                setAllResponses[new Array<IPostResponse>()]}>
                            Remove Oldest {((allResponses.length>3)?Math.ceil(allResponses.length/2):'')}
                        </Button>


                        <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkgreen`}/*backgroundColor*/ }
                            onClick={
                                setAllResponses[new Array<IPostResponse>()]}>
                            Keep Last 12
                        </Button>
                        <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkgreen`}/*backgroundColor*/ }
                            onClick={
                                setAllResponses[new Array<IPostResponse>()]}>
                            Keep Last 3
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                {allResponses.map( (response: IPostResponse, index:number)=>{
                            return (
                                <div key={`Key-For-Div-${index}`}>
                                    
                                    <FormLabel style={styleResponseTimeInfo(response)}
                                        value={`@${response.timeStamp} done in `+
                                                `${(Number(response.timeBack)-response.timeSent)/1000.0} seconds`} >
                                        {`@${response.timeStamp} done in `+
                                        `${(Number(response.timeBack)-response.timeSent)/1000.0} seconds`}
                                    </FormLabel>
                                    <FormLabel style={styleResponse(response)}>
                                        {`${index>0?`${index+1}`+'.':''} ${response.isError}` ?? index}
                                        {response.responseInfo?response.responseInfo.data:
                                                (response.errorInfo)?response.errorInfo.data:'no info'}
                                    </FormLabel>
                                </div>
                            );
                        }
                    )
                }
                </div>
            </FormControl>
        </div>
    );


};

export default MethodSelect;