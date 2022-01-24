import { supabase } from "./utils/supabase";

const JuniorPage = ({ junior }) => {
  console.log({ junior });
  return (
    <>
      {junior.firstName}
      {junior.lastName}
      {junior.languages
        ? junior.languages.map((language) => (
            <div key={language}>{language}</div>
          ))
        : "No languages"}
    </>
  );
};

export const getStaticPaths = async () => {
  const { data: juniors } = await supabase.from("profile").select("id");

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
    .from("profile")
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
