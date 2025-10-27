import { useState, useEffect } from "react";
import React from "react";
import "prismjs/themes/prism-tomorrow.css"; // Keep for react-simple-code-editor
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // For markdown code blocks
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "prismjs/components/prism-clike"; 
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp"; 
import "prismjs/components/prism-java";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-400 text-center p-4">
          Something went wrong while rendering the review. Please try again or reload the page.
        </div>
      );
    }
    return this.props.children;
  }
}

function Review() {
  const navigate = useNavigate();
  // Keeping the default code input as provided by the user
  const [code, setCode] = useState(`def sum(): \n \treturn a + b \n`);
  const [reviewResult, setReviewResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    setLoading(true);
    setReviewResult(""); 
    try {
  const response = await axios.post("https://debuglysever.onrender.com/ai/get-review/", { code, language });
      setReviewResult(response.data);
    } catch (error) {
      setReviewResult("**Error:** Failed to fetch review from API. Check the console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Define languages for the input editor (Updated)
  const languageOptions = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
  ];

  return (
    <ErrorBoundary>
    <div className="flex flex-col  min-h-screen bg-zinc-950 text-gray-100 p-6 font-sans">
      {/* Header - Stays centered above the grid */}
      <header className=" cursor-pointer w-full pl-5 py-5 mb-8 text-4xl font-extrabold  bg-zinc-900 rounded-xl shadow-2xl" onClick={() => {navigate("/")}}>
        DebugLY
      </header>

      {/* Main Content Grid (Two Columns on Desktop) */}
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Input & Control Panel === */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-200 border-b border-zinc-700 pb-2">Submit Code for Review</h2>
          
          {/* Language Selector & Clear Button (Uses flex for horizontal alignment only) */}
          <div className="mb-4 flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition duration-200 ease-in-out"
            >
              {languageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCode("")}
              className="text-gray-400 hover:text-red-400 transition duration-200 ease-in-out text-sm"
            >
              Clear
            </button>
          </div>

          {/* Code Editor */}
          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-black font-mono text-sm shadow-inner">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(newCode) => Prism.highlight(newCode, Prism.languages[language] || Prism.languages.markup, language)}
              padding={15}
              style={{
                minHeight: "300px", // Maintains size without flex-grow
                lineHeight: "1.5",
                tabSize: 4,
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            />
          </div>

          {/* Review Button */}
          <button
            onClick={reviewCode}
            disabled={loading}
            className={`w-full mt-6 py-3 px-6 text-lg font-semibold  rounded-lg shadow-lg transform transition duration-300 ease-in-out
              ${loading
                ? 'bg-gray-50 text-black opacity-70 cursor-not-allowed animate-pulse'
                : 'bg-gray-50 text-black  hover:shadow-xl'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Code...
              </span>
            ) : (
              'Review Code ✨'
            )}
          </button>
        </div>

        {/* === RIGHT COLUMN: Review Results === */}
        <div className="bg-zinc-900  p-6 rounded-xl shadow-lg border border-zinc-800 min-h-[460px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-xl text-blue-400 animate-pulse">
              <svg className="animate-spin h-8 w-8 text-blue-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing code and generating review...
            </div>
          ) : reviewResult ? (
            <Markdown rehypePlugins={[rehypeHighlight]} className="prose prose-invert max-w-none">{reviewResult}</Markdown>
          ) : (
            <div className="flex items-center justify-center h-full text-lg text-gray-500 text-center p-4">
              The AI review summary and improved code will appear here after analysis.
              <br />
              (Click "Review Code" to run the analysis.)
            </div>
          )}
        </div>
      </div>
  </div>
  </ErrorBoundary>
  );
}

export default Review;
