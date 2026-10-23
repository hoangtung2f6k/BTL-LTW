import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const userDetailMatch = useMatch("/users/:userId");
  const userPhotosMatch = useMatch("/photos/:userId");

  let contextText = "";
  if (userDetailMatch) {
    const user = models.userModel(userDetailMatch.params.userId);
    if (user) {
      contextText = `${user.first_name} ${user.last_name}`;
    }
  } else if (userPhotosMatch) {
    const user = models.userModel(userPhotosMatch.params.userId);
    if (user) {
      contextText = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="h5" color="inherit">
          Nghiêm Xuân Hoàng Tùng
        </Typography>
        <Typography variant="h5" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
