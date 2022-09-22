import React from "react";
import { Typography } from "@mui/material";
import generateRandomCharacter from "../../lib/generateRandomCharacter";
import AnimationCanvas from "../CharacterActionAnimation/AnimationCanvas";
import styles from "../../styles/Loading.module.css";
import Character from "../../types/Character";

type Props = {
  loadingMessage?: string;
  character?: Character;
};

export default function LoadingOverlay({ loadingMessage, character }: Props) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        <AnimationCanvas
          character={character || generateRandomCharacter()}
          action="pickaxe"
        />
        <Typography variant="h4">
          {loadingMessage || "doin stuff..."}
        </Typography>
      </div>
    </div>
  );
}
