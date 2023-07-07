import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Note from "./Note";
import ConfirmDelete from "./ConfirmDelete";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

function NotesList(props) {
  const {
    selectedLanguage,
    elements,
    setElements,
    inputValue,
    setInputValue,
    initialAnimate,
    setInitialAnimate,
    deleteElements,
    setDeleteElements,
  } = props;

  const [selectedElementId, setSelectedElementId] = useState(null);

  function handleNoteDelete(elementId) {
    setInitialAnimate(false);
    setSelectedElementId(elementId);
  }

  function handleConfirmNoteDelete(noteId) {
    if (selectedElementId !== null) {
      const updateNotes = elements.filter(
        element => element.id !== selectedElementId,
      );

      function addNoteToTrash() {
        const deletedNote = elements.find(note => note.id === noteId);
        setDeleteElements([deletedNote, ...deleteElements]);
      }

      addNoteToTrash();
      setElements(updateNotes);
      setSelectedElementId(null);
    }
  }

  const handleCancelNoteDelete = () => setSelectedElementId(null);

  return (
    <List>
      <AnimatePresence initial={false}>
        {elements.map(element => (
          <motion.div
            key={element.id}
            layout
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {selectedElementId === element.id ? (
              <ConfirmDelete
                selectedLanguage={selectedLanguage}
                handleConfirmNoteDelete={() =>
                  handleConfirmNoteDelete(element.id)
                }
                handleCancelNoteDelete={handleCancelNoteDelete}
              />
            ) : (
              <Note
                initialAnimate={initialAnimate}
                element={element}
                elements={elements}
                selectedElementId={element.id}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setElements={setElements}
                handleNoteDelete={handleNoteDelete}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
}

export default NotesList;
