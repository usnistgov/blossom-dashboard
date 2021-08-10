import React, { useState } from "react";
import { Box, Badge } from "@chakra-ui/react";
import {
  SimpleGrid,
  Grid,
  GridItem,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import "./split.css";

import { Link } from "react-router-dom";

// import Example from "../components/BlockchainGraph";
import Graph from "../components/TestBlockchainGraph";
import SplitPane from "react-split-pane";
import CollapsibleTable from "../components/TestTable";

const cardDemo = [
  {
    Name: "NIST",
    ATO: "auth to operate",
    MSPID: "membership id",
    Users: [{ name: "user1" }, { name: "user12" }],
    Status: "failed",
  },
  {
    Name: "NIST",
    ATO: "auth to operate",
    MSPID: "membership id",
    Users: [{ name: "user1" }, { name: "user12" }],
    Status: "failed",
  },
  {
    Name: "NIST",
    ATO: "auth to operate",
    MSPID: "membership id",
    Users: [{ name: "user1" }, { name: "user12" }],
    Status: "failed",
  },
  {
    Name: "NIST",
    ATO: "auth to operate",
    MSPID: "membership id",
    Users: [{ name: "user1" }, { name: "user12" }],
    Status: "failed",
  },
];
// minChildWidth="328px" spacing="24px"
const Agency = () => {
  const [cards, setCards] = useState();
  return (
    <Grid
      h="100%"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      flex={1}
    >
      <GridItem rowSpan={2} colSpan={1} minH="100%">
        <Stack spacing={8}>
          {cardDemo.map((elm) => {
            return (
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="0.3s"
                _hover={{ borderColor: "teal" }}
              >
                <Box p="6">
                  <Link to="/nist">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        STATUS: {elm.Status}
                      </Badge>
                      <Badge borderRadius="full" px="2">
                        MSPID: {elm.MSPID}
                      </Badge>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {elm.Name}
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-end"
                      isTruncated
                    >
                      <Button colorScheme="blue" marginRight="5px">
                        Details
                      </Button>
                      <Button colorScheme="yellow">Assets</Button>
                    </Box>
                  </Link>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </GridItem>
      <GridItem colSpan={4} rowSpan={2} overflowY="hidden" position="relative">
        <SplitPane
          split="horizontal"
          minSize={50}
          defaultSize={100}
          pane2Style={{ overflowY: "scroll" }}
        >
          <Stack spacing={8} overflowY="scroll" width="100%">
            <Text>Details</Text>
            <CollapsibleTable />
          </Stack>
          <Stack spacing={8} overflowY="scroll">
            <Text>Graph</Text>

            <Graph />
          </Stack>
        </SplitPane>
      </GridItem>
    </Grid>
  );
};

export default Agency;
