import React, { useEffect, useState } from "react";
import { AwsUserInfoResponse, getAwsUserInfo, getUserInfo, UserInfoResponse } from "api";
import { Box, Tabs, Title } from "@mantine/core";
import { adminGetUser, listUsers } from "api/userInfoAws";
import { AdminGetUserCommand, AdminGetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";


const UserInfo: React.FC = () => {
  const [info, setInfo] = useState<UserInfoResponse>();
   useEffect(() => {
    getUserInfo().then(info => 
      setInfo(info.data), err => setError(err))
  }, []);

  const cognitoPool="us-east-1_wioSQKwya"; 
  const [awsInfo, setAwsInfo] = useState<AwsUserInfoResponse>();
  useEffect(() => {
    getAwsUserInfo(/* 
      { userPoolId: cognitoPool, 
        username: info? info["username"]: "sadmin",
      } */).then(
        user_data => {
          console.log(user_data);
          setAwsInfo(user_data.data);
        },
        err => setError(err)
      )
    }, [info]);


  const [usersInfo, setUsersInfo] = useState<any>();
  useEffect(() => {
    listUsers(
      { userPoolId: cognitoPool, 
      }).then(
        users=> setUsersInfo(users),
        err => setError(err)
      )
    }, [info]);
  
  const [error, setError] = useState();
  const [tabValue, setTabValue] = useState();


  const [userAmp, setUserAmp] = useState();
  
  function UserEmailInfo(infoParam :UserInfoResponse|undefined){
    if(infoParam && infoParam.currentInfo){
      const currentInfo = infoParam.currentInfo;
      if(currentInfo.email){

        var email_was_verified=(
                <div>
                  <span>verified:</span>
                  <span>{currentInfo.email_verified}</span>
                </div>
              );
        var not_verified=(
                <div>
                  <span>verified:</span>
                  <span>Unknown</span>
                </div>
              );
        return (
          <div>
            <div>
              <span>email: </span><span>{currentInfo["email"]}</span>
            </div>
              {((currentInfo.email_verified)?email_was_verified:not_verified)}
          </div>
        );  
      }
    }else{
      return (
        <div>
          <span>No User Information Available Yet...</span>
        </div>
      );
    }
  }
 
  return (
    <Box sx={{ width: "100%" }}>
      <h3>Admin Information:</h3>
      <Tabs
        variant="outline"
        defaultValue="current"
        value={tabValue}
        onChange={setTabValue}
        aria-label="tab panel"
      >
        {/* These List-entries determine the order of the Tabs in UI */}
        <Tabs.List>
          <Tabs.Tab value="current">Current User</Tabs.Tab>
          <Tabs.Tab value="idp">Cognito-IDP Users</Tabs.Tab>
          <Tabs.Tab value="emails">Used Emails</Tabs.Tab>
          <Tabs.Tab value="extra">Extras</Tabs.Tab>
        </Tabs.List>

        {/* These Panel-entries determine the content matched by the value */}
        <Tabs.Panel value="current">
              <h4>Current User Info in {__APP_APPLICATION_NAME__}</h4>
              <p>For User:
                {(info ? JSON.stringify(info, undefined, 2) : 'Loading...')
                }</p>

              <h4>AWS IDP-Cognito User Info [Work in Progress]</h4>
                {(usersInfo ? JSON.stringify(usersInfo, undefined, 2) : "Loading...")}
        </Tabs.Panel>

        <Tabs.Panel value="idp">
          <h4>Cognito Users List: [Work in Progress]</h4>
          {(awsInfo ? JSON.stringify(awsInfo, undefined, 2) : "Loading...")}
        </Tabs.Panel>

        <Tabs.Panel value="emails">
          <h4>Used User Emails: [Work in Progress]</h4>
          <p>
            <UserEmailInfo currentInfo={info} />
          </p>
        </Tabs.Panel>

        <Tabs.Panel value="extra">
          <h4>Extras [Work in Progress]</h4>
        </Tabs.Panel>
        
      </Tabs>
    </Box>
  );


}

export default UserInfo;
