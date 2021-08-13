import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Box } from "@chakra-ui/react";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
  nodes: {
    shape: "dot",
    size: 10,
  },
};

function randomColor() {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return `#${red}${green}${blue}`;
}

const App = () => {
  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [...nodes, { id, label: `Node ${id}`, color, x, y }],
          edges: [...edges, { from, to: id }],
        },
        counter: id,
        ...rest,
      };
    });
  };
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: "NIST", color: "#e04141", font: { color: "white" } },
        { id: 2, label: "DHS", color: "#e09c41", font: { color: "white" } },
        { id: 3, label: "X", color: "#e0df41", font: { color: "white" } },
        { id: 4, label: "X", color: "#7be041", font: { color: "white" } },
        { id: 5, label: "X", color: "#41e0c9", font: { color: "white" } },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      },
    },
  });
  const { graph, events } = state;
  return (
    <Box border="1px" borderColor="gray.200">
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "640px" }}
      />
    </Box>
  );
};

export default App;
