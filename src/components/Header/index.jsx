import styled from "styled-components"
import BotonesHeader from "../BotonesHeader"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"


const HeaderEstilizado = styled.header`
  display: flex;
  position: absolute;
  width: 1443px;
  height: 125px;
  justify-content: center;
  align-items: center;
  gap: 787px;
  flex-shrink: 0;
  border-bottom: 4px solid #2271d1;
  background: ${props => props.bgColor };
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.70);
  z-index: 999;

  img {
    width: 168.45px;
    height: 40px;
    flex-shrink: 0;
  }
`


const Header = () => {

  const location = useLocation()
  const [bgColor, setBgColor] = useState('#262626')

  useEffect( () => {
    if (location.pathname === '/nuevo-video') {
      setBgColor('rgba(0, 0, 0, 0.90)')
    } else {
      setBgColor('#262626')
    }
  }, [location] )

  return (
    <HeaderEstilizado bgColor={bgColor} >
      <img src="img/logo.png" alt="logo aluraflix" />
      <BotonesHeader />
    </HeaderEstilizado>
  )
}

export default Header