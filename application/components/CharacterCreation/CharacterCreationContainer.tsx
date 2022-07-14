import { Box, Typography } from "@mui/material";
import React from "react";
import CharacterPropertyOptionContainer from "./CharacterPropertyOptionContainer";

type Props = {};

export default function CharacterCreationContainer({}: Props) {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Character Creation</Typography>

      <Typography variant="body1" sx={{ my: 2 }}>
        This is the Character Creation page.
      </Typography>

      <CharacterPropertyOptionContainer itemCategory={"base"} />
    </Box>
  );
}
