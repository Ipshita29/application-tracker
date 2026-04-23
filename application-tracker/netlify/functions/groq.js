export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
Return ONLY valid JSON. No extra text.

Format:
{
  "company": "",
  "role": "",
  "location": "",
  "source": ""
}
`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    });

    const data = await res.json();

    // 🔥 Handle API errors properly
    if (!res.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: data?.error?.message || "Groq API failed",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        content: data.choices?.[0]?.message?.content || "",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "Server error",
      }),
    };
  }
}