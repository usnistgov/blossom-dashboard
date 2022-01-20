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

  const isDataPresent = (incomingData.values && incomingData.values.length>0 && incomingData.values[0]);
  const titleColor = isDataPresent?"darkBlue":"lightGrey";
  const blockBorder = isDataPresent?`2px solid #660066`:`1px solid #888888`;
  const titleMargin = isDataPresent?"0 6 0 18":"0 0 0 0"; 
  
  function renderSwitch(param: ParamType, index: number) {
    switch (param) {
      case undefined:
        return <div style={{color: titleColor}}>-= None =-</div>
      default:
        return (
        <TextField  className={classes.textField} 
                    style={{ marginTop: 6, marginBottom: 24, color:titleColor, width:"600px",}}
                    helperText={`${param.info}. Type:[${(param.type)}]`} 
                    value={param.value} label={`${index+1}. ${param.name}`}
            />);
            // (param.type)?`Type-of ${param.type}:`
    }
  }

return(  
        <div style={{ border: blockBorder, margin: 0, marginBottom: 18, paddingBottom: 11}} className={classes.containerDiv}>
            <h3 style={{margin: titleMargin, color: titleColor}}>{incomingData.title}</h3>
            {incomingData.values.map((param: ParamType, index: number) => (
                <div>
                    {renderSwitch(param, index)}
                </div>
            ))}
        </div>
       );
}
export default ParamGroup;