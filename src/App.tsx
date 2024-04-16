import { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Main from "./components/Main/Main";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./state/store";
import { updateSwitch, updateTheme } from "./state/theme/themeSlice";
import { useDarkMode } from "usehooks-ts";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { updateUser } from "./state/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyJwtPayload extends JwtPayload {
  email: string;
  given_name: string;
  picture: string;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useDarkMode();
  const [loggedIn, setLoggedIn] = useState(false);

  dispatch(updateTheme(isDarkMode ? "dark" : "light"));
  dispatch(updateSwitch(isDarkMode));

  const handleLoginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const decoded = jwtDecode(response.credential) as MyJwtPayload;
      dispatch(
        updateUser({
          email: decoded.email,
          name: decoded.given_name,
          logo: decoded.picture,
        })
      );
      setLoggedIn(true);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
      });
    } else {
      toast.error("Login failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };

  return (
    <>
      <SideBar />
      <Main />
      <div className="google-login">
        {!loggedIn && (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login failed")}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
