import type { NextPage } from "next";
import Container from "@mui/material/Container";
import CharacterCreationContainer from "../components/CharacterCreation/CharacterCreationContainer";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <CharacterCreationContainer />
    </Container>
  );
};

export default Home;
