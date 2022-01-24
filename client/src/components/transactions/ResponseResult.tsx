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

export interface IPostResponse{
    isError:boolean;
    response: string;
}

const ResponseResult = (props:IResponseResult)=>{

    const [isReady, setIsReady]= useState(false);
    const [isError, setIsError]= useState(false);
    const [result, setResult] = useState('');
    const [errorStatus, setErrorStatus] = useState('');

    const frameBorder = ()=> {return (isReady)?((isError)?'1px red':'1px green'):'';} 
    const textColor = ()=> {return ((isError)?'#aa0000':'#006600');} 

    const resetResponseModel=()=>{};
    useEffect( 
            ()=>{
                setErrorStatus(``);
                const request = prepareRequest();
                RequestHandler.PostRequest(props.endPointUrl, request)
                .then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // <== Debugging
                        if(response.status!==200){
                            setIsError(true);
                            resetResponseModel();
                            setErrorStatus(response);
                        }
                        if(response && response.data){
                            setResult(response.data);
                            resetResponseModel();
                        }
                        setIsError(false);
                    })
                .catch(
                    (error: Error)=>{
                        setIsError(true);
                        setErrorStatus(`IsError:${isError}! ${error.name}!\n\t${error.message}`);
                        console.log(`${error.name}!\n\t${error.message}`);
                    })
                // Runs for all cases - Errors and otherwise!!!
                .then(
                    (data)=>{
                        setIsReady(true);
                        console.log(`IsError:${isError} - ${errorStatus}`);
                        // in either case - must reset submit button
                        if( !isError){
                            props.onResultFinished(new Event("generated", undefined));
                        }else{
                            setTimeout(
                                ()=>{props.onResultFinished(new Event("generated", undefined));},
                                15000 
                            );
                        }
                    }
                );
            }, []);


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

    const prepareRequest = (): ITransactionRequestBody=>{

        const request:ITransactionRequestBody  = {
            name: props.call_name,
            identity: props.id_for_call,  
            args: getPublicParams(),          
            transient: getTransientParams(),
        }
        return request;
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
            return (`${result?result:"No Result Yet. Loading..."}`);
        }
    }

    return (
        <div style={{ border: frameBorder(), margin: 0, marginBottom: 18, paddingBottom: 11}}>
            <h2  style={{color:textColor(), }}>{renderTitle()}</h2>
            <div style={{color:textColor(), }}>
                {(isError)?errorStatus:renderResult()}
            </div>
        </div>

    );
}

export default ResponseResult;