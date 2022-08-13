import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./PaymentManagements.scss";

const PaymentManagements = () => {
  const [data, setData] = useState([]);
  const array = data.map((item) => item.total);

  const sumArray = (mang) => {
    let sum = 0;
    mang.forEach(function (value) {
      console.log(value);
      sum += value;
    });
    return sum;
  };

  useEffect(() => {
    console.log(data.map((item) => item.total));
    axios
      .get(`http://localhost:5000/api/TotalOrder/GetAllToOrder`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="payment-managements-container">
        <div className="payment-managements-text">
          <h2>QUẢN LÝ THANH TOÁN</h2>
        </div>
        <div className="payment-managements-table">
          <table>
            <tr>
              <th>Tên Khách Hàng </th>
              <th>Tên Phim</th>
              <th>Giá Vé</th>
              <th>Số Lượng</th>
              <th>Tổng Tiền</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td>{item.nameAccount}</td>
                <td>{item.nameMovie}</td>
                <td style={{ textAlign: "center" }}>{item.price} VND</td>
                <td style={{ textAlign: "center" }}>{item.amount}</td>
                <td style={{ textAlign: "center", color: "#da251c" }}>
                  {item.total} VND
                </td>
              </tr>
            ))}
          </table>
        </div>

        <div className="total-payment-managements">
          <p>
            Tổng Doanh Thu : <span>{sumArray(array)}</span> VND
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagements;
