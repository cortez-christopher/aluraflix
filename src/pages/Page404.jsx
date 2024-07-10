

import styled from 'styled-components';

const PaginaWrapper = styled.section`
  max-width: 1440px;
  padding: 20px 0; 
  background: #fff;
  font-family: 'Arvo', serif;
  height: 1110px;
`;

const Contenedor = styled.div`
  margin: 0 auto;
  text-align: center;
  position: relative; 
  padding-top: 200px;
`;

const Fondo = styled.div`
  background-image: url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif');
  width: 100%;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; 
`;

const Texto = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 90px;
  font-weight: 500;
  line-height: 96px;
  font-style: normal;
  color: #3f3f40;
  position: absolute; 
  top: 10%; 
  left: 50%;
  transform: translate(-50%, -50%); 
  margin: 0; 
`;

const CajaContenido = styled.div`
  margin-top: -100px; 

  h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 82px;
    font-weight: 900;
    line-height: 94px;
    font-style: normal;
    color: #3f3f40;
    margin-bottom: 10px; 
  }

  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    font-style: normal;
    color: #3f3f40;
    margin-bottom: 20px; 
  }
`;

const Enlace = styled.a`
  color: #fff !important;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px 30px;
  background: #262626;
  display: inline-block;
  text-decoration: none;
  margin-top: 20px; 
  text-transform: uppercase;
`;

const Page404 = () => {
  return (
    <PaginaWrapper>
      <Contenedor>
        <Fondo>
          <Texto>404</Texto>
        </Fondo>
        <CajaContenido>
          <h3>Opps!</h3>
          <p>No pudimos encontrar lo que estas buscando...</p>
          <Enlace href="/">Volver</Enlace>
        </CajaContenido>
      </Contenedor>
    </PaginaWrapper>
  );
}

export default Page404;