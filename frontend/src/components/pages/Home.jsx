import Header from "../templates/Header";
import { Navigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginUserContext } from "../providers/LoginUserProvider";

export default function Home() {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const { isLogined } = useContext(LoginUserContext);
  if (!isLogined) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header name="omg" />
        Home
        {data.username}
      </>
    );
  }
}
