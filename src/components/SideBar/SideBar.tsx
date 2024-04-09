import "./SideBar.scss";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  getRecentPrompt,
  cancelShowResult,
} from "../../state/prompt/promptSlice";

const SideBar = () => {
  const [extended, setExtended] = useState<boolean>(false);

  const prompt = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu_icon"
        />
        <div
          onClick={() => dispatch(cancelShowResult())}
          style={
            prompt.showResult
              ? { opacity: 1, pointerEvents: "auto", fontWeight: 600 }
              : { opacity: 0.7, pointerEvents: "none", fontWeight: 400 }
          }
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="plus_icon" />
          {extended && <p>New Chat</p>}
        </div>
        <div className="recent">
          {extended && (
            <>
              <p className="recent-title">Recent</p>
              {prompt.recentPrompts.map((prompt) => {
                return (
                  <div
                    onClick={() => dispatch(getRecentPrompt({ id: prompt.id }))}
                    className="recent-entry"
                    key={prompt.id}
                  >
                    <img src={assets.message_icon} alt="message_icon" />
                    <p>{`${prompt.title.slice(0, 15)} ...`}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question_icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history_icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.settings_icon} alt="settings_icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
