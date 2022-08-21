import { Grid } from "@mui/material";
import React from "react";
import GameSidebar from "../components/GameSidebar";

type Props = {};

export default function Play({}: Props) {
  return (
    <>
      <GameSidebar />
      <Grid container spacing={5} style={{ outline: "1px solid red" }}></Grid>
    </>
  );
}
