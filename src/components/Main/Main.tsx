import "./Main.scss";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { updateInput } from "../../state/prompt/promptSlice";
import { getPromptData } from "../../state/prompt/promptSlice";
import { marked } from "marked";
import useTypingEffect from "../../hooks/useTypingEffect";

const Main = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const prompt = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch<AppDispatch>();
  const resultData = useTypingEffect(prompt.resultData);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue) {
      dispatch(updateInput({ input: searchValue }));
      dispatch(getPromptData());
      setSearchValue("");
    }
  };

  const getTitle = () => {
    const promptObj = prompt.recentPrompts.find(
      (item) => item.title === prompt.input
    );
    return promptObj?.title;
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {!prompt.showResult ? (
          <>
            <div className="greeting">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                onClick={() => {
                  dispatch(
                    updateInput({
                      input: "Where is Cuba located at?",
                    })
                  );
                  dispatch(getPromptData());
                }}
                className="card"
              >
                <p>Where is Cuba located at?</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateInput({
                      input: "What is a dilemma?",
                    })
                  );
                  dispatch(getPromptData());
                }}
                className="card"
              >
                <p>What is a dilemma?</p>
                <img src={assets.bulb_icon} alt="bulb_icon" />
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateInput({
                      input: "What is the best rule to stay focused?",
                    })
                  );
                  dispatch(getPromptData());
                }}
                className="card"
              >
                <p>What is the best rule to stay focused</p>
                <img src={assets.message_icon} alt="message_icon" />
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateInput({
                      input: "TypeScript or JavaScript?",
                    })
                  );
                  dispatch(getPromptData());
                }}
                className="card"
              >
                <p>TypeScript or JavaScript?</p>
                <img src={assets.code_icon} alt="code_icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user_icon" />
              <p>{getTitle()}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini_icon" />
              {prompt.loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: marked(resultData),
                  }}
                ></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            type="text"
            name="search"
            value={searchValue}
            placeholder="Enter a prompt here"
          />
          <div className="interraction">
            <img
              style={{ opacity: 0.5 }}
              src={assets.gallery_icon}
              alt="gallery_icon"
            />
            <img
              style={{ opacity: 0.5 }}
              src={assets.mic_icon}
              alt="mic_icon"
            />
            {searchValue ? (
              <img
                onClick={() => {
                  dispatch(updateInput({ input: searchValue }));
                  dispatch(getPromptData());
                  setSearchValue("");
                }}
                className="send-icon"
                src={assets.send_icon}
                alt="send_icon"
              />
            ) : null}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate information, including about people, so
          double-check its responses. Your privacy above all.
        </p>
      </div>
    </div>
  );
};

export default Main;
