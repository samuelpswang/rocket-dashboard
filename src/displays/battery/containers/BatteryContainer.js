import styled from "styled-components";

import PercentageComponent from "../components/PercentageComponent";
import VoltageComponent from "../components/VoltageComponent";

const Container = styled.div`
  border: solid 4px var(--blue-light);
  background-color: var(--black);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: bottom;

  padding: 16px;
  width: 90vw;
`;

const BatteryContainer = () => {
  return (
    <Container>
      <PercentageComponent left percentage={48}/>
      <VoltageComponent />
      <PercentageComponent percentage={48} />
    </Container>
  );
}

export default BatteryContainer;