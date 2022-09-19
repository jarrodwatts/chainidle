import { Grid, Typography } from "@mui/material";
import React from "react";
import generateRandomCharacter from "../lib/generateRandomCharacter";
import styles from "../styles/Loading.module.css";
import AnimationCanvas from "./CharacterActionAnimation/AnimationCanvas";

export default function LoadingOverlay() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        {/* TODO: Convert this to be the death animation */}
        <AnimationCanvas character={generateRandomCharacter()} action="die" />
        <Typography variant="h4">{"Something went wrong :("}</Typography>
      </div>
    </div>
  );
}
