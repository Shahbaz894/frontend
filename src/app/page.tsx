import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-content/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.output);
      } else {
        alert(`Error: ${data.detail}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Content Generator</h1>
        <input
          type="text"
          className="border rounded p-2 w-full mb-4"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 w-full"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
        {output && (
          <div className="mt-4 bg-gray-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Generated Content:</h2>
            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
