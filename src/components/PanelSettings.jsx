import { useEffect } from "react";
import styled from "styled-components";
import ClipboardJS from "clipboard";
import { MdDelete as DeleteBtnn } from "react-icons/md";
import { AiFillEdit as EditBtnn } from "react-icons/ai";
import { FaCopy as CopyBtnn } from "react-icons/fa";

const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.5rem;
  width: 3rem;
  height: 90px;
  background-color: #8779e2;
`;

const CopyBtn = styled(CopyBtnn)`
  color: white;
  font-size: 1.3rem;
  transition-duration: 0.1s;
  &:hover {
    color: #aeaeae;
    cursor: pointer;
  }
`;

const DeleteBtn = styled(DeleteBtnn)`
  color: white;
  font-size: 1.3rem;
  transition-duration: 0.1s;
  &:hover {
    color: #fb6f92;
    cursor: pointer;
  }
`;

const EditBtn = styled(EditBtnn)`
  color: white;
  font-size: 1.3rem;
  transition-duration: 0.1s;
  &:hover {
    color: skyblue;
    cursor: pointer;
  }
`;

function PanelSettings(props) {
  const {
    element,
    elements,
    setElements,
    editValue,
    handleNoteDelete,
    isEditing,
    setIsEditing,
  } = props;

  useEffect(() => {
    const CLIPBOARD = new ClipboardJS("#copyText");
    CLIPBOARD.on("success", e => e.clearSelection());
    return () => CLIPBOARD.destroy();
  }, []);

  return (
    <BtnsContainer>
      <CopyBtn id="copyText" data-clipboard-text={element.title} />
      <EditBtn onClick={() => setIsEditing(true)} />
      <DeleteBtn onClick={() => handleNoteDelete(element.id)} />
    </BtnsContainer>
  );
}

export default PanelSettings;
