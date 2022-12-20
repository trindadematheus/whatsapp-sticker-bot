import { Client, Message } from "@open-wa/wa-automate";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function CreateStickerFromText(
  client: Client,
  message: Message
) {
  const { body, from, sender } = message;

  await client.sendText(
    from,
    `*${sender.pushname}*, sua figurinha está sendo criada, aguarde! 🤩`
  );

  try {
    const response = await openai.createImage({
      prompt: body.replace("!figtxt ", ""),
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    await client.sendImageAsSticker(
      from,
      `data:image/png;base64,${response.data.data[0].b64_json}`
    );
  } catch (error) {
    await client.sendText(
      from,
      `*${sender.pushname}*, houve um erro ao gerar sua figurinha, tente novamente.`
    );
  }
}
