import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import characterProperties from "../../const/character";

type Props = {
  property: typeof characterProperties[keyof typeof characterProperties];
  file: string;
  col: number;
  row: number;
};

export default function CharacterPropertyOption({
  property,
  file,
  col,
  row,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Crop and draw the image on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const spriteSheet = new Image();
        spriteSheet.src = `${property.path}${file}`;
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
    <Grid
      container
      item
      alignItems="center"
      justifyContent="center"
      sx={{ mx: 2 }}
    >
      <Grid item style={{ border: "1px solid grey", borderRadius: 16 }}>
        {/* Preview */}
        <canvas
          ref={canvasRef}
          style={{
            height: 128,
            width: 128,
          }}
        />
      </Grid>
    </Grid>
  );
}
