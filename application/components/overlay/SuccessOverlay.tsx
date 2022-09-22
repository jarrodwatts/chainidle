import React from "react";
import { Button, Typography } from "@mui/material";
import generateRandomCharacter from "../../lib/generateRandomCharacter";
import AnimationCanvas from "../CharacterActionAnimation/AnimationCanvas";
import ReactConfetti from "react-confetti";
import styles from "../../styles/Loading.module.css";
import Character from "../../types/Character";
import { useSuccessState } from "../../context/SuccessContext";

type Props = {
  successMessage: string;
  character?: Character;
};

export default function SuccessOverlay({ successMessage, character }: Props) {
  const { setSuccess } = useSuccessState();
  return (
    <div className={styles.loadingContainer}>
      <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      <div className={styles.loadingCard}>
        <AnimationCanvas
          character={character || generateRandomCharacter()}
          action="walk"
          direction="front"
        />
        <Typography variant="h4">{successMessage}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            setSuccess({
              success: false,
              message: "",
            })
          }
        >
          {"uhh ok"}
        </Button>
      </div>
    </div>
  );
}
