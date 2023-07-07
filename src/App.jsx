import { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "./components/Form";
import NotesList from "./components/NotesList";
import SecurityNotice from "./components/SecurityNotice";
import Information from "./components/Information";
import Controls from "./components/Controls";
import RecycleBin from "./components/RecycleBin";
import { motion } from "framer-motion";

const examplesNotes = [
  { id: "1250s923e", title: "Creator: Giovanni Liotta" },
  { id: "453l342fd", title: "Contact: gioliotta.io@gmail.com" },
];

const getElementsLS = function () {
  const getData = localStorage.getItem("userNotes");
  return getData ? JSON.parse(getData) : [...examplesNotes];
};

const getDeleteElementsLS = function () {
  const getData = localStorage.getItem("recycleBin");
  return getData ? JSON.parse(getData) : [];
};

function App() {
  const [language, setLanguage] = useState("EN");
  const [securityNotice, setSecurityNotice] = useState(false);
  const [showAgainSecurityNotice, setShowAgainSecurityNotice] = useState(true);
  const [elements, setElements] = useState(getElementsLS);
  const [inputValue, setInputValue] = useState("");
  const [initialAnimate, setInitialAnimate] = useState(null);
  const [recycleBin, setRecycleBin] = useState(false);
  const [deleteElements, setDeleteElements] = useState(getDeleteElementsLS);

  useEffect(() => {
    const getSecurityData = localStorage.getItem("showAgainSecurityNotice");
    if (getSecurityData === "false") {
      setSecurityNotice(false);
      setShowAgainSecurityNotice(false);
    } else {
      setSecurityNotice(true);
    }
  }, []);

  useEffect(() => {
    const getLanguageData = localStorage.getItem("Language");
    if (getLanguageData === "EN") setLanguage("EN");
    if (getLanguageData === "ES") setLanguage("ES");
  }, []);

  useEffect(() => {
    const App = document.getElementById("App");
    if (elements.length >= 3 && !recycleBin) {
      App.style.overflowY = "scroll";
    } else if (deleteElements.length >= 3 && recycleBin) {
      App.style.overflowY = "scroll";
    } else App.style.overflowY = "hidden";
  }, [elements, deleteElements, recycleBin]);

  useEffect(() => {
    setInputValue("");
    const saveData = JSON.stringify(elements);
    localStorage.setItem("userNotes", saveData);
  }, [elements]);

  const handleInputFormChange = e => setInputValue(e.target.value);
  function selectedLanguage(en, es) {
    if (language === "EN") return en;
    if (language === "ES") return es;
  }

  if (securityNotice && showAgainSecurityNotice) {
    return (
      <SecurityNotice
        language={language}
        setLanguage={setLanguage}
        securityNotice={securityNotice}
        setSecurityNotice={setSecurityNotice}
        setShowAgainSecurityNotice={setShowAgainSecurityNotice}
      />
    );
  } else {
    return (
      <AppContainer id="App">
        {recycleBin ? (
          <RecycleBin
            selectedLanguage={selectedLanguage}
            setRecycleBin={setRecycleBin}
            deleteElements={deleteElements}
            setDeleteElements={setDeleteElements}
            elements={elements}
            setElements={setElements}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Form
              selectedLanguage={selectedLanguage}
              inputValue={inputValue}
              handleInputFormChange={handleInputFormChange}
              setInitialAnimate={setInitialAnimate}
              elements={elements}
              setElements={setElements}
            />

            <Controls
              selectedLanguage={selectedLanguage}
              setRecycleBin={setRecycleBin}
              elements={elements}
              setElements={setElements}
              deleteElements={deleteElements}
              setDeleteElements={setDeleteElements}
            />

            <NotesList
              selectedLanguage={selectedLanguage}
              elements={elements}
              setElements={setElements}
              inputValue={inputValue}
              setInputValue={setInputValue}
              initialAnimate={initialAnimate}
              setInitialAnimate={setInitialAnimate}
              deleteElements={deleteElements}
              setDeleteElements={setDeleteElements}
            />

            <Information
              selectedLanguage={selectedLanguage}
              setLanguage={setLanguage}
            />
          </motion.div>
        )}
      </AppContainer>
    );
  }
}

export default App;

const AppContainer = styled(motion.div)`
  margin: 0;
  border: 3px solid #f1e3f3;
  padding: 0.5rem 0;
  width: 330px;
  min-height: 70px;
  max-height: 400px;
  background-color: #a59be9;
  overflow: hidden;
`;
