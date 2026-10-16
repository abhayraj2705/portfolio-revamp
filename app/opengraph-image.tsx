import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}: Full-stack engineer, Pune`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0908",
          color: "#f1ece4",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8f897f", letterSpacing: 3 }}>
          <span>FULL-STACK ENGINEER · AI SYSTEMS</span>
          <span>PUNE, IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>
          <span>I build products</span>
          <span style={{ color: "#ff6a2b", fontStyle: "italic" }}>people actually use.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
          <span>{profile.name}</span>
          <div style={{ width: 360, height: 6, background: "#ff6a2b" }} />
        </div>
      </div>
    ),
    size,
  );
}
