import React, { useEffect, useRef, useState } from "react";
import actions from "../../const/actions";
import characterProperties from "../../const/character";
import Character from "../../types/Character";
import orderCharacterKeysforLayeredDisplay from "../../lib/orderCharacterKeysForDisplay";
import directions from "../../types/Directions";
import reorderCharacterKeysForLayering from "../../lib/reorderCharacterKeysForLayering";

type Props = {
  character: Character;
  action: keyof typeof actions;
};

// Takes in a character and an action and renders the animation
export default function AnimationCanvas({ character, action }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [layerImages, setLayerImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({});

  const [animationFrame, setAnimationFrame] = useState<number>(0);

  // From the character we know what file (file path) and color (X position of that file) to use.
  // For example, character could have a "base" of { type: 0, color: 0 }
  // This means we use the first file in the list of files for the base, and the color multiplied by the frameWidth.y of the base.

  // With the action, we need to modify the file we read in the previous step.
  // For example, from the character, we need to modify the file we use to be the file for the action.
  // If action is "pickaxe", it would be file name without the file type plus + "_pickaxe" + file type

  // Each action has an animationFrameLength of how many frames there are in the animation.

  // This component needs to show the right part of the character's image for the right frame of the animation.

  function getFilePathForLayer(layer: keyof typeof characterProperties) {
    if (character[layer] === undefined) {
      return "";
    }

    const filePath = `animations/${actions[action].path}/${characterProperties[layer].path}/`;
    const file =
      characterProperties[layer].files[character[layer]?.type as number];

    const fileWithoutType = file.split(".")[0];
    const fileWithAction = `${fileWithoutType}_${action}`;
    return `${filePath}${fileWithAction}.${file.split(".")[1]}`;
  }

  useEffect(() => {
    // every time character changes, clear the thing
    setLayerImages({});
    setAnimationFrame(0);
  }, [character, action]);

  // Load all the images for the layers into state
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // character has multiple keys (e.g. "base", "hat", "hair", etc.)
        // so we need to iterate over all of them
        reorderCharacterKeysForLayering(
          Object.keys(character) as Array<keyof typeof characterProperties>
        ).forEach((key) => {
          if (character[key] === undefined) {
            return;
          }

          // Get the relevant spritesheet for that key from the object
          const spriteSheet = new Image();
          const src = getFilePathForLayer(key);

          spriteSheet.src = src;
          // On load of the image
          spriteSheet.onload = () => {
            // set state using the current state and the image
            setLayerImages((oldState) => ({
              ...oldState,
              [key]: spriteSheet,
            }));
          };
        });
      }
    }
  }, [canvasRef, character, action, animationFrame]);

  // Draw the images on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ensure we get the correct order by looping over keys of characterproperties object
        reorderCharacterKeysForLayering(
          Object.keys(orderCharacterKeysforLayeredDisplay(character)) as Array<
            keyof typeof characterProperties
          >
        ).forEach((key) => {
          if (layerImages[key]) {
            //  Draw 32 x 32 size image
            ctx.drawImage(
              layerImages[key],
              animationFrame * actions[action].frameSize.x +
                (character[key]?.color as number) *
                  actions[action].frameSize.x *
                  actions[action].animationFrameLength,
              directions["right"] * actions[action].frameSize.y,
              actions[action].frameSize.x,
              actions[action].frameSize.y,
              0,
              0,
              canvas.width,
              canvas.height
            );
          }
        });
      }
    }
  }, [layerImages, animationFrame, character, action]);

  // Update the animation frame
  useEffect(() => {
    const interval = setInterval(() => {
      // If animation is done, reset to 0
      if (animationFrame === actions[action].animationFrameLength - 1) {
        setAnimationFrame(0);
      } else {
        // Otherwise, increment the frame
        setAnimationFrame(animationFrame + 1);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [action, animationFrame, canvasRef, character]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 256,
        height: 256,
        borderRadius: 8,
      }}
    />
  );
}
