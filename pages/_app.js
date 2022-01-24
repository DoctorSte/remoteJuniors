import "../styles/globals.css";
import UserProvider from "./context/user";
import Nav from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-gray-900 p-6 text-blue-50 p-6">
        <Nav />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
