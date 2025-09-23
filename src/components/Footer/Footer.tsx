import { Container, Group, Anchor, Image, Text } from "@mantine/core";
import { createStyles } from "@mantine/emotion";

// const useStyles = createStyles((theme) => ({
//   footer: {
//     marginTop: 140,
//     borderTop: `1px solid`,
//     // ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
//   },
//   inner: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: theme.spacing.xl,
//     paddingBottom: theme.spacing.xl,

//     // [theme.fn.smallerThan("xs")]: {
//     //   flexDirection: "column",
//     // },
//   },
//   // links: {
//   //   [theme.fn.smallerThan("xs")]: {
//   //     marginTop: theme.spacing.md,
//   //   },
//   // },
//   rotated: {
//     display: "grid",
//     marginLeft: theme.spacing.xs,
//     paddingLeft: theme.spacing.xs,
//     alignItems: "center",
//     fontSize: "0.73em",
//     // "filter": "brightness(30%)",
//     // "-webkit-transform": "rotate(90deg)",
//     // "-moz-transform": "rotate(90deg)",
//     // "-o-transform": "rotate(90deg)",
//     // "-ms-transform": "rotate(90deg)",
//     transform: "rotate(90deg)",
//   },
// }));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function FooterSimple({ links }: FooterSimpleProps) {
  // const { classes } = useStyles();
  const items = links.map((link) => (
    <div>
      <Anchor
        style={{ color: "dimmed" }}
        key={link.label}
        href={link.link}
        onClick={(event) => event.preventDefault()}
        size="sm"
      >
        {link.label}
      </Anchor>
    </div>
  ));
  // Backup of inner style:
  // className={classes.inner}
  // className={classes.links}
  // className={classes.rotated} className={classes.footer}
  return (
    <div >
      <Container >
        {/* <Image src={`${import.meta.env.BASE_URL}nist.png`} height={105} fit="contain" /> */}
        <Image
          src="https://www.nist.gov/sites/default/files/styles/960_x_960_limit/public/images/2022/06/07/f_nist-logo-brand-black.png?itok=gDfvkqHO"
          height={105}
          fit="contain"
        />
        <Group >{items}</Group>

        <div >
          <Text size="xs" style={{ color: "dimmed" }}>
            {__APP_APPLICATION_NAME__}
          </Text>
          <Text size="xs" style={{ color: "dimmed" }}>
            {__APP_VERSION__} Built
          </Text>
          <Text size="xs" style={{ color: "dimmed" }}>
            {__APP_BUILD_DATE__}
          </Text>
          <Text size="xs" style={{ color: "dimmed" }}>
            {__APP_BUILD_TIME__}
          </Text>
        </div>
      </Container>
    </div>
  );
}
