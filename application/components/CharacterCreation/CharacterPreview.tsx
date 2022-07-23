import React, { useEffect, useRef, useState } from "react";
import characterProperties from "../../const/character";
import Character from "../../types/Character";
import orderCharacterKeysforLayeredDisplay from "../../lib/orderCharacterKeysForDisplay";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  character: Character;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  style?: React.CSSProperties;
};

export default function CharacterPreview({
  character,
  canvasRef,
  style,
}: Props) {
  const [selectedItemImages, setSelectedItemImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({});

  const mobileScreenQuery = useMediaQuery("(max-width:900px)");

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
          Object.keys(character) as Array<keyof typeof characterProperties>
        ).forEach((key) => {
          if (character[key] === undefined) {
            return;
          }

          // Get the relevant spritesheet for that key from the object
          const spriteSheet = new Image();
          const src = `/cozy-people-asset-pack/${
            characterProperties[key].path
          }/${characterProperties[key].files[character[key]?.type as number]}`;

          spriteSheet.src = src;
          // On load of the image
          spriteSheet.onload = () => {
            // set state using the current state and the image
            setSelectedItemImages((oldState) => ({
              ...oldState,
              [key]: spriteSheet,
            }));
          };
        });
      }
    }
  }, [canvasRef, character]);

  // Draw the images on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Ensure we get the correct order by looping over keys of characterproperties object
        (
          Object.keys(orderCharacterKeysforLayeredDisplay(character)) as Array<
            keyof typeof characterProperties
          >
        ).forEach((key) => {
          if (selectedItemImages[key]) {
            //  Draw 32 x 32 size image
            ctx.drawImage(
              selectedItemImages[key],
              characterProperties[key].frameSize.x * character[key]?.color * 8,
              0,
              characterProperties[key].frameSize.x,
              characterProperties[key].frameSize.y,
              0,
              0,
              canvas.width,
              canvas.height
            );
          }
        });
      }
    }
  }, [selectedItemImages]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid grey",
        borderRadius: 16,
        width: mobileScreenQuery ? 128 : 196,
        height: mobileScreenQuery ? 128 : 196,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    />
  );
}
