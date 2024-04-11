import "./Main.scss";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { updateInput } from "../../state/prompt/promptSlice";
import { getPromptData } from "../../state/prompt/promptSlice";
import { marked } from "marked";
import useTypingEffect from "../../hooks/useTypingEffect";

//ICONS
import { BsCompassFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { RiDiscussFill } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { MdNoPhotography } from "react-icons/md";
import { FaMicrophoneSlash } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

const Main = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const prompt = useSelector((state: RootState) => state.prompt);
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const resultData = useTypingEffect(prompt.resultData);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue) {
      dispatch(updateInput({ input: searchValue }));
      dispatch(getPromptData());
      setSearchValue("");
    }
  };

  const handleSend = () => {
    dispatch(updateInput({ input: searchValue }));
    dispatch(getPromptData());
    setSearchValue("");
  };

  const getTitle = () => {
    const promptObj = prompt.recentPrompts.find(
      (item) => item.title === prompt.input
    );
    return promptObj?.title;
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: theme.mode === "dark" ? "#131314" : "initial",
      }}
      className="main-container"
    >
      <div className="main">
        <div className="nav">
          <p style={{ color: theme.mode === "dark" ? "#CACCCE" : "#585858" }}>
            Gemini
          </p>
          <img src={assets.user_icon} alt="user_icon" />
        </div>
        <div className="main-container">
          {!prompt.showResult ? (
            <>
              <div className="greeting">
                <p>
                  <span>Hello, Dev.</span>
                </p>
                <p
                  style={{
                    color: theme.mode === "dark" ? "#444746" : "#c4c7c5",
                  }}
                >
                  How can I help you today?
                </p>
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
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#1E1F20" : "#f0f4f9",
                  }}
                >
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#CACCCE" : "#585858",
                    }}
                  >
                    Where is Cuba located at?
                  </p>
                  <BsCompassFill
                    size={30}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
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
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#1E1F20" : "#f0f4f9",
                  }}
                >
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#CACCCE" : "#585858",
                    }}
                  >
                    What is a dilemma?
                  </p>
                  <FaRegLightbulb
                    size={30}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateInput({
                        input: "Is there absolute knowledge?",
                      })
                    );
                    dispatch(getPromptData());
                  }}
                  className="card"
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#1E1F20" : "#f0f4f9",
                  }}
                >
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#CACCCE" : "#585858",
                    }}
                  >
                    Is there absolute knowledge?
                  </p>
                  <RiDiscussFill
                    size={30}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
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
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#1E1F20" : "#f0f4f9",
                  }}
                >
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#CACCCE" : "#585858",
                    }}
                  >
                    TypeScript or JavaScript?
                  </p>
                  <FaCode
                    size={30}
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div
                style={{ color: theme.mode === "dark" ? "#CACCCE" : "initial" }}
                className="result-title"
              >
                <img src={assets.user_icon} alt="user_icon" />
                <p>{getTitle()}</p>
              </div>
              <div className="result-data">
                <img
                  className={`gemini-icon ${prompt.loading ? "rotating" : ""}`}
                  src={assets.gemini_icon}
                  alt="gemini_icon"
                />
                {prompt.loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p
                    style={{
                      color: theme.mode === "dark" ? "#CACCCE" : "initial",
                    }}
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
          <div
            style={{
              backgroundColor: theme.mode === "dark" ? "#1E1F20" : "#f0f4f9",
            }}
            className="search-box"
          >
            <input
              style={{ color: theme.mode === "dark" ? "#CACCCE" : "initial" }}
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
              <MdNoPhotography
                color={theme.mode === "dark" ? "#fff" : "initial"}
              />
              <FaMicrophoneSlash
                color={theme.mode === "dark" ? "#fff" : "initial"}
              />
              {searchValue ? (
                <div className="send" onClick={handleSend}>
                  <IoSendSharp
                    color={theme.mode === "dark" ? "#fff" : "initial"}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <p
            style={{ color: theme.mode === "dark" ? "#CACCCE" : "initial" }}
            className="bottom-info"
          >
            Gemini may display inaccurate information, including about people,
            so double-check its responses. Your privacy above all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
