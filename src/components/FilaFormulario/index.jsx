import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  align-self: stretch;
  width: 100%;
  height: ${(props) => (props.height ? props.height : '108px')};
  box-sizing: border-box;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
`;

const FilaFormulario = ({ children, height, justifyContent }) => {
  return (
    <Row height={height} justifyContent={justifyContent}>
      {children}
    </Row>
  );
}

export default FilaFormulario;
