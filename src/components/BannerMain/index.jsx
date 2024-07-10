import React, { useState } from "react";
import styled from "styled-components";
import banner2 from '/img/banner2.png';

const BannerContainer = styled.div`
  width: 1443px;
  height: 832px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('img/banner.png') lightgray 50% / cover no-repeat;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1443px;
    height: 832px;
    background: rgba(0, 18, 51, 0.56);
    z-index: 1;
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 2;
  width: 1364px;
  height: 334px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 187px;
`;

const TextoContenedor = styled.div`
  width: 666px;
  height: 305px;
  flex-shrink: 0;
`;

const TituloCategoria = styled.h2`
  display: flex;
  width: 297px;
  height: 92px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 15px;
  background: #6BD1FF;
  color: #f5f5f5;
  text-align: center;
  font-family: 'Roboto';
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;

const TituloMain = styled.h1`
  width: 333px;
  color: #F5F5F5;
  font-family: 'Roboto';
  font-size: 46px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Descripcion = styled.p`
  width: 663px;
  height: 110px;
  flex-shrink: 0;
  color: #F5F5F5;
  font-family: 'Roboto';
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Imagen = styled.div`
  width: 648px;
  height: 334px;
  flex-shrink: 0;
  border-radius: 15px;
  border: #6BD1FF;
  background: url(${banner2}) lightgray 50% / cover no-repeat;
  box-shadow: 0px 0px 17px 8px #6BD1FF inset;
  cursor: pointer;
`;

const BannerMain = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <BannerContainer>
      <Card>
        <TextoContenedor>
          <TituloCategoria>Front End</TituloCategoria>
          <TituloMain>Challenge React</TituloMain>
          <Descripcion>
            Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
          </Descripcion>
        </TextoContenedor>
        {isPlaying ? (
          <iframe
            width="648"
            height="334"
            src="https://www.youtube.com/embed/ov7vA5HFe6w?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <Imagen onClick={handlePlayVideo} />
        )}
      </Card>
    </BannerContainer>
  );
};

export default BannerMain;
