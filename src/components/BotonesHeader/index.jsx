import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"


const Boton = styled.button`
  width: 180.125px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 2px solid ${props => props.primary ? '#2271d1' : '#F5F5F5' };
  background: ${props => props.primary ? 'rgba(0, 0, 0, 0.90)' : '#262626'};
  cursor: pointer;
  font-weight: bold;
  box-shadow:${props => props.primary ? '0px 0px 12px 4px #2271D1 inset' : 'none'};
  margin: 0 10px; 

  color: ${props => props.primary ? '#2271d1' : '#FFF'};
  text-align: center;
  font-family: "SourceSansPro";
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
  
`



const BotonesHeader = () => {

  const location = useLocation();

  return (
    <div>
      <Link to="/">
          <Boton primary={location.pathname === "/"}>HOME</Boton>
      </Link>

      <Link to="/nuevo-video">
        <Boton primary={location.pathname === "/nuevo-video"} >NUEVO VIDEO</Boton>
      </Link>
    </div>
    
  )
}

export default BotonesHeader