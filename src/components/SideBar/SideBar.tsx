import "./SideBar.scss";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  getRecentPrompt,
  cancelShowResult,
  approveShowResult,
  updateLoading,
  updateActiveRecentPrompt,
} from "../../state/prompt/promptSlice";
import Switch from "../UI/Switch/Switch";

//ICONS
import { FiHelpCircle, FiSettings, FiPlus, FiMenu } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { BiMessage } from "react-icons/bi";

const SideBar = () => {
  const [extended, setExtended] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<null | "help" | "settings">(null);

  const prompt = useSelector((state: RootState) => state.prompt);
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenPopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setExtended((prev) => !prev);
  };

  const handleSettingsClick = () => {
    setOpenPopup((prev) => (prev === "settings" ? null : "settings"));
  };

  const handleHelpClick = () => {
    setOpenPopup((prev) => (prev === "help" ? null : "help"));
  };

  return (
    <div
      style={{ backgroundColor: theme.mode === "dark" ? "#1E1F20" : "#f0f4f9" }}
      className={`sidebar ${extended ? "expanded" : ""}`}
    >
      <div className="top">
        <div
          onClick={handleMenuClick}
          className={`menu ${theme.mode === "dark" ? "dark-mode" : ""}`}
        >
          <FiMenu
            size={20}
            color={theme.mode === "dark" ? "#fff" : "initial"}
          />
        </div>

        <div
          onClick={() => dispatch(cancelShowResult())}
          style={{
            opacity: prompt.showResult ? "1" : "0.7",
            pointerEvents: prompt.showResult ? "auto" : "none",
            fontWeight: prompt.showResult ? "600" : "400",
            backgroundColor: theme.mode === "dark" ? "#000" : "#e6eaf1",
          }}
          className="new-chat"
        >
          <FiPlus
            size={20}
            color={theme.mode === "dark" ? "#fff" : "initial"}
          />
          {extended && (
            <p style={{ color: theme.mode === "dark" ? "#DDDADD" : "initial" }}>
              New Chat
            </p>
          )}
        </div>
        <div className="recent">
          {extended && (
            <>
              {prompt.recentPrompts.length ? (
                <div className="recent-container">
                  <RiHistoryFill
                    size={20}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#DDDADD" : "initial",
                      userSelect: "none",
                    }}
                    className="recent-title"
                  >
                    No Recent
                  </p>
                </div>
              ) : (
                <div className="recent-container">
                  <RiHistoryFill
                    size={20}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#DDDADD" : "initial",
                      userSelect: "none",
                    }}
                    className="recent-title"
                  >
                    No Recent
                  </p>
                </div>
              )}
              {prompt.recentPrompts.map((recentPrompt) => {
                return (
                  <div
                    onClick={() => {
                      dispatch(approveShowResult());
                      dispatch(getRecentPrompt({ id: recentPrompt.id }));
                      dispatch(
                        updateActiveRecentPrompt({ id: recentPrompt.id })
                      );
                      dispatch(updateLoading(true));
                      setTimeout(() => {
                        dispatch(updateLoading(false));
                      }, 700);
                    }}
                    className={`recent-entry ${
                      recentPrompt.id === prompt.activeId ? "active" : ""
                    } ${theme.mode === "dark" ? "dark-mode" : ""}`}
                    key={recentPrompt.id}
                  >
                    <BiMessage
                      size={22}
                      color={theme.mode === "dark" ? "#fff" : "initial"}
                    />
                    <p
                      style={{
                        color: theme.mode === "dark" ? "#DDDADD" : "#282828",
                      }}
                    >{`${
                      recentPrompt.title.length > 10
                        ? recentPrompt.title.slice(0, 10) + "..."
                        : recentPrompt.title
                    }`}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className={`bottom ${extended ? "extended" : ""}`} ref={modalRef}>
        <div
          className={`bottom-item recent-entry settings ${
            theme.mode === "dark" ? "dark-mode" : ""
          }`}
          onClick={handleHelpClick}
        >
          <FiHelpCircle
            size={20}
            color={theme.mode === "dark" ? "#fff" : "initial"}
          />
          {extended && (
            <p
              style={{
                color: theme.mode === "dark" ? "#DDDADD" : "initial",
              }}
            >
              Help
            </p>
          )}
          {openPopup === "help" && (
            <div
              style={{
                backgroundColor: theme.mode === "dark" ? "#282A2C" : "#fff",
              }}
              className="popup-container"
            >
              <div
                className={`close-button ${
                  theme.mode === "dark" ? "dark-mode" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopup(null);
                }}
                style={{
                  backgroundColor: theme.mode === "dark" ? "#000" : "#f0f4f9",
                }}
              >
                <IoIosClose
                  color={theme.mode === "dark" ? "#f0f4f9" : "#000"}
                />
              </div>
              <p
                style={{
                  color: theme.mode === "dark" ? "#DDDADD" : "initial",
                }}
              >
                Enter a prompt to get response
              </p>
            </div>
          )}
        </div>
        <div
          className={`bottom-item recent-entry settings ${
            theme.mode === "dark" ? "dark-mode" : ""
          }`}
          onClick={handleSettingsClick}
        >
          <FiSettings
            size={20}
            color={theme.mode === "dark" ? "#fff" : "initial"}
          />
          {extended && (
            <p
              style={{
                color: theme.mode === "dark" ? "#DDDADD" : "initial",
              }}
            >
              Settings
            </p>
          )}
          {openPopup === "settings" && (
            <div
              style={{
                backgroundColor: theme.mode === "dark" ? "#282A2C" : "#fff",
              }}
              className="popup-container"
            >
              <MdOutlineDarkMode
                size={20}
                color={theme.mode === "dark" ? "#fff" : "initial"}
              />
              <div
                className={`close-button ${
                  theme.mode === "dark" ? "dark-mode" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopup(null);
                }}
                style={{
                  backgroundColor: theme.mode === "dark" ? "#000" : "#f0f4f9",
                }}
              >
                <IoIosClose
                  color={theme.mode === "dark" ? "#f0f4f9" : "#000"}
                />
              </div>
              <p
                style={{
                  color: theme.mode === "dark" ? "#DDDADD" : "initial",
                }}
              >
                Enable Dark Mode
              </p>
              <Switch />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
