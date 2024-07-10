import styled from 'styled-components'
import logo from '/img/logo.png'


const Pie = styled.footer`
  display: flex;
  width: 1443px;
  height: 125px;
  justify-content: center;
  align-items: center;
  gap: 787px;
  flex-shrink: 0;

  border-top: 4px solid #2271d1;
  background: rgba(0,0,0,0.90);
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.70);

  img{
    display: flex;
    width: 169px;
    height: 40px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`


const Footer = () => {
  return (
    <Pie>
      <img src={logo} alt="logo" />
    </Pie>
  )
}


export default Footer