import { supabase } from "../../utils/supabase";
import Link from "next/dist/client/link";
import { ArrowLeftIcon, BeakerIcon } from "@heroicons/react/solid";

const JuniorPage = ({ junior }) => {
  const pic = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <main className="w-full grid justify-center">
      <Link href="/">
        <span className="flex gap-2 hover:text-gray-500 cursor-pointer mb-2">
          <ArrowLeftIcon className="w-4" /> Go Back
        </span>
      </Link>
      <div className="flex flex-col sm:w-200 gap-2 p-3 border rounded-lg border-gray-700">
        <div className="">
          <div className="flex gap-3 items-center">
            <img
              src={`${pic}${junior.avatar_url}`}
              className="rounded-xl w-44"
            />
            <div>
              <p className="font-bold text-xl">
                {junior.firstName} {junior.lastName}
              </p>
              <p>{junior.username}</p>
              <div className="text-gray-400">
                <p>Location: {junior.location}</p>
                <p>Current level: {junior.level}</p>
                <p>
                  Website:{" "}
                  {junior.website ? (
                    <a href={`https://${junior.website}`}>{junior.website}</a>
                  ) : (
                    "None"
                  )}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3">
            Motivation:
            <br /> {junior.motivation}
          </p>
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
          <div className="flex justify-between mt-2 items-center">
            Want {junior.firstName} to work for you as a junior?
            <a
              href={`mailto:${junior.email}`}
              className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 transition-all mt-2"
            >
              Contact {junior.firstName}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  const { data: juniors } = await supabase.from("profiles").select("id");

  const paths = juniors.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: junior } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      junior,
    },
  };
};
export default JuniorPage;
