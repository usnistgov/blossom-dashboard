import * as React from 'react';
import TextField from '@material-ui/core/TextField/TextField';

import {IParamType, IParamValues} from "../../pages/transactions/DataTypes";

// Used to update Parameters at the Main Level
export interface IParamValue{
    paramName: string;    
    newValue: string;
}
export interface IParamGroup{
    title: string;
    values: Array<IParamType|undefined>;
    useHistoryValues?:boolean;
    valuesHistory: IParamValues;
    onParamChanges?: (param: IParamValue)=>void;
}

export const ParamGroup = (props: IParamGroup) => {

    //const [params, setParams] = useState()
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

    // function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    //     return o[propertyName]; // o[propertyName] is of type T[K]
    // }

    function renderSwitch(param: IParamType|undefined, index: number) {
    switch (param) {
        case undefined:
           return <div style={{color: titleColor}}>-= None =-</div>
        default:
            // if(!param.value){
            //     param.value = '';
            // }
            // console.log(`${getProperty(props.valuesHistory,param.name as keyof IParamValues)} ---!!!`);
            // if(param.name in Object.keys(props.valuesHistory) && props.useHistoryValues){
            //     console.log(`${props.valuesHistory[param.name as keyof IParamValues]}`);
            //     param.value = getProperty(props.valuesHistory,param.name as keyof IParamValues);
            // }
            return (
                <TextField  id={`text-field-${param.name}-${index}`}
                            name={param.name}
                            style={{ marginTop: 6, marginBottom: 24, color:titleColor, width:"90%",}}
                            helperText={`${param.info}. Type:[${(param.type)}]`} 
                            value={param.value} label={`${index+1}. ${param.name}`}
                            onChange={onLocalParamChange}
                />
                );
            // (param.type)?`Type-of ${param.type}:`
        }
    }

    return(  
        <div style={{ border: blockBorder, margin: 0, marginBottom: 18, paddingBottom: 11}} >
            <h3 style={{margin: titleMargin, color: titleColor}}>{props.title}</h3>
            {props.values.map((param: IParamType|undefined, index: number) => (
                <div key={`Param-Id-${index}`}>
                    {renderSwitch(param, index)}
                </div>
            ))}
        </div>
    );
}
export default ParamGroup;