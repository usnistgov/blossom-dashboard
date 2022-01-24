import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";
import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";
import { IParamType } from '../../pages/transactions/DataTypes';


export interface IResponseResult{
    responseWaitingTitle: string;
    resultWaitingText?: string;
    onResultFinished: (e: Event)=>void;
    resultSource?:()=>Promise<AxiosResponse<any, any>>;
    requestBody?: ITransactionRequestBody;

    endPointUrl: string;
    call_name: string;
    id_for_call:string;
    trans?: Array<IParamType|undefined>;
    params?: Array<IParamType|undefined>;
}





const ResponseResult = (props:IResponseResult)=>{

    const [isReady, setIsReady]= useState(false);
    const [isError, setIsError]= useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const resetResponseModel=()=>{};
    useEffect( 
            ()=>{
                const request = prepareRequest();
                RequestHandler.PostRequest(props.endPointUrl, request)
                .then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // <== Debugging
                        if(response.status!==200){
                            setIsError(true);
                            resetResponseModel();
                            setError(response);
                        }
                        if(response && response.data){
                            setResult(response.data);
                            resetResponseModel();
                        }
                        setIsError(false);
                        setIsReady(true);
                    }
                ).catch(
                    (error: Error)=>{
                        setIsError(true);
                        setIsReady(true);
                        setError(`${error.name}!\n\t${error.message}`);
                        console.log(`${error.name}!\n\t${error.message}`);
                    });
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
        let transParams: {[key:string]:string} = {};
        if(props.trans && props.trans.length>0){
            props.trans.forEach(
                (param:IParamType)=>{
                    transParams[`${param.name}`]=`${param.value}`;
                    console.log(`Tran ${param.name}=${param.value}`);
                });
        }
        return transParams;
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
        <div>
            <h2>{renderTitle()}</h2>
            <div>
                {renderResult()}
            </div>
        </div>

    );
}

export default ResponseResult;