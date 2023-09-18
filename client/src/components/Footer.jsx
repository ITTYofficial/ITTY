import React from "react";
import footer from "../css/Footer.module.css";

const Footer = () => {
  return (
    <div className={footer.Wrap_footer}>
      <div>
        <div className={footer.Wrap_footer_left}>
          <div>
            <h4>ITTY</h4>
            <p>개발자들을 위한 정보공유 </p>
          </div>
          <div>
            <div>
              <h4>팀</h4>
              <ul>
                <li>최수환</li>
                <li>류상지</li>
                <li>김지홍</li>
                <li>허광영</li>
                <li>백진혁</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={footer.Wrap_footer_right}>
          <img src="https://i.ibb.co/tshV4tg/image.png" alt="FOOTER_LOGO" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
