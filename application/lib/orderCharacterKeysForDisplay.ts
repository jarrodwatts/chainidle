import Character from "../types/Character";

/**
 * Take in a character object and sort the keys ready for layered display.
 *
 */
export default function orderCharacterKeysForLayeredDisplay(
  character: Character
): Character {
  // typed as the keys  inthe characterProperties object
  const orderedKeys: string[] = [
    "base",
    "eyes",
    "blush",
    "lipstick",
    "upper",
    "lower",
    "bodysuit",
    "shoes",
    "hair",
    "beard",
    "glasses",
    "earring",
    "mask",
    "hat",
  ];

  // Create a new object with the same keys as the characterProperties object
  const orderedCharacter: Character = {};
  // Loop through the ordered keys and add them to the new object
  orderedKeys.forEach((key) => {
    // Add the key to the new object
    // @ts-ignore FUCK me dead this is annoying
    orderedCharacter[key] = character[key];
  });
  // Return the new object
  return orderedCharacter;
}
