import styled from "styled-components";

const Container = styled.div`
  font-family: "Raleway", "sans-serif";
  margin: 0;
  padding: 0;
  border: 3px solid #f1e3f3;
  width: 418px;
  min-height: 446.59px;
  max-height: 550px;
  overflow: hidden;
  background-color: #bc4749;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #fff;
`;

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  column-gap: 0.5rem;
  border-radius: 0.3rem;
`;

const LanguageBtn = styled.div`
  border-radius: 0.3rem;
  background-color: #f1e3f3;
  letter-spacing: 1px;
  color: #bc4749;
  padding: 0.3rem;
  text-transform: uppercase;
  font-weight: bold;
  transition-duration: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #000;
    color: #bc4749;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  width: 100%;
  color: red;
  background-color: #f1e3f3;
  padding: 0.5rem 0;
  font-size: 2rem;
  text-transform: uppercase;
`;

const TextContainer = styled.div`
  width: 90%;
  font-size: 1.2rem;
  border-bottom: 2px solid #fff;
  padding-bottom: 1rem;
`;

const Mail = styled.span`
  color: aquamarine;
  font-size: 1.2rem;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.1rem;
`;

const LabelContainer = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  text-transform: uppercase;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  width: 17px;
  height: 17px;
`;

const Agree = styled.div`
  border-radius: 0.3rem;
  width: 7rem;
  height: 2rem;
  display: grid;
  place-content: center;
  margin: 1rem 0;
  background-color: #f1e3f3;
  color: #bc4749;
  transition-duration: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #7cd57c;
    color: #bc4749;
  }
`;

const TextAgree = styled.p`
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

function SecurityNotice(props) {
  const {
    language,
    setLanguage,
    setSecurityNotice,
    setShowAgainSecurityNotice,
  } = props;

  function handleClickSecurityNotice() {
    const verifyCheckbox = document.getElementById("verifyCheckbox");
    if (verifyCheckbox.checked) {
      localStorage.setItem("showAgainSecurityNotice", "false");
      localStorage.setItem("Language", language);
      setShowAgainSecurityNotice(false);
      setSecurityNotice(false);
    } else {
      setSecurityNotice(false);
    }
  }

  const handleClickEN = () => setLanguage("EN");

  const handleClickES = () => setLanguage("ES");

  const languages = [
    <>
      <Title>Security Notice</Title>

      <LanguageContainer>
        <LanguageBtn onClick={handleClickEN}>English</LanguageBtn>
        <LanguageBtn onClick={handleClickES}>Español</LanguageBtn>
      </LanguageContainer>

      <TextContainer>
        <p>
          Clipboard Notes uses local storage to store your notes. It is
          recommended not to enter or store information such as passwords,
          credit card numbers, or other personal data. For questions or
          suggestions about Clipboard Notes, please contact us at this email
          address:
          <Mail> gioliotta.io@gmail.com</Mail>
        </p>
      </TextContainer>

      <BtnContainer>
        <LabelContainer>
          <label name="verifyCheckbox">Do Not Show Again</label>
          <Checkbox type="checkbox" id="verifyCheckbox" />
        </LabelContainer>

        <Agree onClick={handleClickSecurityNotice}>
          <TextAgree>OK</TextAgree>
        </Agree>
      </BtnContainer>
    </>,
    <>
      <Title>Aviso de seguridad</Title>

      <LanguageContainer>
        <LanguageBtn onClick={handleClickEN}>English</LanguageBtn>
        <LanguageBtn onClick={handleClickES}>Español</LanguageBtn>
      </LanguageContainer>

      <TextContainer>
        <p>
          Clipboard Notes utiliza el almacenamiento local para guardar tus
          notas. Se recomienda no ingresar ni almacenar información como
          contraseñas, números de tarjetas de crédito u otros datos personales.
          Para preguntas o sugerencias sobre Clipboard Notes, comunícate a este
          mail:
          <Mail> gioliotta.io@gmail.com</Mail>
        </p>
      </TextContainer>

      <BtnContainer>
        <LabelContainer>
          <label name="verifyCheckbox">No volver a mostrar</label>
          <Checkbox type="checkbox" id="verifyCheckbox" />
        </LabelContainer>

        <Agree onClick={handleClickSecurityNotice}>
          <TextAgree>OK</TextAgree>
        </Agree>
      </BtnContainer>
    </>,
  ];

  const [EN, ES] = languages;

  return (
    <Container>
      {language === "EN" && EN}
      {language === "ES" && ES}
    </Container>
  );
}

export default SecurityNotice;
