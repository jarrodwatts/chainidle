import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import characterProperties from "../../const/character";
import theme from "../../const/mui/theme";
import Character from "../../types/Character";

type Props = {
  property: typeof characterProperties[keyof typeof characterProperties];
  file: string;
  col: number;
  row: number;
  index: number;
  character: Character;
  setCharacter: (character: Character) => void;
};

export default function CharacterPropertyOption({
  property,
  file,
  col,
  row,
  index,
  character,
  setCharacter,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileScreenQuery = useMediaQuery("(max-width:900px)");

  // Crop and draw the image on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const spriteSheet = new Image();
        spriteSheet.src = `/cozy-people-asset-pack/${property.path}/${file}`;
        spriteSheet.onload = () => {
          //  Draw 32 x 32 size image
          ctx.drawImage(
            spriteSheet,
            row * property.frameSize.x,
            col * property.frameSize.y,
            property.frameSize.x,
            property.frameSize.y,
            0,
            0,
            canvas.width,
            canvas.height
          );
        };
      }
    }
  }, [canvasRef, col, file, property, row]);

  return (
    <Grid item alignItems="center">
      <Grid
        item
        role="button"
        style={{
          border: "2px solid",
          // Highlighted if selected
          borderColor:
            character?.[property.name]?.type === index
              ? theme.palette.primary.main
              : "rgba(255,255,255,0.3)",
          borderRadius: 16,
          cursor: "pointer",
        }}
        onClick={() =>
          setCharacter({
            ...character,
            [property.name]:
              character?.[property.name]?.type == index &&
              property.name !== "base"
                ? undefined
                : {
                    // Set the color and the type now. If there is an existing one, just update it's type.
                    type: index,
                    // if there was a color, then use that. Otherwise, use the default color 0
                    color: character[property.name]?.color ?? 0,
                  },
          })
        }
      >
        <canvas
          ref={canvasRef}
          style={{
            height: mobileScreenQuery ? 64 : 96,
            width: mobileScreenQuery ? 64 : 96,
          }}
        />
      </Grid>
    </Grid>
  );
}
