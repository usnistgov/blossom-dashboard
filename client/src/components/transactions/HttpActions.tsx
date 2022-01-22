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
        //let formedJson ='';
        return await axios.post(endpointUrl, request)
        
/*         .then(
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
            } );
*/
           
    }



    public static async GetOrgIdentity(endpointUrl:string = 'http://10.208.253.184:8888'): Promise<AxiosResponse<any, any>>{
        // http://10.208.253.184:8888/identity
        let jsonArray:any;
        let response:any;
        const identityPath:string='/identity';
        return await axios.get(endpointUrl+identityPath
            /* ,
            {headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin":  "http://10.208.253.184:8888",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                }
            } */
            )
            /* 
            .then((response)=>
                    {
                        RequestHandler.parseResponseInDepth(response, '@ Then')
                        if(response.status<500){
                            // formedJson = JSON.stringify(response.data, null, spaceSteps );

                            // testArray = JSON.parse('[{"name":"samsclient3","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},'+
                            //                         '{"name":"nistclient2","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},'+
                            //                         '{"name":"shdclient1","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"}]');

                            console.log(`JSON Array Assigning`);
                            jsonArray = response.data;
                            if(jsonArray){
                                    console.log(`jsonArray || formedJson`);
                                }
                        }
                    }
                ).catch(
                    (expected: Error)=>{
                        console.log(`Catch-Exception:${expected.message}/${expected.stack}`)
                        RequestHandler.logReaponseDetails(response);
                    });
                */
/* 
            if(jsonArray){
                console.log(`jsonArray || formedJson`);
                return jsonArray;
            }else if(testArray){
                console.log(`return testArray;`);
                return testArray;
            }else{
                console.log(`!!!!!!=>Hard STOP-LOSS`);
                return [{"name":"samsclient1","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},
                        // {"name":"samsclient2","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},
                        // {"name":"samsclient3","mspId":"m-IOQVHF6NJZBOPG6TGXGPUZAQX4"},
                        // {"name":"nistclient1","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},
                        {"name":"nistclient2","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},
                        // {"name":"nistclient3","mspId":"m-32D73UGIRRH4BCJMJ5OKEGAVF4"},
                        // {"name":"shdclient1","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"},
                        // {"name":"shdclient2","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"},
                        {"name":"shdclient3","mspId":"m-ZD2Y4KRDYZHZJBBFWPZSRCEMHQ"}]
            }
*/
    }

    private static logReaponseDetails(response) {
        if(response){
            const keys = Object.keys(response.data);            
            console.log(`logReaponseDetails::response data was:\n\t` +
                `${response.data}\n\t` +
                `status:${response.status}/${response.statusText}` +
                `keys:${keys}`
            );
        }
    }

    public static parseResponseInDepth(response, context?:string='No Context'){
        if(response){
            console.log(`${context}\n\t`+
                        `Response:\n\tWhole-Obj:${response}`+
                        `\n\tListKeys:{${Object.keys(response)}}`+
                        `\n\tData:${response.data}`+
                        `\n\tData[0]:Keys:${Object.keys(response.data[0])}`+
                        `\n\t`+
                        ``
                        );
        }
    }

}