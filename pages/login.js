import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useUser } from "./context/user";

const Login = () => {
  const { login } = useUser();
  useEffect(login, []);
  return <p>Logging in</p>;
};

export default Login;
