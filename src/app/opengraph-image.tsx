import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SamToolbox - 84+ Free Online PDF, Developer & Productivity Tools";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          backgroundImage: "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(229, 50, 45, 0.25) 0%, rgba(229, 50, 45, 0) 70%)",
          }}
        />

        {/* Top Header: Brand & Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #ef4444, #e5322d, #b91c1c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "30px",
                fontWeight: 900,
                boxShadow: "0 10px 25px -5px rgba(229, 50, 45, 0.5)",
              }}
            >
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 900, color: "white", letterSpacing: "-1px" }}>
                Sam<span style={{ color: "#ef4444" }}>Toolbox</span>
              </span>
              <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                Client-Side Sovereign Suite
              </span>
            </div>
          </div>

          {/* Privacy Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(229, 50, 45, 0.15)",
              border: "1px solid rgba(229, 50, 45, 0.35)",
              color: "#fca5a5",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
            100% In-Browser • Zero Server Uploads
          </div>
        </div>

        {/* Main Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "white",
              letterSpacing: "-2px",
              margin: 0,
            }}
          >
            Every tool you need to work with <span style={{ color: "#ef4444" }}>PDFs & Calculations</span> in one place.
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#cbd5e1",
              margin: 0,
              fontWeight: 500,
            }}
          >
            Merge, Split, Compress, Convert, Sign & Protect PDFs. Plus FBR Salary Tax, Aggregate Merit, Marla & Zakat Calculators with zero data tracking.
          </p>
        </div>

        {/* Bottom Feature Pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%" }}>
          {[
            "84+ Free Production Tools",
            "Merge & Compress PDF",
            "JSON, Base64 & Diff",
            "FBR Tax 2024-2026",
            "Time Zone & Unit Tools",
            "100% Private WebAssembly",
          ].map((pill) => (
            <div
              key={pill}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#e2e8f0",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
