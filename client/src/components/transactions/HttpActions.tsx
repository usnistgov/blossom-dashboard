import React from 'react';
import axios from "axios";

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
    public static PostRequest(
        endpointUrl: string,
        request: ITransactionRequestBody
    ){
        let formedJson ='';
        axios.post(endpointUrl, request).then(
            (response) => {                
                console.log(`PostRequest::response was: ${response.data} & status:${response.status}`);
                try{
                    formedJson = JSON.stringify(response.data, null, spaceSteps );
                }catch(expect: Exception){
                    formedJson = JSON.stringify(
                            {
                                jsonParseException: expect.Message,
                                originalResponse: response.data,
                            }, null, spaceSteps
                        )
                }
                return formedJson;
            });
    }



    public static GetIdentity(endpointUrl:string = 'http://10.208.253.184:8888'){
        // http://10.208.253.184:8888/identity
        let formedJson ='';
        let jsonArray:any;
        const identityPath:string='/identity';
        axios.get(endpointUrl+identityPath,
            {headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin":  "http://10.208.253.184:8888",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                }
            }
            ).then((response)=>
                    {
                        console.log(`GetIdentity::response was: ${response.data} & status:${response.status}`);
                        formedJson = JSON.stringify(response.data, null, spaceSteps /* Spaces to prettify*/);
                        jsonArray = JSON.parse(response.data);
                    }
            ).catch(
                (expected: Error)=>{console.log(`Exception:${expected.message}/${expected.stack}`)});
            if( jsonArray || formedJson){
                return jsonArray || formedJson
            }else{
                return [{"name":"samsclient1","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},{"name":"samsclient2","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},{"name":"samsclient3","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},{"name":"nistclient1","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},{"name":"nistclient2","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},{"name":"nistclient3","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},{"name":"shdclient1","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"},{"name":"shdclient2","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"},{"name":"shdclient3","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"}]
            }
    }
}