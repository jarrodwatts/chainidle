import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CharacterCreationContainer from "../components/CharacterCreation/CharacterCreationContainer";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <CharacterCreationContainer />
    </Container>
  );
};

export default Home;
