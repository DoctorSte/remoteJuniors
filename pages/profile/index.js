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
    <div className="form-widget">
      <Nav />
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          className="bg-gray-900 "
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website: </label>
        <input
          id="website"
          type="website"
          value={website || ""}
          className="bg-gray-900 "
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="motivation">Motivation: </label>
        <textarea
          id="motivation"
          type="motivation"
          rows="4"
          value={motivation || ""}
          className="bg-gray-900 border border-gray-700 rounded "
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
      <input
        id=""
        type=""
        value={newLearning || ""}
        className="bg-gray-900 border border-gray-700 rounded text-blue-50"
        onChange={(e) => setNewLearning(e.target.value)}
      />
      <button
        className="px-2 py-1 rounded bg-blue-500"
        onClick={
          learning
            ? () => setLearning((arr) => [...arr, newLearning])
            : () => setLearning([newLearning])
        }
      >
        Add Learning
      </button>

      <div>
        <button
          className="px-2 py-1 rounded bg-blue-500"
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
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />

      <div>
        <button
          className="text-red-500 block"
          onClick={() => {
            supabase.auth.signOut();
            router.push("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
