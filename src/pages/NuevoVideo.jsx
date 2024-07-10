import React, { useState, useRef } from "react";
import styled from "styled-components";
import FilaFormulario from "../components/FilaFormulario";
import CampoFormulario from "../components/CampoFormulario";
import ListaOpciones from "../components/ListaOpciones";
import BotonFormulario from "../components/BotonFormulario";

const SeccionFormulario = styled.section`
  display: flex;
  width: 1360px;
  height: 1192px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 47px;
  flex-shrink: 0;
  background: #191919;
  padding-top: 125px;
  margin: 0px 40px;
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 782px;
  height: 136px;
  align-items: center;
  gap: 10px;

  h2 {
    color: #F5F5F5;
    text-align: center;
    font-family: 'Roboto';
    font-size: 60px;
    font-style: normal;
    font-weight: 900;
    line-height: 70px;
    text-transform: uppercase;
    margin: 0;
  }

  p {
    display: flex;
    width: 782px;
    height: 56px;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-align: center;
    font-family: 'Roboto';
    font-size: 20px;
    line-height: 23px;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0;
  }
`;

const Formulario = styled.form`
  display: flex;
  width: 1172px;
  height: 867px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  background: #191919;
`;

const TituloForm = styled.div`
  display: flex;
  width: 100%;
  height: 85px;
  justify-content: flex-start;
  align-items: center;
  border-top: 3px solid #262626;
  border-bottom: 3px solid #262626;
  align-self: stretch;
  margin: 0;

  p {
    margin: 0;
    width: 322px;
    padding: 33.5px 0px;
    color: #fff;
    font-family: 'SourceSansPro';
    font-size: 36px;
    line-height: 24px;
    font-weight: 600;
    font-style: normal;
    text-align: left;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 0;
  }
`;

const NuevoVideo = () => {
  const formRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [errors, setErrors] = useState({});

  const setError = (field, hasError) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: hasError
    }));
  };

  const normalizeFieldName = (fieldName) => {
    return fieldName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const validarCampo = (field, value) => {
    switch (field) {
      case "Título":
        return value.trim() !== "";
      case "Categoría":
        return ["Front End", "Back End", "Innovación y Gestión"].includes(value);
      case "Imagen":
      case "Video":
        const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
        return urlPattern.test(value);
      case "Descripción":
        return value.trim() !== "";
      default:
        return true;
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const formFields = formRef.current.querySelectorAll("input, textarea, select");
    let isValid = true;
    const nuevoVideo = {};

    formFields.forEach((field) => {
      const fieldName = field.previousSibling.textContent;
      const normalizedFieldName = normalizeFieldName(fieldName);
      if (!validarCampo(fieldName, field.value)) {
        setError(fieldName, true);
        isValid = false;
      } else {
        setError(fieldName, false);
        nuevoVideo[normalizedFieldName] = field.value;
      }
    });

    if (isValid) {
      fetch("http://localhost:3001/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...nuevoVideo,
          id: Date.now()
        })
      })
        .then(response => response.json())
        .then(data => {
          alert("Formulario enviado exitosamente");
          manejarLimpieza();
        })
        .catch(error => console.error("Error al agregar el video:", error));
    }
  };

  const manejarLimpieza = () => {
    formRef.current.reset();
    setReset(true);
    setTimeout(() => setReset(false), 0);
    setErrors({});
  };

  return (
    <SeccionFormulario>
      <MainTitle>
        <h2>Nuevo Video</h2>
        <p>Complete el formulario para crear una nueva tarjeta de video</p>
      </MainTitle>
      <Formulario ref={formRef} onSubmit={manejarEnvio}>
        <TituloForm>
          <p>Crear tarjeta</p>
        </TituloForm>
        <FilaFormulario>
          <CampoFormulario 
            titulo="Título" 
            placeholder="ingrese el título" 
            size="470px" 
            reset={reset} 
            setError={setError} 
            error={errors["Título"]} 
          />
          <ListaOpciones 
            titulo="Categoría" 
            placeholder="Seleccione una categoría" 
            reset={reset} 
            setError={setError} 
            error={errors["Categoría"]} 
          />
        </FilaFormulario>
        <FilaFormulario>
          <CampoFormulario 
            titulo="Imagen" 
            placeholder="ingrese el enlace de la imagen" 
            reset={reset} 
            setError={setError} 
            error={errors["Imagen"]} 
          />
          <CampoFormulario 
            titulo="Video" 
            placeholder="ingrese el enlace del video" 
            reset={reset} 
            setError={setError} 
            error={errors["Video"]} 
          />
        </FilaFormulario>
        <FilaFormulario height="266px">
          <CampoFormulario 
            titulo="Descripción" 
            placeholder="¿De qué se trata este vídeo?" 
            size="575px" 
            type="textarea" 
            textareaPadding="27px 0 0 10px" 
            reset={reset} 
            setError={setError} 
            error={errors["Descripción"]} 
          />
        </FilaFormulario>
        <FilaFormulario height="54px">
          <BotonFormulario titulo="guardar" />
          <BotonFormulario titulo="limpiar" borderColor="#FFFFFF" onClick={manejarLimpieza} />
        </FilaFormulario>
      </Formulario>
    </SeccionFormulario>
  );
}

export default NuevoVideo;














