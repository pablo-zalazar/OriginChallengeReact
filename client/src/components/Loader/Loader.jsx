import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ loading, color = "#2479f8", size = "60px", text }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <ClipLoader color={color} loading={loading} cssOverride size={size} aria-label={text} />
      {text && <p>{text}</p>}
    </div>
  );
}
