import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useUser } from "../../context/user";
import Avatar from "../../components/Avatar";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [learning, setLearning] = useState(null);
  const [newLearning, setNewLearning] = useState(null);
  const [location, setLocation] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setMotivation(data.motivation);
        setLearning(data.learning);
        setLocation(data.location);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        firstName,
        lastName,
        location,
        website,
        avatar_url,
        motivation,
        learning,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const removeSkill = (indexToRemove) => {
    setLearning((arr) => {
      return arr.filter((_value, i) => i !== indexToRemove);
    });
  };

  return (
    <main className="w-full grid justify-center">
      <div className="flex flex-col sm:w-200 gap-2 p-3 border rounded-lg border-gray-700">
        <h1 className="text-xl font-bold">Your Profile</h1>
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              id="firstName"
              type="firstName"
              value={firstName || ""}
              className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              id="lastName"
              type="lastName"
              value={lastName || ""}
              className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div>
            <label htmlFor="website">Website: </label>
            <input
              id="website"
              type="website"
              value={website || ""}
              className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Location: </label>
            <input
              id="location"
              type="location"
              value={location || ""}
              className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="motivation">Motivation: </label>
          <br />
          <textarea
            id="motivation"
            type="motivation"
            rows="3"
            value={motivation || ""}
            className="bg-gray-800 border border-gray-400 p-2 rounded-lg w-full"
            onChange={(e) => setMotivation(e.target.value)}
          />
        </div>
        <p>Learning: </p>
        <div className="flex gap-2">
          {learning &&
            learning.map((item, index) => (
              <div key={index}>
                {item}{" "}
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-2 w-full">
          <input
            id=""
            type=""
            value={newLearning || ""}
            className="bg-gray-800 border border-gray-400 p-2 rounded-lg"
            onChange={(e) => setNewLearning(e.target.value)}
          />
          <button
            className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 transition-all"
            onClick={
              learning
                ? () => setLearning((arr) => [...arr, newLearning])
                : () => setLearning([newLearning])
            }
          >
            Add Learning
          </button>
        </div>
        <div>
          <button
            className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 transition-all"
            onClick={() =>
              updateProfile({
                username,
                website,
                avatar_url,
                learning,
                motivation,
              })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update profile"}
          </button>
        </div>
        <div>
          <button
            className="mt-3 px-3 py-2 rounded bg-red-500 hover:bg-red-700 transition-all"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
