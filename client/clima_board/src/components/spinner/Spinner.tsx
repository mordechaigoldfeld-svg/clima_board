import "./Spinner.css";

type SpinnerProps = {
  text?: string;
};

export default function Spinner({ text = "loading..." }: SpinnerProps) {
  return (
    <div className="spinner-container">
      <div className="spinner-circle" />
      <p className="spinner-text">{text}</p>
    </div>
  );
}