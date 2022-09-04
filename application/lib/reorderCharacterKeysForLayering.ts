// Accepts an array of characterProperty keys

import characterProperties from "../const/character";

// Re-orders them to be the correct order
export default function reorderCharacterKeysForLayering(
  keys: Array<keyof typeof characterProperties>
) {
  // The correct order is
  // 1. base
  // 2. eyes
  // 3. blush
  // 4. lipstick
  // 5. upper
  // 6. lower
  // 7. bodysuit
  // 8. shoes
  // 9. hair
  // 10. beard
  // 11. glasses
  // 12. earring
  // 13. hat
  // 14. mask

  // Return the keys in the correct order
  return keys.sort((a, b) => {
    return (
      // Lowest layerIndex should be first
      characterProperties[a].layerIndex - characterProperties[b].layerIndex
    );
  });
}
