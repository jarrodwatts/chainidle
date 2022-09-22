import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import skills from "../const/skills";
import { useGameContext } from "./game/GameArea";

const drawerWidth = 240;

export default function GameSidebar() {
  const gameContext = useGameContext();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h5" sx={{ mt: 3 }} color="primary">
          chainidle
        </Typography>

        <Typography variant="h6" sx={{ mt: 5 }}>
          skillz
        </Typography>
        <List>
          {Object.entries(skills).map(([skillKey, skillVal], index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() =>
                  gameContext.activeSkill.set(skillKey as keyof typeof skills)
                }
              >
                <ListItemIcon>
                  <img src={skillVal.icon} alt={skillVal.displayName} />
                </ListItemIcon>
                <ListItemText primary={skillVal.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Typography variant="h6" sx={{ mt: 2 }}>
          not skillz
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"buy stuff"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"forgery"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"market"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
