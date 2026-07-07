import { Button, Title } from "@mantine/core";
import { useAuth } from "api/auth";
import { getUserInfo, UserInfoResponse } from "api/userinfo";
import { useEffect, useState } from "react";
import useParams from "util/useParams";
import UserInfo from "./UserInfo";



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
{
/*               <h1>Initial Info</h1>
              <p>For User:{error ?? 
                (info ? JSON.stringify(info, undefined, 2) : 
                'Loading...')}</p>     
 */
 }
              <UserInfo />
         
            </>;

}
// <NewAccountTab />
const ROLES = [
  "System Owner",
  "System Administrator",
  "Security Assessor",
  "Program Manager",
  "Authorizing Official"
];
const PRIVILEGES = [
  "Read Only",
  "Read and Write Only",
  "Read, Write, and Delete"
];

const DropdownSelect = ({ items }: { items : string[] }) => {
  const listItems = items.map(item => <li>{item}</li>);
  return (
    <>
      <ul>
        {listItems}
      </ul>
    </>
  );
}

function CreateUserButton() {
  return (
    <Button>
      Create User (currently not functional)
    </Button>
  );
}

function NewAccountTab() {
  return (
    <div>
      <h1>BLOSSOM NEW ACCOUNT TAB</h1>
      <h2>NAME</h2>
      <h2>ROLE: Select from:</h2>
      <p>Choose an item.</p>
      <DropdownSelect items={ROLES}/>
      <h2>PRIVILEGES: Select from:</h2>
      <p>Choose an item.</p>
      <DropdownSelect items={PRIVILEGES} />
      <CreateUserButton />
    </div>
  );
}



export default AdminBoard;