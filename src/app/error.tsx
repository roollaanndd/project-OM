"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[OMDC Error Boundary]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FCE7F3, #FBCFE8, #FCE7F3)",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          background: "white",
          borderRadius: "1.5rem",
          padding: "2rem",
          textAlign: "center",
          boxShadow: "0 18px 40px -12px rgba(219,39,119,0.25)",
          border: "1px solid #FBCFE8",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, #FBBF24, #EC4899)",
            color: "white",
            fontSize: "2rem",
            marginBottom: "1.25rem",
          }}
        >
          ⚠️
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#831843",
            margin: 0,
          }}
        >
          Oops! Ada yang salah
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "rgba(131,24,67,0.65)",
          }}
        >
          Maaf, terjadi kesalahan tak terduga. Coba muat ulang halaman, atau
          kembali ke beranda.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              background: "#FDF2F8",
              borderRadius: "0.75rem",
              fontSize: "0.75rem",
              textAlign: "left",
              color: "rgba(131,24,67,0.7)",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {error.message}
            {error.digest ? `\nDigest: ${error.digest}` : ""}
          </pre>
        )}

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={reset}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "9999px",
              border: "none",
              background: "linear-gradient(to right, #DB2777, #F43F5E)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🔄 Coba Lagi
          </button>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "9999px",
              border: "1px solid #FBCFE8",
              background: "white",
              color: "#DB2777",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🏠 Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
