import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

import {ParamType, MethodInfo, tranApiMethods} from "../../pages/transactions/DataTypes";
import {generateClasses} from "../../pages/transactions/AllStyling";

export interface IParamGroup{
    title: string;
    values: Array<ParamType>;
}


export const ParamGroup = (incomingData: IParamGroup) => {

    const classes = generateClasses;

  function renderSwitch(param: ParamType, index: number) {
    switch (param) {
      case undefined:
        return <div>-= None =-</div>
      default:
        return (
        <TextField className={classes.textField} style={{ marginTop: 6, marginBottom: 24,color:"darkBlue", width:"600px",}}
            helperText={`${param.info}`} 
            value={param.value} label={`${index+1}. ${param.name}`}
            />);
    }
  }

return(  
        <div style={{ border: "1px solid #0000aa", margin: 0, marginBottom: 18, paddingBottom: 11}} className={classes.containerDiv}>
            <h3 style={{margin: 0, marginBottom: 18, minWidth: "100%", maxWidth:"100%"}}>{incomingData.title}</h3>
            {incomingData.values.map((param: ParamType, index: number) => (
            <div>
                {renderSwitch(param, index)}
            </div>
            ))}
        </div>
       )
}


/* 
{}    <div>
        <h3 style={{margin: 0, marginBottom: 15}}>{incomingData.title}</h3>
        {incomingData.values.map(
            <div>
            (param: ParamType, index: number)=>{
              {  switch()
                return(<TextField helperText={`${index+1}. ${param.info}`} value={param.value} label={`${param.name}`}/>)}
            })
        </div>
        }
    </div>
    )
    }}
 */

export default ParamGroup;