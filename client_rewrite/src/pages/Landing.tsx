import React, { useEffect } from "react";
import { LoginButton } from 'components'
import { useAuth } from "api/auth";
import useParams from "util/useParams";

const Landing: React.FC = () => {
    const { code, error: error_response, error_description } = useParams();
    const { authorize, loading, error } = useAuth();
    useEffect(() => {
        if (code) {
            authorize(code);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error_response) {
        return <>
            <h1>Error: {error_response}</h1>
            {error_description}
        </>;
    }

    if (error) {
        return <>
            <h1>Authorization Error</h1>
            {error.message}        
        </>;
    }

    if (loading) {
        <h1>Loading...</h1>
    }
    
    return <>
        <h1>Homepage</h1>
        <LoginButton/>
    </>;
}

export default Landing;
