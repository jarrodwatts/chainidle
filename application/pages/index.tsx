import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 4,
          }}
        >
          Chain Idle!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          An open-source, play-to-earn idle game where you improve your
          character&apos;s skills and earn resources for your hard work.
        </Typography>

        <ul>
          <li>
            <Typography variant="body1">
              Mint ERC-721 NFT characters with upgradable skills on-chain
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Buy ERC-1155 NFT tools from the shop
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Stake your character and tool on a contract to start earning
              ERC-20 rewards
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Craft unique ERC-721 &quot;upgraded tools&quot; from the forgery
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Sell your tools on the marketplace - Open loot boxes with parts,
              tools and more
            </Typography>
          </li>
        </ul>

        <a href="https://github.com/jarrodwatts/chainidle">View the GitHub</a>
      </Box>
    </Container>
  );
};

export default Home;
