import React from 'react';
import axios, {AxiosResponse} from "axios";

export interface ITransactionRequestBody{
    name: string;
    args: string[];
    transient?: {
        [key: string]: string;
    };
    identity: string;
};

export interface IBlossomIdentity{
    name:string;
    mspId:string;
}

const spaceSteps=2; /* Number of spaces to prettify JSON */
/**
 *
 *
 * @export
 * @class RequestHandler
 */
export default class RequestHandler{
    /**
     * Performs JSON call to the specified endpoint
     *
     * @static
     * @param {string} endpointUrl: URL of the service to perform the POST for
     * @param {ITransactionRequestBody} request: THe JSON Request wrapped in the conformant interface ITransactionRequestBody
     * @memberof RequestHandler
     */
    public static async PostRequest(
        endpointUrl: string,
        request: ITransactionRequestBody
    ){
        const urlTail = 'transaction/invoke'; //'transaction/query'
        const url=`${endpointUrl}/${urlTail}`;
        return await axios.post(url, request)
    }

    public static async GetOrgIdentity(endpointUrl:string = ''): Promise<AxiosResponse<any, any>>{
        // http://10.208.253.184:8888/identity
        const identityPath:string='/identity';
        return await axios.get(endpointUrl+identityPath)
    }


    public static parseResponseInDepth(response, context?:string='Undefined Context'){
        if(response){
            const respKeys = Object.keys(response);
            let messageArray:Array<string> = new Array<string>();
            messageArray.push(  `Context:${context}\n\t`+
                                `Response:`+
                                `\n\t\tHasKeys:{${respKeys}}`
                            );
            if(response.status){
                messageArray.push(`\n\t\tResponse.Status: ${response.status}`);
            }        
            if(response.data){
                messageArray.push(RequestHandler.listKeyValues(response.data, 'Response.Data:'));
            } 
            console.log(messageArray.join(' '));
        }else{
            console.log(`!!!No-Response!!!`);
        }
    }

    public static listKeyValues(
        src: Object, 
        title: string = '', 
        depth:number=3,
        goDeeper:boolean = true,
        forBreak:string = '\n', // ${forBreak}
        forTab:string = '\t', // ${forTab}
        ):string
    {
        const toGoDeeper = (depth>5)?false: goDeeper;
        const list:Array<string> = new Array<string>();
        const titleTab=forBreak+forTab.repeat(depth-1);
        const depthTab=forTab.repeat(depth);
        const doTitle = title?`${titleTab}${title}${forBreak}${depthTab}` : '';
        if(src){
            const kvs = Object.entries(src);
            if(kvs && kvs.length>0){
                kvs.forEach(
                    ([key, value], index)=>{
                    let showValue = value;
                    let showKey = key;
                    if(toGoDeeper && typeof value === 'object'){
                        showKey = `${key}:`
                        if( !isNaN(Number(key)) ){ //This will be an Array<T> object
                            showKey = `[${key}]:`;
                        }
                        showValue = RequestHandler.listKeyValues(value, '', depth+1, toGoDeeper, forBreak, forTab);
                        list.push(`${forBreak}${depthTab}${showKey}${showValue},`);
                    }else{
                        list.push(`${forBreak}${depthTab}${showKey}:${forTab}${showValue},`);
                    }
                });
            }
        }
        const valKeys = Object.keys(src);
        if(valKeys && valKeys.length>0)
        { 
            if(isNaN(Number(valKeys[0]))){
                return `${doTitle}{${list.join(' ')}${forBreak}${depthTab}}`;
            }else{
                return `${doTitle}[${list.join(' ')}${forBreak}${depthTab}]`;
            }
        }
        return list.join(' ');
    }

}