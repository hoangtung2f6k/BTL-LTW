import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          User not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Card variant="outlined" sx={{ m: 1 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Occupation
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.occupation}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.location}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {user.description}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to={`/photos/${user._id}`}
            variant="contained"
            color="primary"
          >
            View Photos
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
