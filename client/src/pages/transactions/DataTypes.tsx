import React from 'react';
import { ITransactionRequestBody } from '../../components/transactions/HttpActions';


export interface IParamType{
    name: string;
    type?: string;
    info?: string; 
    value?:string;
}

export interface IMethodInfo{
    name: string;
    info: string;
    public?: Array<IParamType>;
    trans?: Array<IParamType>;
    warn?: string;
    isOptional?: boolean
    transWrapper?: string;
}

export interface IMethodSelect{
    name? : string;
}

// Without protoType the TypeScript makes it too difficult 
// to index properties and use them on as needed basis
// only by indexes in Keys and Values of the Object type
export interface IParamValues{
    ato?: string;
    account?:string;
    status?: string;
    id?: string;
    asset_id?:string;
    amount?:string;
    account_name?:string;
    assetId?: string;
    primary_tag?:string;
    license?:string;
    xml?:string;
    licenses?: string;
}

export const serviceApiMethods: Array<IMethodInfo> = [
    {
        name: "No Method Selected",
        info:'Select method to call',        
    },
        // 1. 
        {   name:'UploadATO',
            info:'Allows the [system_owner] of an account to upload an [ATO Attestation] string.'+
                ' Calling this function will not update the status of the account.'+ 
                ' Update must be done by the SAMS admin (next) using UpdateAccountStatus() method.'+
                ' Prerequisites: An account must already have been requested, and approved using RequestAccount, then ApproveAccount'
                , 
            warn:'WARNING! We are not uploading or advocate uploading of the entire ATO!',
            trans:[ {name:'ato', type:'string|JSON', info:'Value representing ATO'} ],
            transWrapper: 'ato',
        },
        // 2. 
        {   name:'UpdateAccountStatus', 
            info:'The SAMS admin can update the status of an account.'+
                ' Possible statuses: "PENDING_APPROVAL", "PENDING_ATO",'+ 
                ' "AUTHORIZED", "UNAUTHORIZED_DENIED", "UNAUTHORIZED_ATO", '+
                ' "UNAUTHORIZED_OPTOUT", "UNAUTHORIZED_SECURITY_RISK", "UNAUTHORIZED_ROB"',
            public:[{name:'account', type:'string', info:'Name of the account'},
                    {name:'status', type:'enum', info:'One of the options listed above'}]
        },
        // 3.
         {  name:'GetAccounts', 
            info:'Get public (name, mspid, status) info for all accounts', 
        },       
        // 4.
        {   name:'GetAccount', 
            info:'Get public (name, mspid, status) and private (ato, assets) info for an account', 
            public:[{name:'account', type:'string', info:'Account name'}]
        },
        // 5. 
        {   name:'GetAssets', // Get
            info:'Get a list of all available assets. '+
                'Prerequisites: The requesting member must have a status of “Authorized” or else '+
                'an error will occur.  A member can obtain a status of Authorized if '+
                'the SAMS admin calls UpdateAccountStatus on the member’s account.', 
            warn: 'NIST system_admin calls Assets and gets a list of assets',
        },
        // 6. 
        {   name:'GetAsset', // Maybe better to be Get-/List-Assets? 
            info:'Get detailed info about an asset, including licenses'+
            'Prerequisites: The requesting member must have a status of “Authorized” '+
            'or else an error will occur.  A member can obtain a status of Authorized if the SAMS admin '+
            'calls UpdateAccountStatus on the member’s account.', 
            public:[{name:'id', type:'string', info:'ID of the asset'}]
        },
        // 7. 
        {   name:'RequestCheckout', 
            info:'Request checkout of an asset'+
                'Prerequisites: The account that calls this function must have a status of '+
                'Authorized or else an NGAC error will occur.', 
            trans:[ {name:'asset_id', type:'string', info:'the ID of the asset to checkout'},
                    {name:'amount', type:'number', info:'Quantity of licenses to checkout'}],
            transWrapper: 'checkout',
        },    
        // 8. 
        {   name:'ApproveCheckout', 
            info:   'The SAMS admin approves a checkout request.'+
                    ' This will put the requested amount of licenses'+
                    ' in the account\'s own private data collection'+
                    ' Prerequisites: RequestCheckout must have been called already. '+
                    'The SAMS admin is the only user who can approve a checkout.', 
            trans:[ {name:'asset_id', type:'string', info:'ID of the asset to checkout'},
                    {name:'account_name', type:'string', info:'the account that requested the checkout'}],
            transWrapper: 'checkout',
        },
        // 9.
        {   name:'GetLicenses', // Maybe better to be Get-/List-Assets?
            info:'Gets list the licenses an account has for an asset', 
            public:[    {name:'account', type:'string', info:'Name of the account'},
                        {name:'assetID', type:'string', info:'ID of the asset'}]
        },
        // 10. 
        {   name:'ReportSwID', 
            info:'Report a SwID tag that uses a checked out license', 
            trans:[ {name:'primary_tag', type:'string', info:'Primary tag of SwID'},
                    {name:'asset', type:'string', info:'ID of asset'},
                    {name:'license', type:'string', info:'Licenses associated with this SwID'},
                    {name:'xml', type:'string', info:'SwID xml document'},],
            transWrapper: 'swid',
        },
        // 11.
        {   name:'GetSwIDsAssociatedWithAsset',
            info:'Get the SwID Tags that have been reported and are associated with the given asset', 
            public:[ {name:'account', type:'string', info:'Name of the account'},
                     {name:'assetID', type:'string', info:'ID of the asset'},]
        },
        // 12.
        {   name:'DeleteSwID',
            info:'Delete a reported SwID tag.  This would happen in the case of an organization returning a license.', 
            trans:[ {name:'primary_tag', type:'string', info:'Primary tag of SwID'},
                     {name:'account', type:'string', info:'Name of the account that owns the SwID tag'},],
            transWrapper: 'swid',
        },
        // 13.
        {   name:'InitiateCheckin',
            info:'Starts the process of returning licenses that have been checked out.', 
            trans:[ {name:'asset_id', type:'string', info:'ID of asset'},
                     {name:'licenses', type:'Array<string>', info:'String array of the licenses to be returned'},],
            transWrapper: 'checkin',
        },    
        // 14.    
        {   name:'ProcessCheckin',
            info:'Process an existing request to checkin licenses by an account.', 
            trans:[ {name:'asset_id', type:'string', info:'ID of asset'},
                    {name:'account', type:'string', info:'name of the account that initiated the checkin process'},],
            transWrapper: 'checkin',
        },        

        // 15.
        {   name:'GetHistory',
            info:'Obtain history of transactions', 
            isOptional: true,
        },
        // 16. 
        {   name:'InitNGAC',
            info:'D0', 
            // public:[{name:'', type:'', info:''}],
            isOptional: true,
        },
        // 17. 
        {   name:'RequestAccount', 
            info:'D1', 
            // trans:[{name:'account', type:'', info:''}],
            isOptional: true,
        },
        // 18. 
        {   name:'ApproveAccount', 
            info:'Approve an account request.'+
                'This function will set the status of this account to “Pending: waiting for ATO”.'+
                'From here, the System Owner of the account can upload an ATO using UploadATO '+
                'using UploadATO and the SAMS admin can update the status to AUTHORIZED using UpdateAccountStatus'+
                'Prerequisites: There must be an active request for an account using RequestAccount.'+
                'For example: the NIST member would call RequestAccount, then the SAMS member would call ApproveAccount.', 
            public:[
                {name:'account', type:'string', info:'Name of the account to be approved'},
            ],
            isOptional: true,
        }, 
        // 19. New as of Jan-25-2022 
        // !!!!!! List of objects in Transient may need special UI !!!!!!
        {   name:'OnboardAsset',
            info:'Allows to Onboard an Asset.'+
                ' This function can only be called by the SAMS admin.', 
            warn:'WARNING! We are not uploading or advocate uploading of the entire ATO!',
            public:[ 
                {name:'ID', type:'string', info:'Asset ID'}, 
                {name:'Name', type:'string', info:'Name of the asset'}, 
                {name:'OnboardDate', type:'string', info:'Date of onboarding asset'}, 
                {name:'Expiration', type:'string', info:'Date of asset expiration'}, 
            ],
            trans:[
                {name:'licenses', type:'string', info:'Licenses list'}, 
            ],
            transWrapper: 'asset',
            isOptional: true,
        },
        // 20. New as of Jan-25-2022
        {   name:'OffboardAsset',
            info:'Allows to Remove(Offboard) [Asset] from the chain.'+
                ' This function can only be called by the SAMS admin.'+
                ' Prerequisites: the [Asset] has to have first been created using OnboardAsset', 
            warn:'WARNING! We are not uploading or advocate uploading of the entire ATO!',
            public:[ 
                {name:'ID', type:'string', info:'Asset ID already present on the chain'}, 
            ],
            isOptional: true,
        },
        // 21. New as of Jan-25-2022
        {   name:'RequestAccount',
            info:   'Request an account for a member on the network. Set the users that will assume '+
                    'the roles within the blossom system.  The roles are System Owner, '+
                    'System Administrator, and Acquisition Specialist.'+
                ' This function will set the status of this account to “Pending: waiting for approval”.'+
                ' The SAMS admin will need to call ApproveAccount to complete the account registration.'+
                'Prerequisites: The member must already have their own PDC in the collections_config.', 
            warn:'WARNING! We are not uploading or advocate uploading of the entire ATO!',
            trans:[ 
                {name:'system_owner', type:'string', info:'[System owner] user'}, 
                {name:'system_admin', type:'string', info:'[System administrator] user'}, 
                {name:'acquisition_specialist', type:'string', info:'[Acquisition specialist] user'}, 
            ],
            transWrapper: 'account',
            isOptional: true,
        },

];

