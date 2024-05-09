import { Title } from "@mantine/core";
import { useAuth } from "api/auth";
import { getUserInfo, UserInfoResponse } from "api/userinfo";
import { useEffect, useState } from "react";
import useParams from "util/useParams";



const AdminBoard: React.FC = () => {
//   const { code, error: error_response, error_description } = useParams();
//   const { authorize, loading, error, authenticated, logout } = useAuth();
  const [info, setInfo] = useState<UserInfoResponse>();
  const [error, setError] = useState();
  useEffect(() => {
    getUserInfo().then(info => setInfo(info.data), err => setError(err))
  }, []);
  return    <>
                <Title>{import.meta.env.VITE_APP_NAME}: Admin Board</Title>
                <h1>Initial Info</h1>
                <p>For User:{error ?? (info ? JSON.stringify(info, undefined, 2) : 'Loading...')}</p>
            </>;

}

export default AdminBoard;