import { useEffect, useState } from "react";

const useTypingEffect = (text: string, delay = 10) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => prevText + text.charAt(currentIndex));
        currentIndex++;
        timer = setTimeout(type, delay);
      }
    };

    setDisplayedText("");
    type();

    return () => clearTimeout(timer);
  }, [text, delay]);

  return displayedText;
};

export default useTypingEffect;