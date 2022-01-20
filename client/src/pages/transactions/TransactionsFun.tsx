import React, {useState } from "react";
import MethodSelect from "../../components/transactions/MethodSelect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import {ParamType, MethodInfo, tranApiMethods} from "./DataTypes";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {generateClasses} from "./AllStyling";
/**
 * JSON to POST
    {
    "member": "member name (could be nist, sams, or shd),
    "identity": "system_admin | system_owner?",
    "function": "{function name}",
    "args": ["function", "arguments"]
    }
 */




const TransactionsApi  = () =>{
    const [selectedIndex, setIndex] = useState(0);
    const [info, setInfo] = useState('No method selected yet')
    const classes = generateClasses;
    // const [name, setName] = useState('Mary');
    // const selectedIndex ={ index: -1};

/*     const setIndex = (index: number) => {
        console.log(`Index Value: ${index}`);
        setIndex(index);
        return (selectedIndex.index>=0)?TranApiMethods[selectedIndex.index].info: 'zzz';
    }; 
    */

    return(
        <div>
             <FormControl required sx={{ m: 1, minWidth: 180 }} style={classes.FormControl} >
            <h2>Execute &#9939;API Method</h2>
                <MethodSelect  
                    defaultMethod={tranApiMethods[selectedIndex].name} 
                    defaultValue={selectedIndex} 
                    options={tranApiMethods} 
                    onChange={setIndex} />
            </FormControl>                   
        </div>
    );
} 

export default TransactionsApi ;

