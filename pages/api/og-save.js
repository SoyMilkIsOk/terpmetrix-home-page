import fs from "node:fs";
import path from "node:path";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

/**
 * Local dev-only helper to write the framed 1200x630 PNG directly to public/og-image.png.
 */
export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Save endpoint is disabled outside development mode." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { dataUrl } = req.body || {};
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/png;base64,")) {
    return res.status(400).json({ error: "Expected PNG dataUrl payload." });
  }

  try {
    const base64 = dataUrl.slice("data:image/png;base64,".length);
    const buf = Buffer.from(base64, "base64");
    const targetPath = path.join(process.cwd(), "public", "og-image.png");
    fs.writeFileSync(targetPath, buf);
    return res.status(200).json({ ok: true, bytes: buf.length, path: "public/og-image.png" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to write public/og-image.png" });
  }
}

