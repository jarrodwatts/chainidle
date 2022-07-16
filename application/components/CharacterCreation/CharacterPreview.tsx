import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import characterProperties from "../../const/character";
import Character from "../../types/Character";
import orderCharacterKeysforLayeredDisplay from "../../lib/orderCharacterKeysForDisplay";
type Props = {
  character: Character;
};

export default function CharacterPreview({ character }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Crop and draw the image on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // character has multiple keys (e.g. "base", "hat", "hair", etc.)
        // so we need to iterate over all of them
        (
          Object.keys(orderCharacterKeysforLayeredDisplay(character)) as Array<
            keyof typeof characterProperties
          >
        ).forEach((key) => {
          // If there is not a value for the key, then we don't need to draw anything
          if (!character || !character[key] === undefined) {
            return;
          }

          // Get the relevant spritesheet for that key from the object
          const spriteSheet = new Image();
          spriteSheet.src = `${characterProperties[key].path}${
            characterProperties[key].files[character[key]?.type as number]
          }`;
          // TODO: This actually doesn't load the images in the correct layers.
          // Since it just draws the image as soon as the onload is done.
          spriteSheet.onload = () => {
            //  Draw 32 x 32 size image
            ctx.drawImage(
              spriteSheet,
              characterProperties[key].frameSize.x * character[key]?.color * 8,
              0,
              characterProperties[key].frameSize.x,
              characterProperties[key].frameSize.y,
              0,
              0,
              canvas.width,
              canvas.height
            );
          };
        });
      }
    }
  }, [canvasRef, character]);

  return (
    <Grid item alignItems="center" justifyContent="center">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        item
        style={{
          border: "1px solid grey",
          borderRadius: 16,
          width: 256,
          height: 256,
          position: "fixed",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
}
