import { Typography } from "@mui/material";
import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import theme from "../../const/mui/theme";
import styles from "../../styles/Loading.module.css";

export default function ConnectWalletDonowall() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        <Typography variant="h4" className={styles.loadingText} sx={{ mb: 2 }}>
          letsz connect ur wallet ok ?
        </Typography>

        <ConnectWallet
          accentColor={theme.palette.primary.main}
          colorMode={"dark"}
        />
      </div>
    </div>
  );
}
