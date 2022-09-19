import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "./useAuth";

const AuthCallback:React.FC = () => {
    const { code } = useParams();
    const { authorize, loading } = useAuth();
    const [error, setError] = useState<Error>();
    useEffect(() => {
        try {
            if (code === undefined) {
                throw new Error('code is undefined');
            }
    
            authorize(code);
        } catch (e) {
            setError(e instanceof Error ? e : new Error(`Unknown error: ${e}`));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return <>
            <h1>Authorization Error</h1>
            {error.message}
        </>;
    }

    if (loading) {
        <h1>Loading...</h1>
    }

    return <></>
}

export default AuthCallback;
