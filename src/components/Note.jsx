import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IoIosSettings as Settingss } from "react-icons/io";
import PanelSettings from "./PanelSettings";

const motionStyles = {
  container: {
    initial: { opacity: 0, x: "200px" },
    animate: { opacity: 1, x: "0px" },
  },
  panelSettingsContainer: {
    initial: { x: "-200px" },
    transition: { duration: 0.2 },
    animate: { x: "0px" },
  },
  title: {
    initial: { x: "30px" },
    transition: { duration: 0.1 },
    animate: { x: "0px" },
  },
};

const { container, panelSettingsContainer, title } = motionStyles;

function Note(props) {
  const {
    initialAnimate,
    element,
    elements,
    setElements,
    selectedElementId,
    inputValue,
    setInputValue,
    handleNoteDelete,
  } = props;

  const [panelSettings, setPanelSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => setEditValue(element.title), [element.title]);

  function handleClickEditNote() {
    const updatedElements = elements.map(item =>
      item.id === selectedElementId ? { ...item, title: editValue } : item,
    );
    setElements(updatedElements);
    setIsEditing(false);
    setPanelSettings(false);
  }

  return (
    <motion.div
      initial={initialAnimate ? container.initial : false}
      animate={container.animate}
    >
      <Element className="Element">
        {panelSettings ? (
          <>
            <motion.div
              initial={panelSettingsContainer.initial}
              transition={panelSettingsContainer.transition}
              animate={panelSettingsContainer.animate}
            >
              <PanelSettings
                element={element}
                setInputValue={setInputValue}
                handleNoteDelete={handleNoteDelete}
                elements={elements}
                setElements={setElements}
                editValue={editValue}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </motion.div>

            {isEditing ? (
              <InputLi
                type="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={handleClickEditNote}
                autoFocus
              />
            ) : (
              <LiItem>{element.title}</LiItem>
            )}
          </>
        ) : (
          <motion.div
            initial={title.initial}
            transition={title.transition}
            animate={title.animate}
          >
            <LiItem>{element.title}</LiItem>
          </motion.div>
        )}

        <SettingsBtn onClick={() => setPanelSettings(!panelSettings)} />
      </Element>
    </motion.div>
  );
}

export default Note;

const Element = styled.div`
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

const InputLi = styled.input`
  width: 90%;
  overflow: hidden;
  word-break: break-all;
  font-family: "Nunito Sans", "sans-serif";
  padding: 1rem;
  color: #2b2d42;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: #2b2d42;
`;

const SettingsBtn = styled(Settingss)`
  font-size: 1.5rem;
  color: gray;
  position: absolute;
  top: 3px;
  right: 3px;
  transition-duration: 0.4s;
  &:hover {
    cursor: pointer;
    transform: rotate(180deg);
  }
`;
