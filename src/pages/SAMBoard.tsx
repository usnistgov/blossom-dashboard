import { Title } from "@mantine/core";
import { useAuth } from "api/auth";
import { getUserInfo, UserInfoResponse } from "api/userinfo";
import { useEffect, useState } from "react";
import useParams from "util/useParams";



const SAMBoard: React.FC = () => {
//   const { code, error: error_response, error_description } = useParams();
//   const { authorize, loading, error, authenticated, logout } = useAuth();
  const [info, setInfo] = useState<UserInfoResponse>();
  const [error, setError] = useState();
  useEffect(() => {
    getUserInfo().then(info => setInfo(info.data), err => setError(err))
  }, []);
  return    <>
                <Title>{import.meta.env.VITE_APP_NAME}: SAM Board</Title>
                <h1>Work In Progress</h1>
                <p>This will view information related to Blossom SAM (Software Asset Management).</p>
            </>;

}

export default SAMBoard;