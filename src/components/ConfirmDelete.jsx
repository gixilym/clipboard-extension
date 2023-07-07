import styled from "styled-components";
import { motion } from "framer-motion";
import { ImCheckmark as Checkk, ImCross as Crosss } from "react-icons/im";

function ConfirmDelete(props) {
  const { handleConfirmNoteDelete, handleCancelNoteDelete, selectedLanguage } =
    props;

  return (
    <motion.div
      initial={{ opacity: 0, y: "80px" }}
      animate={{ opacity: 1, y: "0px" }}
      exit={{ opacity: [1, 0], x: "-300px", transition: { duration: 0.5 } }}
    >
      <ConfirmDeleteContainer>
        <Title>
          {selectedLanguage(
            "Do you want to delete this note?",
            "¿Quieres eliminar esta nota?",
          )}
        </Title>
        <ContainerCheckCross>
          <Check onClick={handleConfirmNoteDelete} />

          <Cross onClick={handleCancelNoteDelete} />
        </ContainerCheckCross>
      </ConfirmDeleteContainer>
    </motion.div>
  );
}

export default ConfirmDelete;

const ConfirmDeleteContainer = styled.div`
  background-color: #8779e2;
  border-radius: 1rem;
  width: 300px;
  height: 90px;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  justify-content: center;
  align-items: center;
  font-family: "Raleway", "sans-serif";
  outline: 3px solid #c2bbf0;
  overflow: hidden;
  row-gap: 0.3rem;
`;

const Title = styled.p`
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

const ContainerCheckCross = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 3rem;
`;

const Check = styled(Checkk)`
  padding: 0.5rem;
  background-color: #c2bbf0;
  border-radius: 100%;
  transition-duration: 0.1s;
  color: #484848;
  &:hover {
    background-color: #484848;
    color: #c2bbf0;
    cursor: pointer;
  }
`;

const Cross = styled(Crosss)`
  padding: 0.5rem;
  border-radius: 100%;
  transition-duration: 0.1s;
  background-color: #c2bbf0;
  color: #484848;
  &:hover {
    background-color: #484848;
    color: #c2bbf0;
    cursor: pointer;
  }
`;
