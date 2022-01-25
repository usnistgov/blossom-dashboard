import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Stack,
  Spacer,
  Code,
  Grid,
  Flex,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import Agency from "./pages/Agency";
import Software from "./pages/Software";
import Section from "./pages/Section";
import TransactionsApi from "./pages/transactions/TransactionsFun";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        p={6}
        h="100vh"
        display="flex"
        flexDirection="column"
      >
        {/** The  Header Stack */}
        <Stack direction={"row"}>
          <Link to="/"><b>BLOSS🌸M</b></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/api-demo"><b>Transactions &#9939;API</b></Link> <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>

        <Switch>
          <Route path="/" exact>
            <Agency />
          </Route>

          <Route path="/api-demo" exact>
            <TransactionsApi />
          </Route>

          <Route path="/:agency" exact>
            <Breadcrumbs />
            <Software />
          </Route>
          <Route path="/:agency/:software">
            <Breadcrumbs />
            <Section />
          </Route>
          {/* <Route path="/:agency/:software/:section" exact>
            <Breadcrumbs />
            section
          </Route> */}

        </Switch>
      </Box>
    </ChakraProvider>
  );
};

/**
 * For the top level root (/) page.
 * Will display a grid of cards that when clicked, will display Software
 */
const agencies = {
  val: [
    {
      name: "NIST",
      id: "nist",
      img: "data:image/png;base64...",
      // do we want to display additional information (number of softwares) on the cards?
    },
    {
      name: "DHS",
      id: "dhs",
      img: "data:image/png;base64...",
    },
  ],
};

/**
 *
 * For the agencies (/:agency) page.
 * Will display a grid of cards that when clicked, will display a table of
 * all software licenses under the selected agency and their status (to whom they are leased to)
 *
 * Given:
 *  - agencyID
 */
const software = {
  val: [
    {
      name: "Microsoft Office",
      img: "...",
      // do we want to display license numbers (number available) on the cards?
    },
  ],
};

/**
 * For the section (/:agency/:software) page
 * Will display a table of data (...? don't know what this should be yet)
 *
 * Given:
 *  - agencyID
 *  - software
 */
