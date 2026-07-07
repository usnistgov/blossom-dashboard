import { fetchUserAttributes, FetchUserAttributesOutput, 
    getCurrentUser, GetCurrentUserOutput} from 'aws-amplify/auth';

import {
    AdminGetUserCommand,
    CognitoIdentityProviderClient,
    ListUsersCommand,
  } from "@aws-sdk/client-cognito-identity-provider";


// Amplify.configure({
//   Auth: {
//     region: 'us-east-1',
//     userPoolId: 'YOUR_USER_POOL_ID',
//     userPoolWebClientId: 'YOUR_APP_CLIENT_ID'
//   }
// });

// const { username, userId, signInDetails } = await getCurrentUser();
// console.log("username", username);
// console.log("user id", userId);
// console.log("sign-in details", signInDetails);

export async function getAwsUserProfile(): Promise<GetCurrentUserOutput>{
    try {
        return await getCurrentUser();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return Promise.reject(error);
    }
}


export async function getAwsUserAttributes(): Promise<FetchUserAttributesOutput>   {
    try {
        const attributes = await fetchUserAttributes();
        console.log('User profile:', attributes);
        return attributes;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return Promise.reject(error);
  }
}
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.AdminGetUser] */
  const adminGetUser = ({ userPoolId, username }) => {
    const client = new CognitoIdentityProviderClient({});

    const command = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });
  
    const userInfo = client.send(command);
    console.log(`userPoolId=${userPoolId} username=${username}`);
    console.log(JSON.stringify(userInfo, undefined, 2));
    return userInfo;
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.AdminGetUser] */
  
  const listUsers = ({ userPoolId }) => {
    
    const client = new CognitoIdentityProviderClient({});
  
    const command = new ListUsersCommand({
      UserPoolId: userPoolId,
    });
  
    return client.send(command);
  };

  export { adminGetUser, listUsers };