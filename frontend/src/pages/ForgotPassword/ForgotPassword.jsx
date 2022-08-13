import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ForgotPassword.scss";
import FormOneForgot from "../../components/FormOneForgot/FormOneForgot";
import FormTwoForgot from "../../components/FormTwoForgot/FormTwoForgot";
import GoBack from "../../components/GoBack/GoBack";


const ForgotPassword = () => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [userID, setUSerID] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/all-user")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, [userID]);

  const handleCheckUSer = (Id, e) => {
    setUSerID(Id);
    setCheck(e);
  };

  const handleShow = () => {
    var form1 = document.querySelector(".container_forgotPassword_form1");
    var form2 = document.querySelector(".container_forgotPassword_form2");
    if (check === false) {

      form1.style.display = "none";
      form2.style.display = "block";
    } else {

      form1.style.display = "block";
      form2.style.display = "none";
    }
  };

  return (
    <div>
      <div className="container_forgotPassword">
        <div className="container_forgotPassword_form1">
          <FormOneForgot dataAccount={data} handleCheckUSer={handleCheckUSer} handleShow={handleShow} />
        </div>
        <div className="container_forgotPassword_form2">
          <FormTwoForgot userID={userID} />
        </div>
      </div>
      <GoBack/>
    </div>
  );
};

export default ForgotPassword;
