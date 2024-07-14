import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { prompt, qr_code_content } = req.body;

  console.log(prompt);
  console.log(qr_code_content);

  if (!prompt || !qr_code_content) {
    return res.status(400).json({ error: "Prompt and QR code content are required" });
  }

  try {
    const output = await replicate.run(
      "nateraw/qrcode-stable-diffusion:9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
      {
        input: {
          prompt: prompt || "...",
          qr_code_content: qr_code_content || "",
        },
      }
    );
    res.status(200).json({ qr_code: output });
  } catch (error) {
    console.error("AI QR code generation failed:", error);
    res.status(500).json({ error: "AI QR code generation failed" });
  }
}
