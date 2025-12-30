import React from "react";

export default function Footer() {
  return (
    <footer className="footer-custom text-light py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <span>Created by Julito</span>
        <a
          href="https://github.com/jjulito"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-light btn-sm"
        >
          <i className="fab fa-github me-1"></i> GitHub
        </a>
      </div>
    </footer>
  );
}