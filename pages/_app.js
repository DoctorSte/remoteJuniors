import "../styles/globals.css";
import UserProvider from "../context/user";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-gray-900 text-blue-50 p-6 sm:p-16 min-h-screen">
        <Nav />
        <Toaster />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
