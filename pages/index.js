import Head from "next/head";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "../context/user";

export default function Home({ juniors }) {
  const { user } = useUser();

  const pic = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <div className="">
      <Head>
        <title>Remote Juniors</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen">
        <section className=" flex justify-center w-full ">
          <div className="grid grid-cols-4 gap-4 max-w-7xl my-12 ">
            <div className="flex flex-col items-start justify-center col-span-3 max-w-4xl ">
              <h1 className="text-6xl sm:text-8xl font-black mb-6">
                Looking for real-life experience?
              </h1>
              <div className="max-w-xl">
                <p className="text-xl">
                  Join the club! Create your profile and get scouted by
                  companies looking for juniors all over the world.
                </p>
                <p className="text-blue-500 mt-6">
                  RemoteJuniors helps you find a placement in companies that
                  value learning.{" "}
                  <Link href="/login">
                    <span className="underline hover:text-blue-300 cursor-pointer font-bold">
                      Sign up now.
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full ">
              <img src="/banner.png" />
            </div>
          </div>
        </section>
        {juniors.length} Juniors Available
        <section className="grid sm:grid-cols-4 gap-2 text-yellow-50">
          {juniors &&
            juniors.map((junior) => (
              <Link key={junior.id} href={`/profile/${junior.id}`}>
                <a className="border border-gray-700 rounded-xl p-3">
                  <img
                    src={`${pic}${junior.avatar_url}`}
                    className="rounded-full w-32"
                  />
                  <p>
                    {junior.firstName} {junior.lastName}
                  </p>
                  <p>{junior.username}</p>
                  <p className="text-sm">{junior.motivation}</p>
                  <div className="mt-3">
                    Learning:
                    <div className="flex gap-2">
                      {junior.learning &&
                        junior.learning.map((item) => (
                          <div
                            key={item}
                            className=" capitalize text-sm px-2 py-1 rounded-xl border border-gray-700"
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data: juniors } = await supabase.from("profiles").select("*");
  return {
    props: {
      juniors,
    },
  };
};
