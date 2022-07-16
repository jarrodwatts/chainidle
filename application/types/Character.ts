import characterProperties from "../const/character";

type Character = {
  [key in keyof typeof characterProperties]?: {
    type: number;
    color: number;
  };
};

export default Character;
