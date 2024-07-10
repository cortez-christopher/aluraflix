import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./pages/Home";
import NuevoVideo from "./pages/NuevoVideo";
import Page404 from "./pages/Page404";
import Footer from "./components/Footer";
import ModalEdit from "./components/ModalEdit";

const FondoInicio = styled.div`
  background: rgba(0,0,0,0.90);
  width: 1440px;
  height: auto;
`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <Router>
      <FondoInicio>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/nuevo-video" element={<NuevoVideo />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
        <ModalEdit isOpen={isModalOpen} onClose={closeModal} initialData={selectedCard} />
      </FondoInicio>
    </Router>
  );
}

export default App;

