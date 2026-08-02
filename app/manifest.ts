import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Tech Alchemy Lab",
    short_name: "Tech Alchemy",
    description: "Digital systems forged for ambitious African businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#070806",
    theme_color: "#070806",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
