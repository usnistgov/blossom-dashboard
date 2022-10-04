import React, { useEffect, useState } from "react";
import { getUserInfo, UserInfoResponse } from "api";

const UserInfo: React.FC = () => {
  const [info, setInfo] = useState<UserInfoResponse>();
  const [error, setError] = useState();
  useEffect(() => {
    getUserInfo().then(info => setInfo(info.data), err => setError(err))
  }, []);
  
  return <>
  <h1>User Info</h1>
  <p>{error ?? (info ? JSON.stringify(info, undefined, 2) : 'Loading...')}</p>
  </>;
}

export default UserInfo;
