import { ImageResponse } from "next/og";

import { SITE_URL } from "@/lib/site";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  const siteLabel = SITE_URL.replace(/^https?:\/\//, "").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#070806",
          color: "#f4f0e5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(0,245,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(181,72,255,.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(115deg, black, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -70,
            top: -110,
            width: 580,
            height: 580,
            display: "flex",
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(181,72,255,.2), rgba(0,245,255,.08) 42%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "68px 76px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 72,
                  height: 72,
                  border: "2px solid #00f5ff",
                  borderRadius: 999,
                  background: "rgba(0,245,255,.04)",
                }}
              >
                <svg width="48" height="48" viewBox="0 0 40 40">
                  <path d="M20 3.5S33 17 33 25a13 13 0 0 1-26 0C7 17 20 3.5 20 3.5Z" fill="rgba(0,245,255,.04)" stroke="#00f5ff" strokeWidth="1.6" />
                  <path d="M13.5 24h13M20 15v18" fill="none" stroke="#b548ff" strokeWidth="1.6" />
                  <circle cx="20" cy="24" r="2.8" fill="#ffd978" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", fontWeight: 800, fontSize: 24, letterSpacing: 1 }}>
                <span>THE TECH ALCHEMY</span>
                <span style={{ color: "#00f5ff", fontSize: 15, letterSpacing: 8 }}>LAB</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#80dca5", fontFamily: "monospace", fontSize: 14, letterSpacing: 2 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#58e08d" }} />
              JOHANNESBURG / ZA
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 910 }}>
            <span style={{ color: "#e8b84c", fontFamily: "monospace", fontSize: 17, letterSpacing: 4 }}>DIGITAL SYSTEMS FORGED WITH INTENT</span>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 82, fontWeight: 900, letterSpacing: -6, lineHeight: .88 }}>
              <span>TURNING CODE INTO</span>
              <span style={{ color: "#00f5ff" }}>DIGITAL <span style={{ color: "#b548ff" }}>GOLD.</span></span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.14)", color: "#9b9d94", fontFamily: "monospace", fontSize: 14, letterSpacing: 2 }}>
            <span>NEXT.JS / TYPESCRIPT / POSTGRESQL</span>
            <span style={{ color: "#ffd978" }}>{siteLabel}</span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
