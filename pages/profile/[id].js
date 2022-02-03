import { supabase } from "../../utils/supabase";
import Link from "next/dist/client/link";

const JuniorPage = ({ junior }) => {
  const pic = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <div>
      <Link href="/">Back</Link>
      <div className="border border-gray-700 rounded-xl p-3">
        <img src={`${pic}${junior.avatar_url}`} className="rounded-full w-32" />
        <p>
          {junior.firstName} {junior.lastName}
        </p>
        <p>{junior.username}</p>
        <p className="text-sm">Motivation: {junior.motivation}</p>
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
  );
};

export const getStaticPaths = async () => {
  const { data: juniors } = await supabase.from("profiles").select("id");

  const paths = juniors.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
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
