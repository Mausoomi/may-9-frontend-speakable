import React from "react";
import { Link } from "react-router-dom/dist";
import { useTranslation } from "react-i18next";

const Foot = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="footer_main_div col-md-12 col-sm-12" id="Foot">
      <div className="footer_main_box">
        <div className="footer_main_box_col_1">
          <h2>Headquarter</h2>
          <p>Aleja Jana Pawła II 61C/102, 15-704 Białystok ,Polska</p>
          <div className="footer_main_box_col_1_links_div">
            <Link className="footer_main_box_col_1_link">
              <i className="bi bi-twitter"></i>
            </Link>
            <Link className="footer_main_box_col_1_link">
              <i className="bi bi-twitter"></i>
            </Link>
            <Link className="footer_main_box_col_1_link">
              <i className="bi bi-twitter"></i>
            </Link>
          </div>
          {/* <p>Copyright © 2018 Company</p>
          <p>Design: Template Mo</p>
          <p>Distribution: ThemeWagon</p> */}
        </div>
        <div className="footer_main_box_col_2">
          <h2>{t("Foot.Contactinfo")}</h2>
          <p>+48727710433</p>
          <p>kontakt@speakable.online</p>
          <h2>Quick Links</h2>
          <div className="footer_main_box_col_2_lower_links_div">
            <Link className="footer_main_box_col_2_lower_links">Career</Link>
            <Link className="footer_main_box_col_2_lower_links">Investor</Link>
            <Link className="footer_main_box_col_2_lower_links">
              Terms & Conditions
            </Link>
            <Link className="footer_main_box_col_2_lower_links">
              Refund Policy
            </Link>
          </div>
        </div>
        <div className="footer_main_box_col_3">
          <h2>{t("Foot.Receivenews!")}</h2>
          <input
            className="footer_main_box_col_3_input mt-3"
            placeholder={t("Foot.Enteryouremail")}
          />
          <button className="btn btn-outline-light p-2 rounded-5 mt-4 w-75">
            {t("Foot.Sendme")}
          </button>
          <p style={{ fontSize: "10px" }} className="mt-3">
            {t("Foot.footerspam")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Foot;
