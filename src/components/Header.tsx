import {createStyles,Header,Group,UnstyledButton,Text,Box,Title,Container,Menu,} from "@mantine/core";
import {IconChevronDown, IconLogout, IconSettings, } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import LoginButton from "./LoginButton";

import { getUserInfo, useAuth } from "api";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,



    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

export default function HeaderMegaMenu() {
  // const [drawerOpened] = useDisclosure(false);
  // const [linksOpened] = useDisclosure(false);

  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { authenticated, logout } = useAuth();

  const [userName, setUserName] = useState("");

  React.useEffect(() => {
    if (authenticated && userName === "") {
      // horribly hacky, waits until the auth interceptor has been set after being authenticated
      new Promise(resolve => setTimeout(resolve, 500)).then(_ => {
        getUserInfo().then(info => setUserName(info.data.username));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (<Box pb='sm'>
            <Header height={60} px="md">
              <Group position="apart" sx={{ height: "100%" }}>
                
                <Title
                  sx={{ ":hover": { cursor: "pointer" } }}
                  onClick={() => {
                    window.location.replace("#");
                  }}
                >{__APP_APPLICATION_NAME__}</Title>

                <Group sx={{ height: "100%" }} spacing={0}>
                  <a href="https://pages.nist.gov/blossom/" className={classes.link}>
                    Info
                  </a>
                  { authenticated ? 
                    <>
                      <a href="#/transaction" className={classes.link}>
                        Transaction Editor
                      </a>
                      <a href="#/admin-board" className={classes.link}>
                        Admin Board
                      </a>
                      <a href="#/assessors-board" className={classes.link}>
                        Assessors Board
                      </a>
                      <a href="#/sam-board" className={classes.link}>
                        SAM Board
                      </a>
                    </>
                    :
                    <></>
                  }
                </Group>

                <Group>
                  {authenticated ? (
                    <Container>
                      <Group position="apart">
                        <Menu width={260} position="bottom-end" transition="pop-top-right" 
                        opened={userMenuOpened} 
                        onClose={() => setUserMenuOpened(false)} 
                        onOpen={() => setUserMenuOpened(true)}>
                          <Menu.Target>
                            <UnstyledButton>
                              <Group spacing={7}>
                                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                  {userName}
                                </Text>
                                <IconChevronDown size={12} stroke={1.5} />
                              </Group>
                            </UnstyledButton>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                              Account settings
                            </Menu.Item>
                            <Menu.Item icon={<IconLogout size={14} stroke={1.5} color="red"/>} onClick={() => { logout(); }}>
                              Logout
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Container>
                  ) : (
                    <LoginButton />
                  )}
                </Group>
              </Group>
            </Header>
          </Box>
  );
}
