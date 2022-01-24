import Link from "next/link";
import { useUser } from "../context/user";

const Nav = () => {
  const { user } = useUser();
  return (
    <nav className="w-full flex justify-between">
      Remote juniors
      <Link href={user ? "/logout" : "/login"}>
        <a>{user ? `Logout ${user.firstName}` : "Login with Github"}</a>
      </Link>
    </nav>
  );
};
export default Nav;
