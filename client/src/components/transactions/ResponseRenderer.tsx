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




export interface IResponseRenderer{
    formWidth: string;

}




const ResponseRenderer = (props: IResponseRenderer)=>{


    const formWidth = props.formWidth
    const [allResponses, setAllResponses]=useState(new Array<IPostResponse>());
    return (            
        <FormControl style={{ m: 1, minWidth: formWidth, width: formWidth, marginTop: 18, marginBottom: 9, border:`2px solid #222222`}} >
            <div>
                <ButtonGroup style={{width:`100%`, itemAlign:`center`, textAlign:`center`, }}>                    
                    <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkred`, border:`1px color:purple`}}
                        onClick={
                        setAllResponses[new Array<IPostResponse>()]}>
                        Delete All Responses
                    </Button>
                    <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,color:`darkorange`}/*backgroundColor*/ }
                        onClick={
                            setAllResponses[new Array<IPostResponse>()]}>
                        Remove Oldest {}
                    </Button>
                    <Button variant="contained" style={{ marginTop: 4, marginBottom: 4,backgroundColor:`lightgrey`}} disabled={true}>
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
            <h4>{`LenResp:${allResponses.length}`}</h4>
            {
                allResponses.map( (response: IPostResponse, index:number)=>{
                        return (
                            <div key={`Key-For-Div-${index}`}>
                                <FormLabel style={styleResponseTimeInfo(response)}
                                    value={`@${response.timeStamp} done in `+
                                            `${(Number(response.timeBack)-response.timeSent)/1000.0} seconds`} >
                                    {`@${response.timeStamp} done in `+
                                    `${(Number(response.timeBack)-response.timeSent)/1000.0} seconds`}
                                </FormLabel>
                                <FormLabel style={styleResponse(response)}
                                    value={response.responseInfo?response.responseInfo.data:
                                            (response.errorInfo)?'response.errorInfo.data': 'no info' }>
                                    {`${index>0?index+'.':''} ${response.isError}` ?? index}
                                    {response.responseInfo?response.responseInfo.data:
                                            (response.errorInfo)?response.errorInfo.data: 'no info' }
                                </FormLabel>
                            </div>
                        );
                    }
                )
            }
            </div>
        </FormControl>
    );

}

export default ResponseRenderer; 