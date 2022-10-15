import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import GameSidebar from "../components/GameSidebar";
import ShopsForSkillContainer from "../components/shop/ShopsForSkillContainer";
import skills from "../const/skills";

type Props = {};

export default function Shop({}: Props) {
  const router = useRouter();

  return (
    <>
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
            textAlign: "center",
            padding: 0,
          }}
          sx={{ mb: 5 }}
        >
          <Typography variant="h1">shop</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            hey, welcome to the shop
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            here u can buy stuff
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => router.push("/play")}
          >
            back to game
          </Button>
        </Grid>

        <Grid container direction="column" alignItems="center">
          {Object.entries(skills).map(([skillKey, skillValue]) => (
            <Grid
              container
              item
              xs={12}
              direction="column"
              key={skillKey}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Typography variant="h3">{skillValue.displayName}</Typography>
              <ShopsForSkillContainer skill={skillValue} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
