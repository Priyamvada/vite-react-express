import type { CSSProperties } from "react";
import { FontSize } from "../../assets";

export const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  animation: "fadeIn 0.25s ease-out",
};

export const modalStyle: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  width: "100%",
  maxWidth: "640px",
  padding: "10px",
  paddingBottom: "20px",
  position: "relative",
  animation: "slideUp 0.25s ease-out",
};

export const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const titleStyle: CSSProperties = {
  fontSize: FontSize.large,
  fontWeight: 600,
  color: "#222",
  paddingLeft: "10px",
};

export const closeButtonStyle: CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "20px",
  color: "#555",
  cursor: "pointer",
};

export const footerStyle: CSSProperties = {
  marginTop: "16px",
  textAlign: "right",
};

export const cancelButtonStyle: CSSProperties = {
  background: "none",
  border: "none",
  color: "#666",
  fontSize: "14px",
  cursor: "pointer",
};

export const keyframes = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;