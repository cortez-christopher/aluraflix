import styled from "styled-components";

const BtnFormulario = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.gap || '30px'};
  align-self: stretch;

  button {
    width: 180px;
    height: 54px;
    border-radius: 15px;
    flex-shrink: 0;
    border: 3px solid ${(props) => props.borderColor || '#2271D1'};
    background: #262626;
    color: #ffffff;
    text-align: center;
    font-family: 'SourceSansPro';
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px;
    text-transform: uppercase;
    cursor: pointer;

    &:active {
      color: #2271D1;
      border: 2px solid #2271D1;
      background: rgba(0, 0, 0, 0.90);
      box-shadow: 0px 0px 12px 4px #2271D1 inset;
    }
  }
`;

const BotonFormulario = ({ titulo, borderColor, onClick, gap }) => {
  return (
    <BtnFormulario borderColor={borderColor} gap={gap}>
      <button onClick={onClick}>{titulo}</button>
    </BtnFormulario>
  );
};

export default BotonFormulario;