export interface IRquestPrepInfo{
    call_info: IMethodInfo;
    endPointUrl: string;
    call_name: string;
    id_for_call:string;
    trans?: Array<IParamType|undefined>;
    params?: Array<IParamType|undefined>;
}


export const getPreparedServiceRequest = (props: IRquestPrepInfo):ITransactionRequestBody =>{

    const getPublicParams = ():Array<string> => { // Prepare Pub-Params
        const publicParams = Array<string>();
        if(props.params && props.params.length>0){
            props.params.forEach( 
                (param:IParamType|undefined)=>{
                    if(param){
                        publicParams.push(`${param.value}`);
                        console.log(`getPreparedServiceRequest->getPublicParams() Public:${param.name}=${param.value}`);
                    }
                });
        }
        return publicParams;
    }

    const getTransientParams = ():{[key: string]: string;}=>{ // Prepare Trans-Params
        let allTrans: {[key:string]:string}={};
        let transParams: {[key:string]:string|number} = {};
        if(props.trans && props.trans.length>0){
            props.trans.forEach(
                (param:IParamType|undefined)=>{
                    if(param){
                        if(param.type && param.type==='number'){
                            transParams[`${param.name}`]=Number(`${param.value}`);
                        }else{ // This is for the types string, JSON, etc
                            transParams[`${param.name}`]=`${param.value}`;
                        }
                        console.log(`getPreparedServiceRequest->getTransientParams() Tran:${param.name}=${param.value}`);
                    }
                });
        }
        // Extra step of wrapping the transient objects !
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

    return prepareRequest();
}
