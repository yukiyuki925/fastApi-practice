import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import BasicMenu from "../elements/BasicMenu";
import { LoginUserContext } from "../providers/LoginUserProvider";
import { useContext } from "react";

export default function Header() {
  const { loginUser } = useContext(LoginUserContext);
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <BasicMenu />
        </Box>
        <Typography variant="h6" component="div">
          ログインユーザー:{loginUser}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
