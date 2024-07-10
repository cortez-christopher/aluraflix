import React, { useState } from "react";
import styled from "styled-components";
import ModalEdit from "../ModalEdit"; 

const SeccionCards = styled.section`
  width: 1350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 103px;
  position: relative;
  z-index: 3;
  margin-top: -10px;
`;

const TituloCategoria = styled.h2`
  width: 432px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 15px;
  background: ${(props) => props.color};
  color: #f5f5f5;
  text-align: center;
  font-family: "Roboto";
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 40px;
`;

const OpcionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
`;

const GrupoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 429px;
  height: 320px;
  box-sizing: border-box;
`;

const GrupoContenido = styled.div`
  width: 100%;
  height: 261px;
  box-sizing: border-box;
`;

const Contenido = styled.div`
  display: flex;
  width: 100%;
  height: 261px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 15px 15px 0 0;
  border: 5px solid ${(props) => props.color};
  background: url(${(props) => props.imagen}) lightgray 50% / cover no-repeat;
  box-shadow: 0px 0px 17px 8px ${(props) => props.color} inset;
  box-sizing: border-box;
  cursor: pointer;
`;

const SeccionDeleteEdit = styled.div`
  width: 100%;
  height: 59px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const ContenedorDeleteEdit = styled.div`
  width: 100%;
  height: 59px;
  flex-shrink: 0;
  border-radius: 0 0 15px 15px;
  border-right: 5px solid ${(props) => props.color};
  border-bottom: 5px solid ${(props) => props.color};
  border-left: 5px solid ${(props) => props.color};
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px -4px 5px 3px ${(props) => props.color} inset;
  box-sizing: border-box;
`;

const FrameDeleteEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 70px;
  box-sizing: border-box;
`;

const IconTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;

  img {
    width: 25.43px;
    height: 28px;
    fill: #fff;
  }

  p {
    color: #fff;
    font-family: "Roboto";
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: uppercase;
  }
`;

const Cards = ({ datos, onDeleteCard, onUpdateCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openEditModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <SeccionCards>
      <TituloCategoria color={datos.color}>{datos.titulo}</TituloCategoria>
      <OpcionCards>
        {datos.cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            color={datos.color} 
            onEdit={() => openEditModal(card)} 
            onDelete={() => onDeleteCard(card.id)} 
          />
        ))}
      </OpcionCards>
      <ModalEdit 
        isOpen={isModalOpen} 
        onClose={closeEditModal} 
        initialData={selectedCard} 
        onUpdateCard={onUpdateCard} 
      />
    </SeccionCards>
  );
};

const Card = ({ card, color, onEdit, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <GrupoCard>
      <GrupoContenido>
        {!isPlaying ? (
          <Contenido color={color} imagen={card.imagen} onClick={handlePlayVideo} />
        ) : (
          <iframe
            width="429"
            height="261"
            src={`${getEmbedUrl(card.video)}?autoplay=1`}
            title={card.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        <SeccionDeleteEdit>
          <ContenedorDeleteEdit color={color}>
            <FrameDeleteEdit>
              <IconTextContainer onClick={onDelete}>
                <img src="/public/img/iconoborrar.svg" alt="Borrar" />
                <p>Borrar</p>
              </IconTextContainer>
              <IconTextContainer onClick={onEdit}>
                <img src="/public/img/iconoeditar.svg" alt="Editar" />
                <p>Editar</p>
              </IconTextContainer>
            </FrameDeleteEdit>
          </ContenedorDeleteEdit>
        </SeccionDeleteEdit>
      </GrupoContenido>
    </GrupoCard>
  );
};

export default Cards;

