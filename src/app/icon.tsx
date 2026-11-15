import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "8px",
          color: "white",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "18px",
          letterSpacing: "-1px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
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
