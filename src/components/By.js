import React from "react";

const By = () => {
  const URL = "http://www.novo.ws";
  const LOGO = "Novo";
  return (
    <div className="text-muted">
      <p align="center" style={{ paddingTop: "60px", fontSize: "12px" }}>
        <i className="fas fa-circle fa-2x" />
        <br />
        Created by{" "}
        <a href={URL} style={{ color: "#777" }} target="_blank">
          {LOGO}
        </a>
      </p>
    </div>
  );
};

export default By;
