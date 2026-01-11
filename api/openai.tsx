// server/analyze.ts
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Load your API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// POST /api/analyze
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'No text provided' });

    // Example: call GPT for sentiment and themes
    const prompt = `
      Analyze the following journal entry and return a JSON object
      with keys: sentiment (0-1), themes (array of up to 3 strings),
      and an emoji keyword that represents the mood.

      Entry: """${text}"""
    `;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }]
    });

    const raw = completion.data.choices[0].message?.content || '{}';
    
    // Try parsing AI output as JSON
    let aiOutput;
    try {
      aiOutput = JSON.parse(raw);
    } catch {
      aiOutput = {
        sentiment: 0.75,
        themes: [],
        emoji: null
      };
    }

    // Return AI output
    res.json(aiOutput);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
});
