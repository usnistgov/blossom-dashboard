import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  HStack,
  VStack,
  Box,
} from "@chakra-ui/react";

import TestTable from "../components/TestTable";
import TestDoughnutChart from "../components/TestDoughnutChart";
import TestGroupedBarChart from "../components/TestGroupedBarChart";

import { useRouteMatch, Link } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Section = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <HStack
        width={"100%"}
        minHeight={"500px"}
        overflowY="scroll"
        display="flex"
      >
        <Box height={"400px"} flex={1}>
          <TestDoughnutChart />
        </Box>
        <Box height={"300px"} width={"auto"} flex={1}>
          <TestGroupedBarChart />
        </Box>
      </HStack>

      <TestTable />
    </>
  );
};

export default Section;
