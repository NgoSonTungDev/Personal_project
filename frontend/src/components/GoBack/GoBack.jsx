import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoBack.scss";

const GoBack = () => {
    const navigation = useNavigate()
  return (
    <div>
      <div className="conponent_goback" onClick={()=>{navigation("/")}}>
        <i className="fa-solid fa-house-user"></i>
      </div>
    </div>
  );
};

export default GoBack;
