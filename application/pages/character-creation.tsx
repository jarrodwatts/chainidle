import { Container, Grid } from "@mui/material";
import React from "react";
import CharacterCreationContainer from "../components/CharacterCreation/CharacterCreationContainer";

type Props = {};

export default function CharacterCreation({}: Props) {
  return (
    <Container maxWidth="lg">
      <CharacterCreationContainer />
    </Container>
  );
}
