// Import Packages
import styled from "styled-components";


// Util
const getInRange = (val, range) => {
  return ((val >= range[0]) && (val <= range[1]));
}

const getRangeData = (val, spacing, range, left=true) => {
  let neighbor;
  if (left) {
    neighbor = (Number(val) - spacing);
  }
  else {
    neighbor = (Number(val) + spacing);
  }
  return (getInRange(val, range) && getInRange(neighbor, range));
}


// Sub-components
const Wrapper = styled.div`
  padding: 8px;
  height: 48px;
  background-color: var(--black);
`;

const CurrentValueWrapper = styled.div`
  position: relative;
  z-index: 2;
  top: -70px;
  width: 400px;

  display: flex;
  justify-content: space-around;
`;

const CurrentValueComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentValueTop = styled.div`
  box-sizing: border-box;
  height: 26px;
  width: 56px;
  
  border: solid 2px var(--white);
  background-color: var(--grey);

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CurrentValueTopSpan = styled.span`
  background-color: transparent;
  color: var(--blue-light);
  font-size: 1.2rem;
  height: 15px;
`;

const CurrentValueBottom = styled.div`
  box-sizing: border-box;
  width: 29px;
  height: 8px;
  
  border-right: solid 2px var(--white);
`;

const BoxWrapper = styled.div`
  position: relative;
  top: -38px;
  z-index: 1;
  
  margin: 0;
  border: solid 1px var(--blue-dark);

  width: 400px;
  height: 36px;
`;

const BackgroundValueWrapperMask = styled.div`
  width: 400px;
  overflow: hidden;
`;

const BackgroundValueWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: -${props => props.left}px;
  transition: margin-left 0.5s ease-in-out;
`;

const BackgroundValueComponent = styled.div`
  background-color: var(--black);
  display: flex;
  flex-direction: column;
`;

const BackgroundValueTop = styled.div`
  height: 8px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;

const BackgroundValueTopL = styled.div`
  flex: 1;
  border-right: solid var(--grey) 0.5px;
  background-color: ${props => (props.valid ? "var(--green-dark)" : "transparent")}
`;

const BackgroundValueTopR = styled.div`
  flex: 1;
  border-left: solid var(--grey) 0.5px;
  background-color: ${props => (props.valid ? "var(--green-dark)" : "transparent")}
`;

const BackgroundValueBottomDiv = styled.div`
  margin: 0;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BackgroundValueBottomSpan = styled.span`
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  width: 60px;
  height: 15px;

  font-size: 1.2rem;

  border: 0;
  border-left: solid var(--grey) 0.5px;
  border-right: solid var(--grey) 0.5px;

  color: var(--white);

  text-align: center;
`


// Main Component
const BackgroundValue = ({ range, valid, num }) => {
  let data = [];
  let spacing = (range[1] - range[0]) / (num - 1);
  for (let ind = 0; ind < num; ind++) {
    let val = (range[0] + spacing*ind).toFixed(1);
    let left = getRangeData(val, spacing, valid, true);
    let right = getRangeData(val, spacing, valid, false);
    data.push({ val, left, right });
  }
  
  return (
    data.map(elem => 
    <BackgroundValueComponent key={`background-value-component-${elem.val}`}>
      <BackgroundValueTop>
        <BackgroundValueTopL valid={elem.left}/>
        <BackgroundValueTopR valid={elem.right}/>
      </BackgroundValueTop>
      <BackgroundValueBottomDiv>
        <BackgroundValueBottomSpan>{elem.val}</BackgroundValueBottomSpan>
      </BackgroundValueBottomDiv>
    </BackgroundValueComponent>
    )
  );
}

const VoltageComponent = ({ val=11.5, range=[1, 20], num=39, valid=[8, 12] }) => {
  let spacing = (range[1] - range[0]) / (num - 1);
  let min = range[0] + (((400/2 - 0.5*60) * spacing) / 60);
  let max = range[1] - (((400/2 - 0.5*60) * spacing) / 60);
  
  let disp, left;
  if (val > max) {
    disp = max.toFixed(1);
    left = Math.floor((((max - min) / spacing) * 60)) + 1;
  }
  else if (val < min) {
    disp = min.toFixed(1);
    left = 1;
  }
  else {
    disp = String(val.toFixed(1));
    left = Math.floor((((val - min) / spacing) * 60)) + 1;
  }
  

  return (
    <Wrapper>
    <BackgroundValueWrapperMask>
      <BackgroundValueWrapper left={left}>
        <BackgroundValue range={range} num={num} valid={valid}/>
      </BackgroundValueWrapper>
    </BackgroundValueWrapperMask>
    <BoxWrapper/>
    <CurrentValueWrapper>
      <CurrentValueComponent>
      <CurrentValueTop>
        <CurrentValueTopSpan>{disp}</CurrentValueTopSpan>
      </CurrentValueTop>
      <CurrentValueBottom />
      </CurrentValueComponent>
    </CurrentValueWrapper>
    </Wrapper>
  );
}


// Exports
export default VoltageComponent;