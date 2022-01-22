import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

import {IParamType, IMethodInfo, serviceApiMethods} from "../../pages/transactions/DataTypes";
import {generateClasses} from "../../pages/transactions/AllStyling";

// Used to update Parameters at the Main Level
export interface IParamValue{
    paramName: string;    
    newValue: string;
}
export interface IParamGroup{
    title: string;
    values: Array<IParamType>;
    onParamChanges?: (info: IParamValues)=>any;
}

export const ParamGroup = (props: IParamGroup) => {

    const [params, setParams] = useState()
    const isDataPresent = (props.values && props.values.length>0 && props.values[0]);
    const titleColor = isDataPresent?"darkBlue":"lightGrey";
    const blockBorder = isDataPresent?`2px solid #660066`:`1px solid #888888`;
    const titleMargin = isDataPresent?"0 6 0 18":"0 0 0 0"; 

    const onLocalParamChange=(event)=>{
        const et = event.target;
        console.log(`Name:${et.name}; Value:${et.value}; Id:${et.id}; AllKeys:${Object.keys(et)}`);
        if(props.onParamChanges){
           props.onParamChanges({paramName:et.name, newValue:et.value}); 
        }
    };


    function renderSwitch(param: IParamType, index: number) {
    switch (param) {
        case undefined:
        return <div style={{color: titleColor}}>-= None =-</div>
        default:
        return (
        <TextField  id={`text-field-${param.name}-${index}`}
                    name={param.name}
                    style={{ marginTop: 6, marginBottom: 24, color:titleColor, width:"640px",}}
                    helperText={`${param.info}. Type:[${(param.type)}]`} 
                    value={param.value} label={`${index+1}. ${param.name}`}
                    onChange={onLocalParamChange}
            />);
            // (param.type)?`Type-of ${param.type}:`
        }
    }

    return(  
        <div style={{ border: blockBorder, margin: 0, marginBottom: 18, paddingBottom: 11}} >
            <h3 style={{margin: titleMargin, color: titleColor}}>{props.title}</h3>
            {props.values.map((param: IParamType, index: number) => (
                <div>
                    {renderSwitch(param, index)}
                </div>
            ))}
        </div>
    );
}
export default ParamGroup;