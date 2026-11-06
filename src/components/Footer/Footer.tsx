import { Container, Group, Anchor, Image, Text } from "@mantine/core";
import { createStyles } from "@mantine/emotion";

const useStylesFooter = createStyles((theme, _, u) => ({
  footer: {
    marginTop: 140,
    borderTop: `1px solid`,
    // ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "end",
    paddingTop: 4,
    paddingBottom: 4,

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
    alignItems: "flex-end",
    textAlign: "right",
    // "-webkit-transform": "rotate(90deg)",
    // "-moz-transform": "rotate(90deg)",
    // "-o-transform": "rotate(90deg)",
    // "-ms-transform": "rotate(90deg)",
    // transform: "rotate(90deg)",
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
    filter: "brightness(0)",
    opacity: 0.8,
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
      <Container fluid className={classes.inner}>
        <div />
        <Image
          src="https://www.nist.gov/libraries/nist-component-library/dist/img/logo/NIST-Logo-Brand-White.svg"
          height={50}
          fit="contain"
          className={classes.versionTextChunk}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
        </div>
   </Container>
    </div>
  );
}
