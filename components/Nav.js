import Link from "next/link";
import { useUser } from "../context/user";

const Nav = () => {
  const { user } = useUser();
  const pic = process.env.NEXT_PUBLIC_BUCKET_URL;
  return (
    <nav className="w-full flex justify-between items-center mb-4">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <img
            src="/remoteJuniorsLogo.svg"
            className="w-32 sm:w-44 hover:opacity-70 cursor-pointer transition-all"
          />
        </Link>
        <Link href="/" passHref>
          <p className="hidden sm:block hover:opacity-70 cursor-pointer">
            Juniors
          </p>
        </Link>
        <Link href="/companies" passHref>
          <p className="hidden sm:block  hover:opacity-70 cursor-pointer">
            Companies
          </p>
        </Link>
      </div>
      <Link href={user ? `/profile` : "/login"}>
        <a>
          {user ? (
            <div className="flex gap-3 items-center hover:opacity-70 transition-all">
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
