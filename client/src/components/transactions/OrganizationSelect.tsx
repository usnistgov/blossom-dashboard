
import * as React from 'react';
import { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';

import RequestHandler,{ITransactionRequestBody, IBlossomIdentity } from "./HttpActions";


export interface IOrgIdSelectParams{
    onOrgSelectChanges?: (org:IBlossomIdentity) => any;
}


const OrganizationSelect =(props:IOrgIdParams) =>{
 
    const loadingOrg:IBlossomIdentity = {name:'Loading...', mspId:'-1'};
    const [orgValue, setOrgValue]=useState(0);
    const [orgName, setOrgName]=useState('');
    const [orgId, setOrgId]=useState('');
    const [orgsIds, setOrgsIds] = useState( [loadingOrg] );

    // This is the weirdest Promise hook-up ever and also forced into the control !!!
    useEffect( 
        ()=>{
            const selectOrgPadItem:IBlossomIdentity = { name: 'Select Organization (Optional)', 
                                                        mspId:'0'};
            const resetOrgsDataModel = 
                (orgList: Array<IBlossomIdentity>)=>{
                    orgList.unshift(selectOrgPadItem)
                    setOrgsIds(orgList);
                    if(orgList.length>0){
                        setOrgName(orgList[0].name);
                        setOrgId(orgList[0].mspId);
                    }
                }

            if( orgsIds.length<1 
                || (orgsIds.length===1 && orgsIds[0].mspId==='-1')){
                RequestHandler.GetOrgIdentity().then(
                    (response)=>{
                        RequestHandler.parseResponseInDepth(response); // Debugging
                        if(response.status!==200){
                            resetOrgsDataModel(
                                [{  name:`Error Loading IDs ${response.status}:${response.statusText}`, 
                                    mspId:'-100'
                                }]
                            );
                        }
                        if(response && response.data){
                            resetOrgsDataModel(response.data);
                        }
                    }
                ).catch(
                    (error: Error)=>{
                        console.log(`Catch-Exception:${error.message}/${error.stack}`)
                        resetOrgsDataModel(
                            [{  name:`Error Loading IDs ${error.message}:${error.stack}`, 
                                mspId:'-1000'
                            }]
                        );                        
                    });
            }
        }, [orgsIds]);


    const handleOrgChange = (event)=>{
        const value = event.target.value;
        const keys = Object.keys(event.target);
        console.log(`handleOrgChange::e.target.value:${event.target.value}, name:${event.target.name} Keys:${keys}`);
        if(value>=0){
            setOrgValue(value);
            if(orgsIds && orgsIds[value]){
                if (orgsIds[value].name){
                    setOrgName(orgsIds[value].name);}
                if(orgsIds[value].mspId){
                    setOrgId(orgsIds[value].mspId);}
            }
        } // Process parent Call-Back
        if(props.onOrgSelectChanges){
            if( value>0 ){
                props.onOrgSelectChanges(orgsIds[value]);
            }else {
                props.onOrgSelectChanges(loadingOrg);
            }
        }
    }

    return (
            <FormControl    style={{minWidth: "680px", width: "680px", marginTop: 9, marginBottom: 9,}} >
                {/* BEGIN-ORGANIZATION-ID MENU */}
                <InputLabel  
                    id="org-id-select-4-demo-label" 
                    htmlFor="org-id-select-4-demo"
                    >Organization ID</InputLabel>
                <Select   
                    style={{marginBottom: 18,paddingBottom:0,height:34}}
                    id="org-id-select-4-demo"
                    label="Select Organization"
                    labelId="org-id-select-4-demo-label"
                    onChange={handleOrgChange}
                    key={orgName}
                    name={orgId}
                    value={orgValue}
                    defaultValue={orgValue}
                    >
                    {orgsIds?.map((org: IBlossomIdentity, index: number) => {
                        return (
                            <MenuItem value={index} key={org.name} name={org.mspId}>
                                { index===0?`${org.name}`:`${index}. Org:[${org.name}] Id:[${org.mspId}]`}
                            </MenuItem>
                        );
                    })}
                </Select>
                {/* END-ORGANIZATION-ID MENU */}
            </FormControl>
    );

}

export default OrganizationSelect;