import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import skills from "../const/skills";
import { Typography } from "@mui/material";

export default function GameSidebar() {
  return (
    <Box
      sx={{
        height: 0,
        width: 200,
      }}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <Typography variant="body1">chainidle</Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem sx={{ mt: 2 }}>
          <Typography variant="body2">skills</Typography>
        </ListItem>
        {Object.entries(skills).map(([key, value], index) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={value.icon} alt={value.displayName} />
              </ListItemIcon>
              <ListItemText primary={value.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>todo</ListItemIcon>
            <ListItemText primary={"shop"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>todo</ListItemIcon>
            <ListItemText primary={"forgery"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>todo</ListItemIcon>
            <ListItemText primary={"market"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
