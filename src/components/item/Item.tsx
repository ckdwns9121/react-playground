import styled from "@emotion/styled";
interface ItemProps {
  name: string;
}

export default function Item({ name }: ItemProps) {
  return <StyledItem>{name}</StyledItem>;
}

const StyledItem = styled.div`
  width: 100%;
  height: 40px;
  background-color: green;

  border: 2px solid black;

  box-sizing: border-box;
`;
