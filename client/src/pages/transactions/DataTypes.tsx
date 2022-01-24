import React from 'react';


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
                ' Update must be done by the SAMS admin (next) using UpdateAccountStatus() method.', 
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
        {
            name:'GetAccount', 
            info:'Get public (name, mspid, status) and private (ato, assets) info for an account', 
            public:[{name:'account', type:'string', info:'Account name'}]
        },
        // 4. 
        {   name:'GetAssets', // Get
            info:'Get a list of all available assets', 
            warn: 'NIST system_admin calls Assets and gets a list of assets',
        },
        // 5. 
        {   name:'GetAsset', // Maybe better to be Get-/List-Assets? 
            info:'Get detailed info about an asset, including licenses', 
            public:[{name:'id', type:'string', info:'ID of the asset'}]
        },
        // 6. 
        {   name:'RequestCheckout', 
            info:'Request checkout of an asset', 
            trans:[ {name:'asset_id', type:'string', info:'the ID of the asset to checkout'},
                    {name:'amount', type:'number', info:'Quantity of licenses to checkout'}],
            transWrapper: 'checkout',
        },    
        // 7. 
        {   name:'ApproveCheckout', 
            info:   'The SAMS admin approves a checkout request.'+
                    ' This will put the requested amount of licenses'+
                    ' in the account\'s own private data collection', 
            trans:[ {name:'asset_id', type:'string', info:'ID of the asset to checkout'},
                    {name:'account_name', type:'string', info:'the account that requested the checkout'}],
            transWrapper: 'checkout',
        },
        // 8.
        {   name:'GetLicenses', // Maybe better to be Get-/List-Assets?
            info:'Gets list the licenses an account has for an asset', 
            public:[    {name:'account', type:'string', info:'Name of the account'},
                        {name:'assetID', type:'string', info:'ID of the asset'}]
        },
        // 9. 
        {   name:'ReportSwID', 
            info:'Report a SwID tag that uses a checked out license', 
            trans:[ {name:'primary_tag', type:'string', info:'Primary tag of SwID'},
                    {name:'asset_id', type:'string', info:'ID of asset'},
                    {name:'license', type:'string', info:'Licenses associated with this SwID'},
                    {name:'xml', type:'string', info:'SwID xml document'},],
            transWrapper: 'swid',
        },
        // 10.
        {   name:'GetSwIDsAssociatedWithAsset',
            info:'Get the SwID Tags that have been reported and are associated with the given asset', 
            public:[ {name:'account', type:'string', info:'Name of the account'},
                     {name:'assetID', type:'string', info:'ID of the asset'},]
        },
        // 11.
        {   name:'DeleteSwID',
            info:'Delete a reported SwID tag.  This would happen in the case of an organization returning a license.', 
            trans:[ {name:'primary_tag', type:'string', info:'Primary tag of SwID'},
                     {name:'account', type:'string', info:'Name of the account that owns the SwID tag'},],
            transWrapper: 'swid',
        },
        // 12.
        {   name:'InitiateCheckin',
            info:'Starts the process of returning licenses that have been checked out.', 
            trans:[ {name:'asset_id', type:'string', info:'ID of asset'},
                     {name:'licenses', type:'Array<string>', info:'String array of the licenses to be returned'},],
            transWrapper: 'checkin',
        },    
        // 13.    
        {   name:'ProcessCheckin',
            info:'Process an existing request to checkin licenses by an account.', 
            trans:[ {name:'asset_id', type:'string', info:'ID of asset'},
                    {name:'account', type:'string', info:'name of the account that initiated the checkin process'},],
            transWrapper: 'checkin',
        },        

        // 14.
        {   name:'GetHistory',
            info:'Obtain history of transactions', 
            isOptional: true,
        },
        // 15. 
        {   name:'InitNGAC',
            info:'D0', 
            // public:[{name:'', type:'', info:''}],
            isOptional: true,
        },
        // 16. 
        {   name:'RequestAccount', 
            info:'D1', 
            // trans:[{name:'account', type:'', info:''}],
            isOptional: true,
        },
        // 17. 
        {   name:'ApproveAccount', 
            info:'D2', 
            // public:[{name:'', type:'', info:''}],
            isOptional: true,
        }, 

];
