import React from "react";
import footer from "../css/Footer.module.css";

const Footer = () => {
  return (
    <div className={footer.Wrap_footer}>
      <div>
        <div className={footer.Wrap_footer_left}>
          <img src="https://i.ibb.co/tshV4tg/image.png" alt="FOOTER_LOGO" />
        </div>
        <div className={footer.Wrap_footer_right}></div>
      </div>
    </div>
  );
};

export default Footer;
