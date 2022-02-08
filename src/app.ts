import { Client } from "@open-wa/wa-automate";

import CreateStickerFromImage from "./services/CreateStickerFromImage";
import CreateAnimatedStickerFromVideo from "./services/CreateAnimatedStickerFromVideo";

export default async function handleEvents(client: Client) {
  client.onAnyMessage(async (message) => {
    const { type, caption } = message;

    // Generate sticker from an image
    if (caption === "!fig" && type === "image") {
      await CreateStickerFromImage(client, message);
    }

    // Generate an animated sticker from a video
    if (caption === "!fig" && type === "video") {
      await CreateAnimatedStickerFromVideo(client, message);
    }
  });
}
