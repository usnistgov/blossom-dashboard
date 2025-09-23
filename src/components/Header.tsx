import {
  AppShell,
  Group,
  UnstyledButton,
  Text,
  Box,
  Title,
  Container,
  Menu,
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import React from "react";
import { useState } from "react";
import LoginButton from "./LoginButton";

import { getUserInfo, useAuth } from "api";

const useStyles = createStyles((theme, _, u) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
      color: theme.white,
    },
    [u.light]: {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
    // color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    // [theme.fn.smallerThan("sm")]: {
    //   height: 42,
    //   display: "flex",
    //   alignItems: "center",
    //   width: "100%",
    // },

    // ...theme.fn.hover({
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[6]
    //       : theme.colors.gray[0],
    // }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    // ...theme.fn.hover({
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[7]
    //       : theme.colors.gray[0],
    // }),
    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
      color: theme.white,
    },
    [u.light]: {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
    // "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    // backgroundColor:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[7]
    //     : theme.colors.gray[0],

    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
      color: theme.white,
    },
    [u.light]: {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },

    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    // padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid` ,
    // ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },
}));

export default function HeaderMegaMenu() {
  // const [drawerOpened] = useDisclosure(false);
  // const [linksOpened] = useDisclosure(false);

  // const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { authenticated, logout } = useAuth();

  const [userName, setUserName] = useState("");

  React.useEffect(() => {
    if (authenticated && userName === "") {
      // horribly hacky, waits until the auth interceptor has been set after being authenticated
      new Promise((resolve) => setTimeout(resolve, 500)).then((_) => {
        getUserInfo().then((info) => setUserName(info.data.username));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // The nightmare with mantine "improvements"
    // The summary of the changes!!!!
    // https://mantine.dev/changelog/7-0-0/#group-changes
    // sx -> style
    // (https://mantine.dev/changelog/7-0-0/#group-changes:~:text=%3E%0A%20%20)%3B%0A%7D-,Group%20changes,-Group%20component%20changes)
    // position="apart" -> justify="space-between"
    // (https://mantine.dev/changelog/7-0-0/#group-changes:~:text=%3E%0A%20%20)%3B%0A%7D-,Group%20changes,-Group%20component%20changes)
    // spacing -> gap
    //
    // Backup className={classes.link}
  }, [authenticated]);

  return (
    <Box pb="sm">
      <AppShell header={{ height: 60 }}>
        <AppShell.Header px="md">
          <Group justify="space-between" style={{ height: "100%" }}>
            <Title
              style={{ ":hover": { cursor: "pointer" } }}
              onClick={() => {
                window.location.replace("#");
              }}
            >
              {__APP_APPLICATION_NAME__}
            </Title>

            <Group style={{ height: "100%" }} gap={0}>
              <a
                href="https://pages.nist.gov/blossom/"
                
              >
                Info
              </a>
              {authenticated ? (
                <>
                  <a href="#/transaction" >
                    Transactions(Raw)
                  </a>
                  <a href="#/assessment" >
                    Assessment(Raw)
                  </a>
                  <a href="#/admin-board" >
                    Admin Board
                  </a>
                  <a href="#/assessors-board" >
                    Assessors Board
                  </a>
                  <a href="#/sam-board" >
                    SAM Board                   
                  </a>                    

                </>
              ) : (
                <></>
              )}
            </Group>

            <Group>
              {authenticated ? (
                <Container>
                  <Group justify="space-between">
                    <Menu
                      width={260}
                      position="bottom-end"
                      // transition="pop-top-right"
                      opened={userMenuOpened}
                      onClose={() => setUserMenuOpened(false)}
                      onOpen={() => setUserMenuOpened(true)}
                    >
                      <Menu.Target>
                        <UnstyledButton>
                          <Group gap="md">
                            <Text
                              // weight="{500}"
                              size="sm"
                              style={{ lineHeight: 1 }}
                              mr={3}
                            >
                              {userName}
                            </Text>
                            <IconChevronDown size={12} stroke={1.5} />
                          </Group>
                        </UnstyledButton>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconSettings size={14} stroke={1.5} />}
                        >
                          Account settings
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconLogout size={14} stroke={1.5} color="red" />
                          }
                          onClick={() => {
                            logout();
                          }}
                        >
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
        </AppShell.Header>
      </AppShell>
    </Box>
  );
}
