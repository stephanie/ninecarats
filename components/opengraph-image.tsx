import { readFile } from "fs/promises";
import { join } from "path";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<Response> {
  const imagePath = join(
    process.cwd(),
    "public",
    "images",
    "nine-carats-social-image2-notext.png"
  );
  const imageBuffer = await readFile(imagePath);

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
