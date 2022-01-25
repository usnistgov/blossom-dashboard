import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import { IParamType, IMethodInfo } from '../../pages/transactions/DataTypes';


export interface IResponseResult{
    responseWaitingTitle: string;
    resultWaitingText?: string;
    onResultFinished: (data: IPostResponse)=>void;

    call_info: IMethodInfo;
    endPointUrl: string;
    call_name: string;
    id_for_call:string;
    trans?: Array<IParamType|undefined>;
    params?: Array<IParamType|undefined>;
}

export interface IResponseData{
    status?: string;
    data?:string;
    text?:string;
    essence?:string
}
export interface IPostResponse{
    timeSent:number;
    timeBack?:number;
    timeStamp?:string;
    originalUrl:string;
    originalRequest: ITransactionRequestBody;
    isError?:boolean;
    responseInfo?: IResponseData;
    errorInfo?: IResponseData;
}

const ResponseResult = (props:IResponseResult)=>{

    const prepareRequest = (): ITransactionRequestBody=>{

        const request:ITransactionRequestBody  = {
            name: props.call_name,
            identity: props.id_for_call,  
            args: getPublicParams(),          
            transient: getTransientParams(),
        }
        return request;
    }

    const [isReady, setIsReady]= useState(false);
    const [isError, setIsError]= useState(false);
    const [result, setResult] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
    const [fatResponse, setFatResponse] = useState({});
    const frameBorder = ()=> {return (isReady)?((isError)?'1px red':'1px green'):'';} 
    const textColor = ()=> {return ((isError)?'#aa0000':'#660066');} 
    
    const resetResponseModel=()=>{};
    useEffect( 
            ()=>{
                setErrorStatus(``);
                let fatResponse: IPostResponse={
                    timeSent:Date.now(),
                    originalRequest: prepareRequest(),
                    originalUrl: props.endPointUrl,
                }
                setFatResponse(fatResponse);
                RequestHandler.PostRequest(props.endPointUrl, fatResponse.originalRequest)
                    .then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // <== Debugging]\
                        fatResponse = {...fatResponse};
                        if(response.status!==200){
                            fatResponse.isError = true;
                            setIsError(true);
                            resetResponseModel();
                            setErrorStatus(response);
                        }else{ // Response Status===200!!!
                            setIsError(false);
                            fatResponse.isError = false;                            
                            if(response && response.data){
                                setResult(response.data);
                                resetResponseModel();
                                fatResponse.responseInfo ={
                                    status: response.status.toString(),
                                    text: response.statusText,
                                    data: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                    essence: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                };
                            }else{ // Case of no Response.Data
                                fatResponse.responseInfo ={
                                    status: response.status.toString(),
                                    text: response.statusText,
                                    data: response.data?JSON.stringify(response.data, null, 2 ): 'No-Data-Response',
                                    essence:response.data?JSON.stringify(response.data, null, 2 ): 'No-Data-Response',
                                };
                            }
                        }                        
                        setFatResponse(fatResponse)
                        dispatchResponseBack(fatResponse);
                    })
                    .catch(
                    (error)=>{
                        setIsError(true);
                        fatResponse.isError = true;
                        if (error && error.response) {
                            // Request made and server responded
                            console.log(`Error-Status:${error.response.status}`);
                            console.log(`Error-Data:${error.response.data}`);
                            console.log(`Error-Headers${error.response.headers}`);
                            fatResponse.errorInfo = {
                                data: error.response.data,
                                status: error.response.status,
                                text: '',
                            }
                        } 
                        setErrorStatus(`IsError:${isError}! ${error.name}!\n\t${error.message}`);
                        console.log(`${error.name}!\n\t${error.message}`);
                        setFatResponse(fatResponse)
                        dispatchResponseBack(fatResponse);
                    })              
                // Runs for all cases - Errors and otherwise!!!
                .then(
                    (data)=>{
                        fatResponse.timeBack=Date.now();
                        fatResponse.timeStamp = new Date().toISOString();
                        setIsReady(true);
                        console.log(`IsError:${isError} - ${errorStatus}`);
                        // in either case - must reset submit button
                        setFatResponse(fatResponse)
                        dispatchResponseBack(fatResponse);
                    }
                );
            }, []);

    function dispatchResponseBack(fatResponse: IPostResponse) {
        if (!isError) {
            props.onResultFinished(fatResponse);
        } else {
            setTimeout(
                () => { props.onResultFinished(fatResponse); },
                15000
            );
        }
    }

// export interface ITransactionRequestBody{
//     name: string;
//     args: string[];
//     transient?: {
//         [key: string]: string;
//     };
//     identity: string;
// };

    const getPublicParams = ():Array<string> => { // Prepare Pub-Params
        const publicParams = Array<string>();
        if(props.params && props.params.length>0){
            props.params.forEach( 
                (param:IParamType)=>{
                    publicParams.push(`${param.value}`);
                    console.log(`Pub ${param.name}=${param.value}`);
                });
        }
        return publicParams;
    }

    const getTransientParams = ()=>{ // Prepare Trans-Params
        let allTrans: {[key:string]:string|number}={};
        let transParams: {[key:string]:string|number} = {};
        if(props.trans && props.trans.length>0){
            props.trans.forEach(
                (param:IParamType)=>{
                    if(param.type && param.type==='number'){
                        transParams[`${param.name}`]=Number(`${param.value}`);
                    }else{
                        transParams[`${param.name}`]=`${param.value}`;
                    }
                    console.log(`Tran ${param.name}=${param.value}`);
                });
        }
        // Extra step of wrapping the object !
        if(props.call_info.transWrapper){
            allTrans[`${props.call_info.transWrapper}`]=JSON.stringify(transParams);
        }
        return allTrans;
    }



    const renderTitle= ()=>{
        if(!isReady){
            return (`${props.responseWaitingTitle}`);
        }else{

        }
    }

    const renderResult = ()=>{
        if(isReady){
            return(<div>
                Work in Progress
            </div>
            );
        }else{
            return (
                    <div style={{color:textColor(), }}>
                        {
                            `${result?result:"No Result Yet. Loading..."}`
                            //(isError)?errorStatus:renderResult()
                        }
                    </div>
                );
        }
    }

    return (
        <div style={{ border: frameBorder()}}>
            <h2  style={{color:textColor(), }}>{renderTitle()}</h2>
        </div>

    );
}

export default ResponseResult;