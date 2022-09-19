import { Grid, Typography } from "@mui/material";
import React from "react";
import generateRandomCharacter from "../lib/generateRandomCharacter";
import styles from "../styles/Loading.module.css";
import AnimationCanvas from "./CharacterActionAnimation/AnimationCanvas";

type Props = {
  loadingMessage: string;
};

export default function LoadingOverlay({ loadingMessage }: Props) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        <AnimationCanvas
          character={generateRandomCharacter()}
          action="pickaxe"
        />
        <Typography variant="h4">{loadingMessage}</Typography>
      </div>
    </div>
  );
}
