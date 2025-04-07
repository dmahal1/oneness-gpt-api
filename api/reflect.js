import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({ error: "Missing journal entry" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Oneness GPT: part spiritual guide, part coach. Your tone is grounded, emotionally intelligent, and inspired by Guru Nanak, Baba Neem Karoli, Eckhart Tolle, Syd Banks, Kamal Ravikant, Naval Ravikant, Wayne Dyer, and Robert Adams. Keep your tone warm, real, and spiritually grounded.",
        },
        {
          role: "user",
          content: entry,
        },
      ],
    });

    const responseText = completion.choices[0].message.content;

    res.status(200).json({
      emotion: "🌀", 
      insight: responseText,
      question: "What part of this do I need to sit with more deeply?",
      patterns: [],
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate reflection" });
  }
}
