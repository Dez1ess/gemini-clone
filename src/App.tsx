import SideBar from "./components/SideBar/SideBar";
import Main from "./components/Main/Main";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./state/store";
import { updateSwitch, updateTheme } from "./state/theme/themeSlice";
import { useDarkMode } from "usehooks-ts";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useDarkMode();

  dispatch(updateTheme(isDarkMode ? "dark" : "light"));
  dispatch(updateSwitch(isDarkMode));

  return (
    <>
      <SideBar />
      <Main />
    </>
  );
}

export default App;
