import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";


export interface IResponseResult{
    responseTitle: string;
    resultText?: string;
    
    resultSource?:()=>Promise<AxiosResponse<any, any>>;
    requestBody?: ITransactionRequestBody;
}

const ResponseResult = (props:IResponseResult)=>{



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