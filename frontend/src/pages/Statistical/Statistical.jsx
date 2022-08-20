import React, { useEffect, useState } from "react";
import "./Statistical.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import LoginHome from "../../components/Login/Login";
import MuiAlert from "@mui/material/Alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  AreaChart,
  Area,
  Line,
} from "recharts";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const data = [
  { name: "Page A", uv: 389, pv: 728, amt: 634 },
  { name: "Page B", uv: 730, pv: 344, amt: 526 },
  { name: "Page C", uv: 489, pv: 234, amt: 655 },
  { name: "Page D", uv: 290, pv: 556, amt: 867 },
  { name: "Page E", uv: 456, pv: 897, amt: 936 },
  { name: "Page F", uv: 478, pv: 784, amt: 758 },
];

const data2 = [
  { name: "Page A", uv: 110.2, pv: 523.32, amt: 690 },
  { name: "Page B", uv: 553.5, pv: 325.0, amt: 387 },
  { name: "Page C", uv: 404.3, pv: 735.3, amt: 908 },
  { name: "Page D", uv: 721.3, pv: 355.6, amt: 532 },
  { name: "Page E", uv: 523.3, pv: 778.9, amt: 478 },
  { name: "Page F", uv: 302.9, pv: 590.8, amt: 932 },
];

const Statistical = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const location = useLocation();
  const [open, setOpen] = useState(false);

  var input = document.querySelector(".container_Statistical_input_content");
  var container_Statistican_content = document.querySelector(
    ".container_Statistican_content"
  );
  var loader = document.querySelector(".container_Statistical_loader");
  var container_tong = document.querySelector(".container_Statistical_input");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePrint = () => {
    var loadingThonKe = document.querySelector("#loadingThonKe");
    container_tong.style.display = "block";
    loader.style.marginTop = "25%";
    loader.style.marginLeft = "50%";
    loader.style.transform = "translate(-50%,-50%)";
    setTimeout(() => {
      loadingThonKe.innerHTML = "Xuất Thành công !!!";
    }, 1000);
    setTimeout(() => {
      container_tong.style.display = "none";
      loadingThonKe.innerHTML = "Đang xuất thống kê !!!";
    }, 2500);
  };

  const handleOnClickSubMit = () => {
    if (date1 === "" || date2 === "") {
      handleClick();
    } else {
      loader.style.display = "block";
      input.style.display = "none";
      setTimeout(() => {
        container_tong.style.display = "none";
        container_Statistican_content.style.height = "100vh";
      }, 1000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container_Statistical">
        <div className="container_Statistical_input">
          <div className="container_Statistical_input_content">
            <p>Bạn muốn xem báo cáo từ khoản thời gian nào</p>
            <div className="container_Statistical_input_content_1">
              <div className="container_Statistical_input_content_1_1">
                <label htmlFor=""> Từ ngày :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={date1}
                  onChange={(e) => {
                    setDate1(e.target.value);
                  }}
                />
              </div>
              <div className="container_Statistical_input_content_1_1">
                <label htmlFor=""> đến ngày :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={date2}
                  onChange={(e) => {
                    setDate2(e.target.value);
                  }}
                />
              </div>
            </div>
            <button onClick={handleOnClickSubMit}>Submit</button>
          </div>
          <div className="container_Statistical_loader">
            <span class="loader"></span>
            <p id="loadingThonKe">Loading....</p>
          </div>
        </div>

        <div className="container_Statistican_content">
          <div className="container_Statistican_content_text">
            <p>
              Báo cáo thống kê : (Từ : "{date1}" Đến : "{date2}")
            </p>
            <button onClick={handlePrint}>Xuất Báo Cáo</button>
          </div>
          <div className="container_Statistican_content_recharts">
            <div className="container_Statistican_content_recharts_1">
              <div className="container_Statistican_content_recharts_1_1">
                <p>
                  {" "}
                  <i class="bx bxl-audible"></i> Tỉ Lệ Truy Cập Trang Web
                </p>
                <BarChart
                  className="BarChart_cont"
                  width={600}
                  height={350}
                  data={data}
                >
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip
                    wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                  />
                  <Legend
                    width={70}
                    wrapperStyle={{
                      top: 20,
                      right: 20,
                      backgroundColor: "transparent",
                      border: "1px solid #d5d5d5",
                      borderRadius: 3,
                      lineHeight: "30px",
                    }}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                  <Bar dataKey="uv" fill="#8884d8" barSize={25} />
                  <Bar dataKey="pv" fill="#0984e3" barSize={25} />
                  <Bar dataKey="pv" fill="#2ecc71" barSize={25} />
                </BarChart>
              </div>
              <div className="container_Statistican_content_recharts_1_1">
                <p>
                  {" "}
                  <i class="bx bxl-audible"></i> Tỉ Lệ Đặt Vé
                </p>
                <LineChart
                  className="LineChart_box"
                  width={600}
                  height={290}
                  data={data2}
                >
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pv" stroke="#0984e3" />
                  <Line type="monotone" dataKey="amt" stroke="#d63031" />

                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </div>
            </div>
            <div className="container_Statistican_content_recharts_2">
              <p>
                {" "}
                <i class="bx bx-money-withdraw"></i> Doanh thu{" "}
              </p>
              <AreaChart
                className="AreaChart"
                width={1320}
                height={280}
                data={data2}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>

      <Stack spacing={10} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Yêu cầu nhập đầy đủ dử liệu
          </Alert>
        </Snackbar>
      </Stack>
      <LoginHome />

    </div>
  );
};

export default Statistical;
