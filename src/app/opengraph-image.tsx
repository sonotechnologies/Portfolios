import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "2px solid #FF5B04",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 600,
              color: "#EDEAE3",
            }}
          >
            S<span style={{ color: "#FF5B04" }}>.</span>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#7E8B93" }}>
            {siteConfig.brand.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1,
              color: "#EDEAE3",
            }}
          >
            <div>I build the part where</div>
            <div>the money changes hands.</div>
          </div>
          <div style={{ fontSize: 24, color: "#7E8B93", letterSpacing: 2 }}>
            {`${siteConfig.name.toUpperCase()} — WEB DEVELOPER & DESIGNER, LAGOS`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
