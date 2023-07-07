import styled from "styled-components";

const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: darkblue;
  font-family: "Raleway", "sans-serif";
`;

function Options(props) {
  const { setLanguage, selectedLanguage } = props;
  return (
    <InformationContainer>
      <p>
        {selectedLanguage("Language: ", "Idioma: ")}
        <span
          onClick={() => setLanguage("EN")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          &nbsp;EN
        </span>
        <span
          onClick={() => setLanguage("ES")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          &nbsp;ES
        </span>
      </p>

      <p>
        &nbsp;| {selectedLanguage("Support: ", "Soporte: ")}
        <a href="mailto:gioliotta.io@gmail.com">gioliotta.io@gmail.com</a>
      </p>
    </InformationContainer>
  );
}

export default Options;
