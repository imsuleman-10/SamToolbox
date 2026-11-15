import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ef4444, #e5322d, #b91c1c)",
          borderRadius: "36px",
          color: "white",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "96px",
          letterSpacing: "-4px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
