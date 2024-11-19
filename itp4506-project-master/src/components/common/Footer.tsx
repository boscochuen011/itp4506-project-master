import "./Footer.css";

export function Footer() {
  return (
    <div className="copyright-container">
      © {new Date().getFullYear()} Yummy Restaurant Group Limited
    </div>
  );
}
