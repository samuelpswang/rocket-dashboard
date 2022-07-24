// Import Packages
import styled from "styled-components";


// Utils
const getPercentageBoxArray = (pc) => {
  pc = Number(pc);
  let ary = [];
  for (let ind = 0; ind < 10; ind++) {
    if ((pc - ind*10) > 10) ary.push(10);
    else if ((pc - ind*10) < 0) ary.push(0);
    else ary.push((pc - ind*10));
  }
  return ary;
}

const getTwoDigitPercentage = (pc) => {
  if (pc > 100) pc = 100;
  return (Number(pc)).toFixed(2);
}


// Sub-components
const Wrapper = styled.div`
  background-color: var(--black);
  padding: 8px;
  width: 436px;
`;

const NumeralWrapper = styled.div`
  margin-bottom: 4px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const Num = styled.span`
  color: var(--white);
  font-size: 2rem;
  font-weight: medium;
`;

const Symbol = styled.span`
  color: var(--green-dark);
  font-weight: medium;

  margin-left: 4px;
`;

const Label = styled.span`
  color: var(--grey);
`;

const VisualWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const PercentageBox = styled.div`
  display: inline-block;
  height: 8px;
  width: 40px;
  box-sizing: border-box;

  margin: 0 2px;
  ${props => (props.left && props.ind===9) ? "margin-right: 0;" : ""}
  ${props => (!props.left && props.ind===0) ? "margin-left: 0;" : ""}

  background-color: transparent;
  border-bottom: solid white 1px;
  ${props => (props.left && props.ind===0) ? "border-left: solid white 1px; margin-left: 0;" : ""}
  ${props => (!props.left && props.ind===9) ? "border-right: solid white 1px; margin-right: 0;" : ""}
`;

const PercentageBar = styled.div`
  height: 100%;
  width: ${props => props.value*10}%;

  ${props => props.left ? "" : "margin-left: auto;" }

  background-color: var(--blue-light);
`;


// Main Component
const PercentageComponent = ({ left, percentage }) => {

  let PropArray = [];
  if (left) PropArray = getPercentageBoxArray(percentage);
  else PropArray = getPercentageBoxArray(percentage).reverse();

  return (
    <Wrapper>
      <NumeralWrapper>
        {
          left ? 
          <>
            <div>
              <Num>{getTwoDigitPercentage(percentage)}</Num>
              <Symbol>%</Symbol>
            </div>
            <Label>BATTERY LEFT</Label>
          </> : 
          <>
            <Label>BATTERY LEFT</Label>
            <div>
              <Num>{getTwoDigitPercentage(percentage)}</Num>
              <Symbol>%</Symbol>
            </div>
          </>
        }
      </NumeralWrapper>
      <VisualWrapper>
        {PropArray.map((elem, ind) => {
          return (
            <PercentageBox left={left} ind={ind} key={String(ind)}>
              <PercentageBar left={left} value={elem}/>
            </PercentageBox>
          );
        })}
      </VisualWrapper>
    </Wrapper>
  );
}

// Exports
export default PercentageComponent;