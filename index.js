import express from "express";
import bodyParser from "body-parser";
import { GradioClient } from "gradio-client";
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/replit/completions", async (req, res) => {
  const { body } = req;
  console.log("sending prompt...");
  const client = new GradioClient(
    "wss://replit-replit-code-v1-3b-demo.hf.space"
  );
  const result = await client.request(
    0,
    body.prompt, // "Howdy!",	# str representing string value in 'Input' Code component
    128, // 8,	# int | float representing numeric value between 8 and 128 in 'Max Tokens' Slider component
    0.1, // 0.1,	# int | float representing numeric value between 0.1 and 2.5 in 'Temperature' Slider component
    0, // 0,	# int | float representing numeric value between 0 and 1000 in 'Random Seed' Slider component
    0.1, // 0.1,	# int | float representing numeric value between 0.1 and 1.0 in 'Top P' Slider component
    1, // 1,	# int | float representing numeric value between 1 and 64 in 'Top K' Slider component
    true, // true,	# bool representing boolean value in 'Use Cache' Checkbox component
    1 // 1,	# int | float representing numeric value between 1.0 and 1.9 in 'Repetition Penalty. 1.0 means no penalty.' Slider component
  );
  console.log("response received");
  res.json({
    choices: [{ text: result.join("").replace(body.prompt, "") }],
  });
});

app.listen(port, () => {
  console.log(`Replit copilot listening on port ${port}`);
});
