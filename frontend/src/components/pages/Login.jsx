import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginUserContext } from "../providers/LoginUserProvider";

export default function Login() {
  const { setLoginUser, setIsLogined } = useContext(LoginUserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onClickLogin = () => {
    console.log("ログイン処理開始");
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    const queries = { username: user.username };
    axios.get(endpoint, { params: queries }).then((res) => {
      const found = res.data[0];
      if (!found) {
        console.log("ログイン失敗");
        navigate("/loginfailed");
      } else {
        console.log("ログイン成功");
        setLoginUser(found.username);
        setIsLogined(true);
        navigate("/", { state: { username: "ABC" } });
      }
    });
  };

  return (
    <>
      <Container maxwidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">ログイン画面</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="名前"
            id="username"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClickLogin}
          >
            ログイン
          </Button>
          <Link to="/register">新規登録はこちら</Link>
        </Box>
      </Container>
    </>
  );
}
