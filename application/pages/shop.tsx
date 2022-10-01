import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import GameSidebar from "../components/GameSidebar";
import ShopForSkillContainer from "../components/shop/ShopForSkillContainer";
import skills from "../const/skills";

type Props = {};

export default function shop({}: Props) {
  return (
    <>
      <GameSidebar />

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
              <ShopForSkillContainer skill={skillValue} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
