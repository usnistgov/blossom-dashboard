import React, { useEffect } from "react";
import { LoginButton } from 'components'
import { useAuth } from "api/auth";
import useParams from "util/useParams";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
    const { code, error: error_response, error_description } = useParams();
    const { authorize, loading, error } = useAuth();
    useEffect(() => {
        if (code) {
            authorize(code);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(useParams())

    const homeLink = <Link to="/">Go Home</Link>

    if (error_response) {
        return <>
            <h1>Error: {error_response}</h1>
            <p>{error_description}</p>
            {homeLink}
        </>;
    }

    if (error) {
        return <>
            <h1>Authorization Error</h1>
            <p>{error.message}</p>
            {homeLink}
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
