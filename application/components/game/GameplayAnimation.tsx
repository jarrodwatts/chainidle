import React from "react";
import AnimationCanvas from "../CharacterActionAnimation/AnimationCanvas";
import { useGameContext } from "./GameArea";

type Props = {};

export default function GameplayAnimation({}: Props) {
  const { activeSkill, ownedCharacter } = useGameContext();

  if (ownedCharacter.isLoading || !ownedCharacter.data) {
    return <p>Loading...</p>;
  }

  return (
    <AnimationCanvas
      character={ownedCharacter.data}
      action={activeSkill.get()}
    />
  );
}
