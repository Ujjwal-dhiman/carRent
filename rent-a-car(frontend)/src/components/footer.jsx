import React from "react";

const date = new Date().getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright &copy;{date} Ujjwal Dhiman</p>
    </footer>
  );
}

export default Footer;
