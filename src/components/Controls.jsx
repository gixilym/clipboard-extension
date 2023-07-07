import { useState } from "react";
import styled from "styled-components";
import { FiTrash2 as IconTrashh } from "react-icons/fi";
import { FaRecycle as IconRecyclee } from "react-icons/fa";
import { GiConfirmed as IconConfirmm } from "react-icons/gi";
import { motion } from "framer-motion";

function Controls(props) {
  const {
    selectedLanguage,
    elements,
    setElements,
    setRecycleBin,
    deleteElements,
    setDeleteElements,
  } = props;

  const [confirmDelete, setConfirmDelete] = useState(false);

  addEventListener("dblclick", () => setConfirmDelete(false));

  function handleSelectChange(event) {
    if (event.target.value) {
      const reverseNotes = [...elements].reverse();
      return setElements(reverseNotes);
    }
  }

  function handleConfirmDelete() {
    setConfirmDelete(false);
    setDeleteElements([...elements, ...deleteElements]);
    setElements([]);
  }

  return (
    <ControlsContainer>
      <Select
        onChange={handleSelectChange}
        title={selectedLanguage("recover notes", "ordenar notas")}
      >
        <option>{selectedLanguage("Recent", "Recientes")}</option>
        <option>{selectedLanguage("Old", "Antiguas")}</option>
      </Select>

      {confirmDelete ? (
        <IconConfirm onClick={handleConfirmDelete} />
      ) : (
        <IconTrash
          onClick={() => setConfirmDelete(true)}
          title={selectedLanguage("sort notes", "eliminar notas")}
        />
      )}

      <IconRecycle
        onClick={() => setRecycleBin(true)}
        title={selectedLanguage("trash bin", "papelera")}
      />
    </ControlsContainer>
  );
}

export default Controls;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: end;
  margin: 0.5rem 0 0.3rem 0;
  padding: 0 0.8rem;
`;

const Select = styled.select`
  width: 90px;
  border-radius: 0.3rem;
  padding: 0.3rem;
  border: none;
  outline: 3px solid #c2bbf0;
  font-size: 0.8rem;
  background-color: #f1e3f3;
  transition-duration: 0.1s;
  text-align: start;
  font-family: "Arial", "sans-serif";
  letter-spacing: 0.3px;
  &:hover {
    cursor: pointer;
    background-color: #c2bbf0;
  }
`;

const IconConfirm = styled(IconConfirmm)`
  font-size: 1.5rem;
  transition-duration: 0.2s;
  color: green;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: #f1e3f3;
  cursor: pointer;
`;

const IconTrash = styled(IconTrashh)`
  font-size: 1.5rem;
  transition-duration: 0.2s;
  color: #2c2c2c;
  opacity: 0.8;
  padding: 0.2rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f1e3f3;
`;

const IconRecycle = styled(IconRecyclee)`
  font-size: 1.5rem;
  transition-duration: 0.2s;
  color: #2c2c2c;
  opacity: 0.8;
  background-color: #f1e3f3;
  padding: 0.2rem;
  border-radius: 5px;
  cursor: pointer;
`;
