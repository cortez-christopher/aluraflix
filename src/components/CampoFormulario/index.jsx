import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const ContenedorCampos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1; 
  max-width: ${(props) => props.size || '100%'};

  label {
    display: flex;
    width: 164px;
    height: 31px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    flex-shrink: 0;
    color: ${(props) => (props.error ? '#E53935' : '#ffffff')};
    font-family: 'SourceSansPro';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    text-transform: capitalize;
  }

  input,
  textarea {
    width: 100%; 
    flex-shrink: 0;
    border-radius: 10px;
    border: 3px solid ${(props) => (props.error ? '#E53935' : '#262626')};
    box-sizing: border-box;
    background: #191919;
    color: ${(props) => (props.error ? '#E53935' : '#A5A5A5')};
    font-family: 'SourceSansPro';
    padding: 10px;
    resize: none;

    &::placeholder {
      color: ${(props) => (props.error ? '#E53935' : '##A5A5A5')};
      font-family: 'SourceSansPro';
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      text-transform: lowercase;
    }

    &:focus {
      outline: none; 
      border-color: ${(props) => (props.error ? '#E53935' : '#2271D1')};
    }

    &.filled {
      border-color: ${(props) => (props.error ? '#E53935' : '#2271D1')};
    }
  }

  input {
    height: 62px;
  }

  textarea {
    height: ${(props) => props.textareaHeight || '220px'};
    padding: ${(props) => props.textareaPadding || '10px'};
  }
`;

const CampoFormulario = ({ titulo, placeholder, size, type, textareaPadding, textareaHeight, reset, setError, error, name, value, onChange }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = useState(placeholder);

  useEffect(() => {
    if (reset) {
      setIsFilled(false);
      setErrorPlaceholder(placeholder);
      setError(titulo, false);
    }
  }, [reset, placeholder, setError, titulo]);

  useEffect(() => {
    if (error) {
      let specificMessage;
      switch (titulo) {
        case 'Imagen':
          specificMessage = 'Por favor, ingrese el enlace de la imagen';
          break;
        case 'Video':
          specificMessage = 'Por favor, ingrese el enlace del video';
          break;
        default:
          specificMessage = `Por favor, complete el campo ${titulo.toLowerCase()}`;
      }
      setErrorPlaceholder(specificMessage);
    }
  }, [error, titulo]);

  const handleInputChange = (e) => {
    setIsFilled(e.target.value !== "");
    onChange(e);
    if (e.target.value !== "") {
      setErrorPlaceholder(placeholder);
      setError(titulo, false);
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = error ? '#E53935' : '#2271D1';
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      e.target.style.borderColor = '#262626';
      setError(titulo, true);
    }
  };

  return (
    <ContenedorCampos size={size} textareaPadding={textareaPadding} textareaHeight={textareaHeight} error={error}>
      <label>{titulo}</label>
      {type === "textarea" ? (
        <textarea 
          placeholder={errorPlaceholder} 
          className={isFilled ? "filled" : ""}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={reset ? "" : value}
          name={name}
        />
      ) : (
        <input 
          placeholder={errorPlaceholder} 
          className={isFilled ? "filled" : ""}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={reset ? "" : value}
          name={name}
        />
      )}
    </ContenedorCampos>
  );
}

export default CampoFormulario;






















