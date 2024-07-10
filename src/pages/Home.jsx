import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BannerMain from "../components/BannerMain";
import Cards from "../components/Cards";

const FondoContenedor = styled.div`
  width: 1440px;
  background: #191919;
`;

const categorias = [
  {
    titulo: "Front End",
    color: "#6BD1FF",
  },
  {
    titulo: "Back End",
    color: "#00C86F",
  },
  {
    titulo: "Innovación y Gestión",
    color: "#FFBA05",
  },
];

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getCardsByCategory = (category) => {
    return cards.filter((card) => card.categoria === category);
  };

  const handleDeleteCard = (id) => {
    fetch(`http://localhost:3001/cards/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting card:", error));
  };

  const handleUpdateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  return (
    <FondoContenedor>
      <BannerMain />
      {categorias.map((categoria, index) => (
        <Cards
          key={index}
          datos={{ ...categoria, cards: getCardsByCategory(categoria.titulo) }}
          onDeleteCard={handleDeleteCard}
          onUpdateCard={handleUpdateCard}
        />
      ))}
    </FondoContenedor>
  );
};

export default Home;




