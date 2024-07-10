import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const ListaContenedor = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  flex-shrink: 0;
  max-width: 573px;

  label {
    display: flex;
    width: 164px;
    height: 31px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    flex-shrink: 0;

    color: ${(props) => (props.error ? '#E53935' : '#FFFFFF')};
    font-family: 'SourceSansPro';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    text-transform: capitalize;
  }

  select {
    width: 100%;
    height: 62px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 3px solid ${(props) => (props.error ? '#E53935' : '#262626')};
    box-sizing: border-box;
    background: #191919;
    color: ${(props) => (props.error ? '#E53935' : '#a5a5a5')};
    font-family: 'SourceSansPro';
    font-weight: 600;
    padding: 0 10px;
    appearance: none; 
    
    &:focus {
      outline: none;
      border-color: ${(props) => (props.error ? '#E53935' : '#2271D1')};
    }

    &.filled {
      border-color: ${(props) => (props.error ? '#E53935' : '#2271D1')};
    }

    option {
      background: #191919;
      color: ${(props) => (props.error ? '#E53935' : '#FFF')};
    }
  }
`;

const ListaOpciones = ({ titulo, placeholder, reset, setError, error, name, value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (reset) {
      setSelectedValue("");
      setError(titulo, false);
    }
  }, [reset, setError, titulo]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    onChange(e);
    if (e.target.value !== "") {
      setError(titulo, false);
    } else {
      setError(titulo, true);
    }
  };

  const categorias = [
    "Front End",
    "Back End",
    "Innovación y Gestión"
  ];

  return (
    <ListaContenedor error={error}>
      <label>{titulo}</label>
      <select 
        value={reset ? "" : selectedValue} 
        onChange={handleSelectChange} 
        className={selectedValue ? "filled" : ""}
        name={name}
      >
        <option value="" disabled defaultValue="" hidden>{error ? `Por favor, seleccione una ${titulo.toLowerCase()}` : placeholder}</option>
        {categorias.map((categoria, index) => <option key={index} value={categoria}>{categoria}</option>)}
      </select>
    </ListaContenedor>
  );
}

export default ListaOpciones;











