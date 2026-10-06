import React, { createContext, useContext, useEffect, useState } from "react";
import "./style.css";

const LanguageContext = createContext("English");

const translations = {
  English: {
    title: "Word & Letter Counter",
    language: "Language",
    placeholder: "Type your text here...",
    wordCount: "Word Count",
    letterCount: "Letter Count",
  },
  Spanish: {
    title: "Contador de palabras y letras",
    language: "Idioma",
    placeholder: "Escribe tu texto aquí...",
    wordCount: "Recuento de palabras",
    letterCount: "Recuento de letras",
  },
};

const detectLanguage = (text) => {
  if (!text.trim()) return "English";

  const spanishPatterns = [
    /[áéíóúüñ¿¡]/,
    /\b(?:hola|adios|gracias|por|para|como|donde|cuando|porque|que|uno|una|los|las|es|son|este|esta|todos|buenos|buenas)\b/i,
  ];

  return spanishPatterns.some((pattern) => pattern.test(text)) ? "Spanish" : "English";
};

function ParentComponent() {
  const [language, setLanguage] = useState("English");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!text.trim()) return;
    setLanguage(detectLanguage(text));
  }, [text]);

  return (
    <LanguageContext.Provider value={language}>
      <div className="container">
        <label className="language-picker">
          <span>{language === "Spanish" ? "Idioma" : "Language"}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={language === "Spanish" ? "Idioma" : "Language"}
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
          </select>
        </label>
        <ChildComponent text={text} setText={setText} />
      </div>
    </LanguageContext.Provider>
  );
}

function ChildComponent({ text, setText }) {
  const language = useContext(LanguageContext);
  const labels = translations[language];

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const letterCount = text.replace(/\s/g, "").length;

  return (
    <>
      <h1>{labels.title}</h1>
      <textarea
        placeholder={labels.placeholder}
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={5}
        cols={50}
      />

      <p>{labels.wordCount}: {wordCount}</p>
      <p>{labels.letterCount}: {letterCount}</p>
    </>
  );
}

export default function App() {
  return <ParentComponent />;
}