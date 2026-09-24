import React from "react";

const dotStyle = (top, left, opacity) => ({
  width: 5.6,
  height: 5.6,
  left,
  top,
  position: "absolute",
  opacity,
  background: "#FFDD00",
  borderRadius: 9999,
});

const LoadingOverlay = ({ visible, text = "Loading" }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 30,
          paddingBottom: 30,
          background: "rgba(0,0,0,0.85)",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          width: 400,
        }}
      >
        <div
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div className="wu-loading-spinner" style={{ width: 14, height: 14, position: "relative" }}>
            <div style={dotStyle(0, 14, 0.5)} />
            <div style={dotStyle(0, 5.6, 1)} />
            <div style={dotStyle(8.4, 14, 0.3)} />
            <div style={dotStyle(8.4, 5.6, 0.6)} />
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              lineHeight: "20.8px",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
