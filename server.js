import { bootstrap } from "global-agent";
import OpenAI from "openai";
import express from "express";
// 引用 global-agent 是为了解决 connection error的问题
process.env.GLOBAL_AGENT_HTTP_PROXY = "http://127.0.0.1:7890";
process.env.GLOBAL_AGENT_HTTPS_PROXY = "http://127.0.0.1:7890";

const apiKey = process.env.OPENAI_API_KEY;
const app = express();
const port = 3000;
app.use(express.json());
bootstrap();
const openai = new OpenAI({
  apiKey: apiKey,
});

app.post("/speech", async (req, res) => {
  try {
    const text = req.body.text ? req.body.text : "hello world";
    const voice = req.body.voice ? req.body.voice : "alloy";
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
