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
import { setOriginalNode } from 'typescript';
import { Suspense } from 'react';
import axios, {AxiosResponse} from "axios";



export const MethodSelect = ({ defaultMethod, defaultValue, options, onFocus, onChange, onBlur }) => {

    // orgsIds:Array<IBlossomIdentity>
    const [orgsIds, setOrgsIds] = useState( [{name:'Loading...', mspId:'-1'}] );

    const selectOrgPadItem:IBlossomIdentity = {name: 'Select Organization (Optional)', mspId:'0'};
    const resetOrgsDataModel = 
    (orgList: Array<IBlossomIdentity>)=>{
        orgList.unshift(selectOrgPadItem)
        setOrgsIds(orgList);
        if(orgList.length>0){
            setOrgName(orgList[0].name);
            setOrgId(orgList[0].mspId);
        }
    }

    // This is the weirdest Promise hook-up ever and also forced into the control !!!
    useEffect( 
        ()=>{
            if( orgsIds.length<1 
                || (orgsIds.length===1 && orgsIds[0].mspId==='-1')){
                RequestHandler.GetOrgIdentity().then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // Debugging
                        if(response.status!==200){
                            resetOrgsDataModel(
                                [{  name:`Error Loading IDs ${response.status}:${response.statusText}`, 
                                    mspId:'-100'
                                }]
                            );
                        }
                        if(response && response.data){
                            resetOrgsDataModel(response.data);
                        }
                    }
                ).catch(
                    (error: Error)=>{
                        console.log(`Catch-Exception:${error.message}/${error.stack}`)
                        resetOrgsDataModel(
                            [{  name:`Error Loading IDs ${error.message}:${error.stack}`, 
                                mspId:'-100'
                            }]
                        );                        
                    });;
            }
        }, [orgsIds]);

    const [localValue, setLocalValue] = useState(defaultValue ?? 0);  // we want to keep value locally
    const [methodName, setMethodName] = useState(options[defaultValue].name ?? undefined);  // we want to keep value locally
    const [orgValue, setOrgValue]=useState(0);
    const [orgName, setOrgName]=useState('');
    const [orgId, setOrgId]=useState('');
    // 'http://10.208.253.184:8888'; // 'http://localhost:8080';
    const [endpointUrl, setEndpointUrl]=useState('http://10.208.253.184:8888');

    useEffect( () => setLocalValue(defaultValue ?? 0), [defaultValue] );     // we want to update local value on prop value change
    useEffect( () => setMethodName(defaultMethod ?? ''), [defaultMethod] );

    const isDataReady = (localValue>0 && endpointUrl);
    const colorStatus = isDataReady?'#003300':'grey';

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

    const handleMethodChange = (event) => {
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleMethodChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        // setLocalValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleOrgChange = (event)=>{
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleOrgChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        if(value>=0){
            setOrgValue(value);
            if(orgsIds && orgsIds[value]){
                if (orgsIds[value].name){
                    setOrgName(orgsIds[value].name);}
                if(orgsIds[value].mspId){
                    setOrgId(orgsIds[value].mspId);}
            }
        }
    }

    const handleBlur = (event) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };

    return (
        <div>
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
                    value={localValue}
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
                                {updateDescription(localValue)}
                </FormLabel>
                { /* END-METHOD-SELECT MENU */ }
            </FormControl>

            <FormControl    style={{ m: 1, minWidth: "680px", width: "680px", marginTop: 9, marginBottom: 0,}} >
                 { /* BEGIN-PARAMETERS-SELECT-INPUT FUNCTIONALITY */ }
                <ParamGroup values={getParams()} title="Public Parameters:"/>
                <ParamGroup values={getTrans()} title="Transient Parameters:"/>
                <TextField  
                            style={{marginBottom:9}}
                            label="Service URL"  
                            helperText="Please enter endpoint URL if different from default" 
                            value={endpointUrl}
                            onChange={(e)=> setEndpointUrl(e.target.value)}/>
                { /* END--PARAMETERS-SELECT-INPUT FUNCTIONALITY */ }
            </FormControl>

            <FormControl    style={{minWidth: "680px", width: "680px", marginTop: 9, marginBottom: 9,}} >
                {/* BEGIN-ORGANIZATION-ID MENU */}
                <InputLabel  
                    id="org-id-select-4-demo-label" 
                    htmlFor="org-id-select-4-demo"
                    >Organization ID</InputLabel>
                <Select   
                    style={{marginBottom: 18,paddingBottom:0,height:34}}
                    id="org-id-select-4-demo"
                    label="Select Organization"
                    labelId="org-id-select-4-demo-label"
                    onChange={handleOrgChange}
                    key={orgName}
                    name={orgName}
                    value={orgValue}
                    defaultValue={orgValue}
                    >
                    {orgsIds?.map((org: IBlossomIdentity, index: number) => {
                        return (
                            <MenuItem value={index} key={org.mspId} name={org.name}>
                                { index===0?`${org.name}`:`${index}. Org[${org.name}] Id:${org.mspId}`}
                            </MenuItem>
                        );
                    })}
                </Select>
                {/* END-ORGANIZATION-ID MENU */}
                <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:colorStatus}}
                    onClick={ ()=>{
                            console.log(`Values:`+
                                        `\n\tMethod${methodName}`+
                                        `\n\tUrl:${endpointUrl}`+
                                        `\n\tKey2Use:${orgValue}`+
                                        `\n\tId2Use:${orgId}`+
                                        `\n\tName2Use:${orgName}`
                                        );
                        }
                    }>Submit Request
                </Button>
                <FormLabel  style={{ marginTop: 4, marginBottom: 4,color:colorStatus,}}>
                    For [{methodName}] to [{endpointUrl}] as [{orgName}] Organization
                </FormLabel>
            </FormControl>
        </div>
    );
};

export default MethodSelect;