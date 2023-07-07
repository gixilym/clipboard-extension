import styled from "styled-components";
import { MdOutlineAdd as Addd } from "react-icons/md";
import { motion } from "framer-motion";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #c2bbf0;
  border: none;
  outline: none;
  padding: 1.1rem;
  border-radius: 0.3rem;
  text-align: start;
  color: #000;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1rem;
  width: 65%;
  font-family: "Raleway", "sans-serif";
`;

const BtnAdd = styled(motion.button)`
  color: #272727;
  border: none;
  padding: 0.2rem;
  outline: none;
  border-radius: 0.3rem;
  background-color: #c2bbf0;
  transition-duration: 0.1s;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: #f1e3f3;
    opacity: 1;
    color: #000;
  }
`;

const Add = styled(Addd)`
  font-size: 3rem;
  color: #000;
  opacity: 0.5;
`;

function Form(props) {
  const {
    selectedLanguage,
    inputValue,
    setInitialAnimate,
    elements,
    setElements,
    handleInputFormChange,
  } = props;

  function handleAddNoteClick() {
    if (!inputValue) {
      let inputEmpty = document.getElementById("inputEmpty");

      inputEmpty.placeholder = selectedLanguage("EMPTY NOTE", "NOTA VACÍA");
      setTimeout(
        () =>
          (inputEmpty.placeholder = selectedLanguage(
            "Add a note",
            "Añade una nota",
          )),
        2000,
      );

      return;
    } else {
      setInitialAnimate(true);
      setElements([
        { id: elements.length + 1 + inputValue, title: inputValue },
        ...elements,
      ]);
    }
  }

  return (
    <FormContainer onSubmit={event => event.preventDefault()}>
      <Input
        value={inputValue}
        onChange={handleInputFormChange}
        id="inputEmpty"
        autoFocus
        placeholder={selectedLanguage("Add a note", "Añade una nota")}
      />

      <BtnAdd
        onClick={handleAddNoteClick}
        whileTap={{ scale: 0.7 }}
        title={selectedLanguage("add", "añadir")}
      >
        <Add />
      </BtnAdd>
    </FormContainer>
  );
}

export default Form;
