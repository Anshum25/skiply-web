import React from "react";
import "../../css/Common/common.css";
import "../../css/Common/globals.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Skiply. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
