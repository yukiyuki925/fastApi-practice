import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useLogin = () => {
  const { setLoginUser, setIsLogined } = useContext(LoginUserContext);
  const navigate = useNavigate();
  const login = (user) => {
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
  return { login };
};
