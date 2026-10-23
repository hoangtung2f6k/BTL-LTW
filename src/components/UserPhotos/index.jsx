import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import ludgate1 from "../../images/ludgate1.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ouster from "../../images/ouster.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";

const images = {
  "kenobi1.jpg": kenobi1,
  "kenobi2.jpg": kenobi2,
  "kenobi3.jpg": kenobi3,
  "kenobi4.jpg": kenobi4,
  "ludgate1.jpg": ludgate1,
  "malcolm1.jpg": malcolm1,
  "malcolm2.jpg": malcolm2,
  "ouster.jpg": ouster,
  "ripley1.jpg": ripley1,
  "ripley2.jpg": ripley2,
  "took1.jpg": took1,
  "took2.jpg": took2,
};

function formatDateTime(dateTime) {
  if (!dateTime) return "";
  const d = new Date(dateTime.replace(" ", "T"));
  return isNaN(d.getTime()) ? dateTime : d.toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  if (!photos || photos.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No photos found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 1 }}>
      {user && (
        <Typography variant="h5">
          Photos of {user.first_name} {user.last_name}
        </Typography>
      )}
      {photos.map((photo) => (
        <Card key={photo._id} variant="outlined">
          <CardMedia
            component="img"
            image={images[photo.file_name]}
            alt={photo.file_name}
            sx={{
              maxHeight: 450,
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              {formatDateTime(photo.date_time)}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Comments
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {photo.comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        component={Link}
                        to={`/users/${comment.user._id}`}
                        variant="subtitle2"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDateTime(comment.date_time)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.primary">
                      {comment.comment}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
