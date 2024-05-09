import React, { useEffect } from "react";
import { LoginButton } from "components";
import { useAuth } from "api/auth";
import useParams from "util/useParams";
import { Container, Title, Text, Center } from "@mantine/core";

const Landing: React.FC = () => {
  const { code, error: error_response, error_description } = useParams();
  const { authorize, loading, error, authenticated, logout } = useAuth();
  useEffect(() => {
    if (code) {
      authorize(code).then((_) => {
        console.log("success");
        window.location.href = import.meta.env.BASE_URL;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeLink = <a href={import.meta.env.BASE_URL}>Go Home</a>;

  if (error_response) {
    return (
      <>
        <h1>Error: {error_response}</h1>
        <p>{error_description}</p>
        {homeLink}
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Authorization Error</h1>
        <p>{error.message}</p>
        {homeLink}
      </>
    );
  }

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <>
      <Center sx={{ height: "auto", flexGrow: 1 }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title>{import.meta.env.VITE_APP_NAME}</Title>
          <Text size="lg" color="dimmed">
            Service Dashboard
          </Text>

          {authenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <LoginButton />
          )}
        </Container>
      </Center>
    </>
  );
};

export default Landing;
