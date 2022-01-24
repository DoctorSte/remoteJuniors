import Link from "next/link";
import { useUser } from "../utils/supabase";

const Nav = () => {
  const { user } = useUser();
  return (
    <nav className="w-full flex justify-between">
      <div className="flex gap-4">
        <h1 className="font-bold">Remote juniors</h1>
        <a>Juniors</a>
        <a>Companies</a>
      </div>
      <Link href={user ? "/logout" : "/login"}>
        <a>{user ? `Logout ${user.firstName}` : "Login with Github"}</a>
      </Link>
    </nav>
  );
};
export default Nav;
