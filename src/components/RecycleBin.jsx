import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft as Backk } from "react-icons/bs";
import { AiOutlineUpload as IconRecoverAlll } from "react-icons/ai";
import { GiConfirmed as IconConfirmm } from "react-icons/gi";
import { FiTrash2 as IconTrashh } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

function RecycleBin(props) {
  const {
    setRecycleBin,
    deleteElements,
    setDeleteElements,
    elements,
    setElements,
    selectedLanguage,
  } = props;

  const [confirmClearNotes, setConfirmClearNotes] = useState(false);
  const [confirmRecoverNotes, setConfirmRecoverNotes] = useState(false);

  addEventListener("dblclick", () => {
    setConfirmClearNotes(false);
    setConfirmRecoverNotes(false);
  });

  useEffect(() => {
    function saveData() {
      const saveData = JSON.stringify(deleteElements);
      localStorage.setItem("recycleBin", saveData);
    }
    saveData();
  }, [deleteElements]);

  function confirmClearNotesTrash() {
    setConfirmClearNotes(false);
    setDeleteElements([]);
  }

  function handleRecoverAllNotes() {
    setConfirmRecoverNotes(false);
    setElements([...deleteElements, ...elements]);
    setDeleteElements([]);
  }

  function handleRecoverNote(noteId) {
    const deleteRecoverNote = deleteElements.filter(note => note.id !== noteId);
    const recoverNote = deleteElements.find(note => note.id === noteId);
    setDeleteElements([...deleteRecoverNote]);
    setElements([recoverNote, ...elements]);
  }

  const motionStyles = {
    container: {
      initial: { opacity: 0.3 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
    },
    title: {
      initial: { scale: 0.8 },
      transition: { duration: 0.2 },
      animate: { scale: 1 },
    },
    containerBtns: {
      initial: { scale: 0.5 },
      transition: { duration: 0.2 },
      animate: { scale: 1 },
    },
  };

  const { container, title, containerBtns } = motionStyles;

  return (
    <Container
      transition={container.transition}
      initial={container.initial}
      animate={container.animate}
    >
      <motion.div
        style={{ position: "relative" }}
        initial={title.initial}
        animate={title.animate}
        transition={title.transition}
      >
        <Back onClick={() => setRecycleBin(false)} />

        <Title>{selectedLanguage("Recycle Bin", "Papelera")}</Title>
      </motion.div>

      <ContainerBtns
        initial={containerBtns.initial}
        animate={containerBtns.animate}
        transition={containerBtns.transition}
      >
        {!confirmRecoverNotes ? (
          <IconRecoverAll
            onClick={() => setConfirmRecoverNotes(true)}
            title={selectedLanguage("recover notes", "recuperar notas")}
          />
        ) : (
          <IconConfirm onClick={handleRecoverAllNotes} />
        )}

        {!confirmClearNotes ? (
          <IconTrash
            onClick={() => setConfirmClearNotes(true)}
            title={selectedLanguage("delete notes", "eliminar notas")}
          />
        ) : (
          <IconConfirm onClick={confirmClearNotesTrash} />
        )}
      </ContainerBtns>

      <List>
        <AnimatePresence initial={false}>
          {deleteElements.length > 0 &&
            deleteElements.map(note => (
              <motion.div
                key={note.id + note.title}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Element
                  initial={{ opacity: 0, y: "80px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  exit={{
                    opacity: [1, 0],
                    x: "-300px",
                    transition: { duration: 0.5 },
                  }}
                >
                  <LiItem>{note.title}</LiItem>

                  <IconRecover
                    onClick={() => handleRecoverNote(note.id)}
                    title={selectedLanguage("recover a note", "recuperar nota")}
                  />
                </Element>
              </motion.div>
            ))}
        </AnimatePresence>
      </List>
    </Container>
  );
}

export default RecycleBin;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.5rem;
`;

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

const Element = styled(motion.div)`
  background-color: #f1e3f3;
  width: 300px;
  height: 90px;
  border-radius: 1rem;
  overflow-y: visible;
  overflow-x: hidden;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: start;
  outline: 3px solid #c2bbf0;
  position: relative;
  &::-webkit-scrollbar {
    width: 13px;
  }
  &::-webkit-scrollbar-track {
    background-color: #c2bbf0;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a59be9;

    border-radius: 5px;
  }
`;

const LiItem = styled.li`
  width: 90%;
  overflow: hidden;
  font-size: 1.2rem;
  word-break: break-all;
  font-family: "Raleway", "sans-serif";
  padding: 1rem;
  color: #2b2d42;
  transition-duration: 0.2s;
`;

const Title = styled(motion.p)`
  font-size: 1.8rem;
  font-family: "Nunito Sans", "sans-serif";
  text-align: center;
  text-transform: uppercase;
`;

const Back = styled(Backk)`
  font-size: 1.8rem;
  margin: 0.4rem;
  padding: 0 0.1rem;
  border-radius: 3px;
  position: absolute;
  transition-duration: 0.1s;
  left: -70px;
  top: 0;
  color: #2c2c22;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const ContainerBtns = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
`;

const IconRecover = styled(IconRecoverAlll)`
  font-size: 2rem;
  margin: 0.6rem;
  border-radius: 100%;
  color: #001d3d;
  transition-duration: 0.1s;
  &:hover {
    cursor: pointer;
    color: #aeaeae;
  }
`;

const IconRecoverAll = styled(IconRecoverAlll)`
  font-size: 1.5rem;
  transition-duration: 0.2s;
  color: #000;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: #f1e3f3;
  &:hover {
    color: #aeaeae;
    cursor: pointer;
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
  color: #000;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: #f1e3f3;
  &:hover {
    color: #e63946;
    cursor: pointer;
  }
`;
