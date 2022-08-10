import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import CharacterPreview from "../components/CharacterCreation/CharacterPreview";
import { useEffect, useRef, useState } from "react";
import Character from "../types/Character";
import characterProperties from "../const/character";
import AnimationCanvas from "../components/CharacterActionAnimation/AnimationCanvas";

const Home: NextPage = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileScreenQuery = useMediaQuery("(max-width:600px)");

  const [generatedCharacter, setGeneratedCharacter] = useState<Character>({
    base: {
      color: 0,
      type: 7,
    },
    upper: {
      color: 3,
      type: 4,
    },
  });

  const generateRandomCharacter = () => {
    const character: Character = {};

    // for each key, generate a random number between 0 and the length of the array
    Object.entries(characterProperties).forEach(([key, value]) => {
      if (key !== "base") {
        if (Math.random() > 0.4) {
          return;
        }
      }
      const randomType = Math.floor(Math.random() * value.files.length);
      const randomColor = Math.floor(Math.random() * value.colors.length);

      character[key as keyof typeof characterProperties] = {
        type: randomType,
        color: randomColor,
      };
    });

    return character;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratedCharacter(generateRandomCharacter());
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 9,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          marginTop: 2,
          textAlign: "center",
          padding: 0,
        }}
      >
        <Grid item>
          <Typography variant="h1">chainidle</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" sx={{ mt: 3 }}>
            not <i>just</i> a p2e game.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            onClick={() => router.push(`/character-creation`)}
          >
            start playing
          </Button>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
          sx={{ mt: 12, width: "100%" }}
        >
          <Grid container direction="row" style={{ width: "100%" }} spacing={3}>
            <Grid item xs={12} sm={7}>
              <Typography variant="h3" style={{ marginBottom: 0 }}>
                build your character
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                create someone that represents you. or create a clown with a
                wizard hat and sunglasses. up to you.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ minHeight: 370 }}>
              <CharacterPreview
                canvasRef={canvasRef}
                character={generatedCharacter}
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
          sx={{ mt: 8, width: "100%" }}
        >
          <Grid
            container
            direction={mobileScreenQuery ? "column-reverse" : "row"}
            style={{ width: "100%" }}
            spacing={3}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={5}>
              <AnimationCanvas
                character={generatedCharacter}
                action="pickaxe"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h3" style={{ marginBottom: 0 }}>
                start uhhh doing stuff
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Always wanted to be a fisherman? well i haven&apos;t written
                that code yet... but we do have mining. look at that.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
