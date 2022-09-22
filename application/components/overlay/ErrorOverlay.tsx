import React from "react";
import { Button, Typography } from "@mui/material";
import generateRandomCharacter from "../../lib/generateRandomCharacter";
import AnimationCanvas from "../CharacterActionAnimation/AnimationCanvas";
import styles from "../../styles/Loading.module.css";
import Character from "../../types/Character";
import { useErrorState } from "../../context/ErrorContext";

type Props = {
  errorMessage?: string;
  character?: Character;
};

export default function ErrorOverlay({ errorMessage, character }: Props) {
  const { error, setError } = useErrorState();

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        <AnimationCanvas
          character={character || generateRandomCharacter()}
          action="die"
          direction="front"
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {error.message || errorMessage || "Something went wrong :("}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {"plz refresh if this persists."}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            setError({
              error: false,
              message: "",
            })
          }
        >
          {"Close"}
        </Button>
      </div>
    </div>
  );
}
