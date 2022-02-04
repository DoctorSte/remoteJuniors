import Link from "next/link";
import { useUser } from "../../context/user";

const Nav = () => {
  const { user } = useUser();
  const pic = process.env.NEXT_PUBLIC_BUCKET_URL;
  return (
    <nav className="w-full flex justify-between">
      <div className="flex gap-4">
        <Link href="/">
          <h1 className="font-bold cursor-pointer hover:opacity-70">
            Remote juniors
          </h1>
        </Link>
        <Link href="/" passHref>
          Juniors
        </Link>
        <Link href="/companies" passHref>
          Companies
        </Link>
      </div>
      <Link href={user ? `/profile` : "/login"}>
        <a>
          {user ? (
            <div className="flex gap-3 items-center">
              {user.firstName} {user.username}
              <img
                src={`${pic}${user.avatar_url}`}
                className="w-10 h-10 border bg-red-50 rounded-full"
              />
            </div>
          ) : (
            "Login with Github"
          )}
        </a>
      </Link>
    </nav>
  );
};
export default Nav;
