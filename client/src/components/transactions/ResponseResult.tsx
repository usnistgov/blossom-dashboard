import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import { IParamType } from '../../pages/transactions/DataTypes';


export interface IResponseResult{
    responseTitle: string;
    resultText?: string;
    resultSource?:()=>Promise<AxiosResponse<any, any>>;

    requestBody: ITransactionRequestBody;

    endPointUrl: string;
    method: string;
    id:string;
    trans: Array<IParamType>;
    params: Array<IParamType>;
}

const ResponseResult = (props:IResponseResult)=>{


    const resetResponseModel=()=>{};
    useEffect( 
            ()=>{
                const selectOrgPadItem:IBlossomIdentity = { name: 'Select Organization (Optional)', 
                                                            mspId:'0'};
                const resetOrgsDataModel = {};

                if( true){
                    RequestHandler.PostRequest(props.endPointUrl, props.requestBody).then(
                        (response)=>{
                            RequestHandler.parseResponseInDepth(response); // <== Debugging
                            if(response.status!==200){
                                resetResponseModel();
                            }
                            if(response && response.data){
                                resetResponseModel();
                            }
                        }
                    ).catch(
                        (error: Error)=>{});
                }
            }, []);

    return (
        <div>
            <h2>{props.responseTitle}</h2>
            <div>
                {props.resultText?props.resultText:"No Result Yet"}
            </div>
        </div>

    );
}

export default ResponseResult;