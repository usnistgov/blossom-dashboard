import React, {useState } from "react";
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MethodSelect from "../../components/transactions/MethodSelect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";

/**
 * JSON to POST
    {
    "member": "member name (could be nist, sams, or shd),
    "identity": "system_admin | system_owner?",
    "function": "{function name}",
    "args": ["function", "arguments"]
    }
 */

const tranApiMethods =[
        {   name:'InitNGAC',
            description:'D0', 
            params:[{name:'', type:''}]
        },
        {   name:'RequestAccount', 
            description:'D1', 
            params:[{name:'', type:''}]
        },
        {   name:'ApproveAccount', 
            description:'D2', 
            params:[{name:'', type:''}]
        },
        {   name:'UploadATO',
            description:'Allows the “system_owner” of an account to upload an ATO “string”.'+
                        ' Calling this function will not update the status of the account.'+ 
                        ' That must be done by the SAMS admin (next slide).', 
            params:[{name:'ATO', type:'string'}]
        },
        {   name:'UpdateAccountStatus', 
            description:'The SAMS admin can update the status of an account.'+
                        ' Possible statuses: "PENDING_APPROVAL", "PENDING_ATO",'+ 
                        ' "AUTHORIZED", "UNAUTHORIZED_DENIED", "UNAUTHORIZED_ATO", '+
                        ' "UNAUTHORIZED_OPTOUT", "UNAUTHORIZED_SECURITY_RISK", "UNAUTHORIZED_ROB"',
            params:[{name:'account', type:'string'},
                    {name:'status', type:'enum'}]
        },
        {
            name:'Account', // Maybe better to be Get-Account?
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'Account', // Maybe better to be Get-Account? 
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'Assets', // Maybe better to be Get-/List-Assets? 
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'AssetInfo', // Maybe better to be Get-AssetInfo? 
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'RequestCheckout', 
            description:'', 
            params:[{name:'', type:''}]
        },
    
        {   name:'ApproveCheckout', 
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'Licenses',// Maybe better to be Get-/List-Assets?
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'ReportSwID', 
            description:'', 
            params:[{name:'', type:''}]
        },
        {   name:'GetSwIDsAssociatedWithAsset',
            description:'', 
            params:[{name:'', type:''}]
        },
]



const TransactionsApi  = () =>{
    const [selectedIndex, setIndex] = useState(-1);
    const [info, setInfo] = useState('No method selected yet')
    // const [name, setName] = useState('Mary');
    // const selectedIndex ={ index: -1};

/*     const setIndex = (index: number) => {
        console.log(`Index Value: ${index}`);
        setIndex(index);
        return (selectedIndex.index>=0)?TranApiMethods[selectedIndex.index].description: 'zzz';
    }; 
    */





    return(
        <div>
            Execute &#9939;API Method
            <MethodSelect  value={selectedIndex} options={tranApiMethods} onChange={setIndex}></MethodSelect>
        </div>
    );
} 

export default TransactionsApi ;

