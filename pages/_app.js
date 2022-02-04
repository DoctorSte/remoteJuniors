import "../styles/globals.css";
import UserProvider from "../context/user";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-gray-900 text-blue-50 p-4 sm:p-24">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
