import { Container, Group, Anchor, Image, Text } from "@mantine/core";
import { createStyles } from "@mantine/emotion";

const useStylesFooter = createStyles((theme, _, u) => ({
  footer: {
    marginTop: 140,
    borderTop: `1px solid`,
    // ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    // [theme.fn.smallerThan("xs")]: {
    //   flexDirection: "column",
    // },
  },

  // links: {
  //   [theme.fn.smallerThan("xs")]: {
  //     marginTop: theme.spacing.md,
  //   },
  // },

  rotated: {
    display: "grid",
    marginLeft: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    alignItems: "center",
    // "-webkit-transform": "rotate(90deg)",
    // "-moz-transform": "rotate(90deg)",
    // "-o-transform": "rotate(90deg)",
    // "-ms-transform": "rotate(90deg)",
    transform: "rotate(90deg)",
    // size: "xs",
  },

  infoTextChunk:{
    fontSize: "9px",
    lineHeight:"11px",
    filter: "brightness(33%)",
    color: "lightgray",
  },
  logoTextChunk:{
    fontSize: "11px",
    lineHeight:"11px",
    filter: "brightness(33%)",
    color: "lightgray",
  },

  versionTextChunk:{

  },

  root: {
    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
      color: theme.white,
    },
  [u.light]: {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },
  anchor: {
     color: "dimmed",
  }
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function FooterSimple({ links }: FooterSimpleProps) {

  const { classes } = useStylesFooter();

  const items = links.map((link) => (
      <Anchor
        className={classes.anchor}
        key={link.label}
        href={link.link}
        onClick={(event) => event.preventDefault()}
        size="sm"
      >
        {link.label}
      </Anchor>
  ));

  // Backup of inner style:
  // className={classes.inner}
  // className={classes.links}
  // className={classes.rotated} className={classes.footer}

  return (
    <div >
      <Container className={classes.inner}>
        {/* <Image src={`${import.meta.env.BASE_URL}nist.png`} height={105} fit="contain" /> */}
        <Image
          src="https://www.nist.gov/sites/default/files/styles/960_x_960_limit/public/images/2022/06/07/f_nist-logo-brand-black.png?itok=gDfvkqHO"
          height={105}
          fit="contain"
          className={classes.versionTextChunk}
        />
        <Group >{items}</Group>
   
        <div className={classes.rotated}>
          <Text className={classes.logoTextChunk}>
            {__APP_APPLICATION_NAME__}
          </Text>
          <Text className={classes.infoTextChunk}>
            {__APP_VERSION__} Built
          </Text>
          <Text className={classes.infoTextChunk}>
            {__APP_BUILD_DATE__}
          </Text>
          <Text className={classes.infoTextChunk}>
            {__APP_BUILD_TIME__}
          </Text>
        </div>
   </Container>
    </div>
  );
}
