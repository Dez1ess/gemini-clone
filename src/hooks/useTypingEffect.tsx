import { useEffect, useState } from "react";

const useTypingEffect = (text: string, delay = 10) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        setTypedText((prevText) => prevText + text.charAt(index));
        index++;
        timeout = setTimeout(type, delay);
      }
    };

    setTypedText("");
    type();

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return typedText;
};

export default useTypingEffect;