import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import { IParamType, IMethodInfo } from '../../pages/transactions/DataTypes';


export interface IResponseResult{
    responseWaitingTitle: string;
    resultProcessingTitle?: string;
    onResultFinished: (data: IPostResponse)=>void;
    call_info: IMethodInfo;
    endPointUrl: string;
    request: ITransactionRequestBody;
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
    originalUrl?:string;
    originalRequest: ITransactionRequestBody;
    isError?:boolean;
    responseInfo?: IResponseData;
    errorInfo?: IResponseData;
}

const ResponseResult = (props:IResponseResult)=>{

    const [isReady, setIsReady]= useState(false);
    const [isError, setIsError]= useState(false);
    const [result, setResult] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
    const [fatResponse, setFatResponse] = useState({});
    const [outRequest, setOutRequest] = useState(props.request);

    const frameBorder = ()=> {return (isReady)?((isError)?'1px red':'1px green'):'';} 
    const textColor = ()=> {return ((isError)?'#aa0000':'#660066');} 

    
    const resetResponseModel=()=>{};
    useEffect( 
            ()=>{
                const requestToPost = outRequest || props.request;
                setErrorStatus(``);
                let initFatResponse: IPostResponse={
                    timeSent:Date.now(),
                    originalRequest: requestToPost,
                    originalUrl: props.endPointUrl,
                    timeStamp: new Date().toISOString(),
                }
                setOutRequest(requestToPost);
                setFatResponse(initFatResponse);
                const newFatResponse = {...initFatResponse as IPostResponse};
                newFatResponse.originalRequest=outRequest;
                console.log(`@${new Date().toLocaleTimeString()} BEFORE:RequestHandler.PostRequest(...) Method:${newFatResponse.originalRequest.name}`);

                RequestHandler.PostRequest(props.endPointUrl, requestToPost)
                    .then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // <== Debugging]\
                        console.log(`@${new Date().toLocaleTimeString()} in 1st THEN(). Before Status ?in? 200s`);
                        if(response && response.status<200 && response.status>=300){
                            console.log(`@${new Date().toLocaleTimeString()} in 1st THEN(): Status not in 200s`);

                            newFatResponse.isError = true;
                            newFatResponse.responseInfo ={
                                    status: response.status.toString(),
                                    text: response.statusText.toString(),
                                    data: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                    essence: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                };
                            setIsError(true);
                            resetResponseModel();
                            setErrorStatus(response.statusText);
                        }else{ // Response Status===200!!!
                            console.log(`@${new Date().toLocaleTimeString()} in 1st THEN(): Status==200 && ??Data`);

                            setIsError(false);
                            newFatResponse.isError = false;                            
                            if(response && response.data){
                                console.log(`@${new Date().toLocaleTimeString()} in 1st THEN(): Status==200 && ++Data`);

                                setResult(response.data);
                                resetResponseModel();
                                newFatResponse.responseInfo ={
                                    status: response.status.toString(),
                                    text: response.statusText.toString(),
                                    data: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                    essence: (response.data)?JSON.stringify(response.data, null, 2):'Empty-Response',
                                };
                            }else{ // Case of no Response.Data
                                console.log(`@${new Date().toLocaleTimeString()} in 1st THEN(): ELSE{}`);

                                newFatResponse.responseInfo ={
                                    status: response.status.toString(),
                                    text: response.statusText.toString(),
                                    data: response.data?JSON.stringify(response.data, null, 2 ): 'No-Data-Response',
                                    essence:response.data?JSON.stringify(response.data, null, 2 ): 'No-Data-Response',
                                };
                            }
                        }                        
                        setFatResponse(newFatResponse)
                        dispatchResponseBack(newFatResponse as IPostResponse);
                    })
                    .catch(
                    (error)=>{
                        console.log(`@${new Date().toLocaleTimeString()} in CATCH(). First Line.`);
                        setIsError(true);
                        newFatResponse.isError = true;
                        if (error && error.response) {
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). ++Response`);
                            // Request made and server responded
                            console.log(`Error-Status:${error.response.status}`);
                            console.log(`Error-Data:${error.response.data}`);
                            console.log(`Error-Headers${error.response.headers}`);
                            newFatResponse.errorInfo = {
                                data: error.response.data?JSON.stringify(error.response.data, null, 2 ): 'No-Error-Details',
                                essence: error.response.data?((error.response.data.message)
                                                                ?JSON.stringify(error.response.data.message, null, 2 ):'No-Error-Message')
                                                            : 'No-Error-Details',
                                status: error.response.status,
                                text: '',
                            }
                            console.log(`Status:${newFatResponse.errorInfo.status}!\n\tEssence:${newFatResponse.errorInfo.essence}`);
                        }else if(error.request){
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). REQUEST-ERROR`);
                        }else if(error && error.stack && error.message){
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). Error:TypeError`);

                            console.log(`\t\t\tin CATCH(). Error:${error}`+
                                        `\n\t\t\tName:${error.name?error.name:'No-Error-Name'}`+
                                        `\n\t\t\tStack:${error.stack}`+
                                        `\n\t\t\tMsg:${error.message}`+
                                        `\n\t\t\tKeys:${Object.keys(error).length>0?Object.keys(error):'No-Keys'}`+
                                        `\n\t\t\tValues:${Object.values(error).length>0?Object.values(error):'No-Values'}`
                                        );
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). BEFORE:FatResponse Stuffing-Done`);
                            newFatResponse.errorInfo = {
                                data: error.message,
                                essence: error.name?error.name:'No-Error-Name',
                                status: '???',
                                text: `${error.name?error.name:'No-Error-Name'}:${error.message}`,
                            }
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). AFTER:FatResponse Stuffing-Done`);
                        }else{
                            console.log(`@${new Date().toLocaleTimeString()} in CATCH(). !!!Response-Error && !!!REQUEST-ERROR`);
                            console.log(`\t\t\t in CATCH(). Error:${error} Keys:${Object.keys(error)}`);
                        } 
                        //setErrorStatus(`IsError:${isError}! ${error.name??'No-Error-Name'}!\n\t${error.message??'No-Error-Message'}`);
                        console.log(`@${new Date().toLocaleTimeString()} in CATCH(). SettingState`);
                        setFatResponse(newFatResponse)
                        console.log(`@${new Date().toLocaleTimeString()} in CATCH(). DispatchingUpdate`);
                        dispatchResponseBack(newFatResponse as IPostResponse);
                    })              
                // Runs for all cases - Errors and otherwise!!!
                .then(
                    (response)=>{
                        console.log(`@${new Date().toLocaleTimeString()} in 2nd THEN().`);
                        newFatResponse.timeBack=Date.now();
                        newFatResponse.timeStamp = new Date().toISOString();
                        setIsReady(true);
                        console.log(`IsError:${isError} - ${errorStatus}`);
                        // in either case - must reset submit button
                        // setFatResponse(newFatResponse)
                        // dispatchResponseBack(newFatResponse as IPostResponse);
                    }
                );
            }, []);

    function dispatchResponseBack(fatResponse: IPostResponse) {
        if (!isError) {
            props.onResultFinished(fatResponse);
        } else {
            setTimeout(
                () => { props.onResultFinished(fatResponse); },
                1000
            );
        }
    }

    const renderTitle= ()=>{
        if(!isReady){
            return (`${props.responseWaitingTitle}`);
        }else{
            return (`${props.resultProcessingTitle}`);
        }
    }

    return (
        <div style={{ border: frameBorder()}}>
            <h2  style={{color:textColor(), }}>{renderTitle()}</h2>
        </div>

    );
}

export default ResponseResult;