import { Col, Grid } from "@mantine/core";
import DashboardInputs from "components/DashboardInputs";
import DashboardTable from "components/DashboardTable";

export default function Dashboard() {
  return (
    <>
      {/* <Container sx={{ height: "70vh", width: "100%", margin: "0" }}> */}
      <Grid sx={{ height: "70vh", margin: "20px" }}>
        <Col span="auto">
          <DashboardInputs />
        </Col>
        <Col span={8}>
          <DashboardTable data={[{ col1: "1", col2: "2", col3: "3" }]} />
        </Col>
      </Grid>
      {/* </Container> */}
    </>
  );
}
