export async function extractIntel(jobDescription) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GROQ_API_KEY is missing from environment variables.");
  }

  const systemPrompt = `You are an AI assistant that extracts structured information from job descriptions.
Your response MUST be ONLY a valid JSON object matching this exact schema:
{
  "company": "string (company name, or empty string)",
  "role": "string (job title, or empty string)",
  "location": "string (location, or empty string)",
  "deadline": "string (application deadline if found, or empty string)",
  "source": "string (where the job was posted, or empty string)"
}
Do not include any other text, markdown formatting, or explanations.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Extract details from this job description:\n\n${jobDescription}` }
        ],
        temperature: 0.1, // low temp for deterministic JSON
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch from Groq API");
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    // Clean potential markdown formatting (e.g. ```json ... ```)
    const cleanedContent = content.replace(/^```json/i, "").replace(/```$/, "").trim();

    const parsedData = JSON.parse(cleanedContent);

    return {
      company: parsedData.company || "",
      role: parsedData.role || "",
      location: parsedData.location || "",
      deadline: parsedData.deadline || "",
      source: parsedData.source || "",
    };
  } catch (error) {
    console.error("Error extracting intel:", error);
    throw error;
  }
}
