import React from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserList() {
  const users = models.userListModel();
  const location = useLocation();

  return (
    <div>
      <List component="nav">
        {users.map((item) => {
          const isSelected =
            location.pathname === `/users/${item._id}` ||
            location.pathname === `/photos/${item._id}`;
          return (
            <React.Fragment key={item._id}>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                selected={isSelected}
              >
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default UserList;
