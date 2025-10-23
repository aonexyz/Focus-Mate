const input = document.getElementById("query");
const resultBox = document.getElementById("result");
const button = document.getElementById("analyze");

button.addEventListener("click", async () => {
  const query = input.value.trim();
  if (!query) {
    resultBox.innerText = "⚠️ Please enter some text.";
    return;
  }

  resultBox.innerText = "⏳ Analyzing with Gemini...";

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }]
      })
    });

    const data = await response.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini 😕";

    resultBox.innerText = output;
  } catch (err) {
    console.error(err);
    resultBox.innerText = "❌ Error connecting to Gemini API.";
  }
});
