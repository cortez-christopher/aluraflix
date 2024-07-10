import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import FilaFormulario from "../FilaFormulario";
import CampoFormulario from "../CampoFormulario";
import ListaOpciones from "../ListaOpciones";
import BotonFormulario from "../BotonFormulario";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(3, 18, 47, 0.76);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const DialogEstilizado = styled.dialog`
  display: flex;
  width: 974px;
  padding: 84px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 5px solid #6bd1ff;
  background: #03122f;
  box-sizing: border-box;
  z-index: 1002;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;

  img {
    position: absolute;
    top: 32px;
    right: 32px;
    cursor: pointer;
  }
`;

const FormularioEditar = styled.form`
  width: 575px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 972px;

  h2 {
    width: 100%;
    color: #2271d1;
    font-family: "Roboto";
    font-size: 60px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    text-transform: uppercase;
    margin: 0;
  }
`;

const ModalEdit = ({ isOpen, onClose, initialData, onUpdateCard }) => {
  const formRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    imagen: '',
    video: '',
    descripcion: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || null,
        titulo: initialData.titulo || '',
        categoria: initialData.categoria || '',
        imagen: initialData.imagen || '',
        video: initialData.video || '',
        descripcion: initialData.descripcion || ''
      });
    }
  }, [initialData]);

  const setError = (field, hasError) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: hasError,
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
      const method = formData.id ? 'PUT' : 'POST';
      const url = `http://localhost:3001/cards${method === 'PUT' ? `/${formData.id}` : ''}`;

      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...nuevoVideo,
          id: formData.id || Date.now(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Formulario enviado exitosamente");
          manejarLimpieza();
          onClose();
          if (onUpdateCard) {
            onUpdateCard(data);
          }
        })
        .catch((error) => console.error("Error al agregar el video:", error));
    }
  };

  const manejarLimpieza = () => {
    setFormData({
      id: formData.id || null,
      titulo: '',
      categoria: '',
      imagen: '',
      video: '',
      descripcion: ''
    });
    setReset(true);
    setTimeout(() => setReset(false), 0);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <DialogEstilizado open onClick={(e) => e.stopPropagation()}>
        <img src="/img/x-cancel.svg" alt="icono cancelar" onClick={onClose} />
        <FormularioEditar method="dialog" ref={formRef} onSubmit={manejarEnvio}>
          <h2>Editar Card:</h2>

          <FilaFormulario height="108px">
            <CampoFormulario
              titulo="Título"
              placeholder="ingrese el título"
              size="100%"
              reset={reset}
              setError={setError}
              error={errors["Título"]}
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </FilaFormulario>

          <FilaFormulario height="108px">
            <ListaOpciones
              titulo="Categoría"
              placeholder="Seleccione una categoría"
              reset={reset}
              setError={setError}
              error={errors["Categoría"]}
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </FilaFormulario>

          <FilaFormulario height="108px">
            <CampoFormulario
              titulo="Imagen"
              placeholder="ingrese el enlace de la imagen"
              reset={reset}
              setError={setError}
              error={errors["Imagen"]}
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </FilaFormulario>

          <FilaFormulario height="108px">
            <CampoFormulario
              titulo="Video"
              placeholder="ingrese el enlace del video"
              reset={reset}
              setError={setError}
              error={errors["Video"]}
              name="video"
              value={formData.video}
              onChange={handleChange}
            />
          </FilaFormulario>

          <FilaFormulario height="158px">
            <CampoFormulario
              titulo="Descripción"
              placeholder="¿De qué se trata este vídeo?"
              size="100%"
              type="textarea"
              textareaHeight="112px"
              textareaPadding="27px 0 0 10px"
              reset={reset}
              setError={setError}
              error={errors["Descripción"]}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FilaFormulario>

          <FilaFormulario height="54px" justifyContent="space-between">
            <BotonFormulario titulo="guardar" />
            <BotonFormulario titulo="limpiar" borderColor="#FFFFFF" onClick={manejarLimpieza} />
          </FilaFormulario>
        </FormularioEditar>
      </DialogEstilizado>
    </Overlay>
  );
};

export default ModalEdit;






