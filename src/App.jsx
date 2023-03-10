import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("엘프");
  const [price, setprice] = useState("ELF");
  const [won, setwon] = useState("KRW");
  const [askPrice, setaskPrice] = useState("174"); 
  const [bidPrice, setbidPrice] = useState("186");
  const [maxPrice, setmaxPrice] = useState("100000");
  const [isLong, setIsLong] = useState(true); 
  const [numsLoc, setNumsLoc] = useState([0, 0, 0]);
  const [numLocLR, setNumLocLR] = useState(0);
  const [leverage, setLeverage] = useState(1); //eslint-disable-line no-unused-vars
  const [result, setResult] = useState(
    ((bidPrice / askPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  useEffect(() => {
    const calculated = (
      (bidPrice / askPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [askPrice, bidPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      askPrice +
      "-" +
      bidPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR + 1);
  }
  function right() {
    setNumLocLR(numLocLR - 1);
  }


  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인이름 &nbsp;
        <input value={price} onChange={(e) =>setprice(e.target.value)} />
      </span>
    &nbsp;&nbsp;&nbsp;&nbsp;
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={maxPrice}
          onChange={(e) => setmaxPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={bidPrice}
          onChange={(e) => setbidPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        평균단가 &nbsp;
        <input
          value={askPrice}
          onChange={(e) => setaskPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <button onClick={up}>보유수량 숫자 위로</button>
      <br />
      <br />
      <button onClick={left}>보유수량 숫자 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>보유수량 숫자 우로</button>
      <br />
      <br />
      <button onClick={down}>보유수량 숫자 아래로</button>
      <br />
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "419px",
          width: "916px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: "27px",
              top: "29px",
              fontSize:"32.5px",
              color: "rgb(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "600",

            }}
          >
            {coin}
          </div>

                    <div
            style={{
              position: "absolute",
              right: numLocLR + 556 + "px",
              top: numsLoc[1] + 174 + "px",
              fontSize: "35.5px",
              color: "rgb(211,212,214",
              fontFamily: "Roboto_Regular",
              fontWeight: "500",

            }}
          >
            {(Number(maxPrice/askPrice - (maxPrice/askPrice*0.0005)).toFixed(6)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} 
           </div>          
                    <div
            style={{
              position: "absolute",
              right: "120px",
              top: "174px",
              fontSize: "35.5px",
              color: "rgb(211,212,214)",
              fontFamily: "Roboto_Regular",
              fontWeight: "500",

            }}
          >
            {askPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
         
                <div
            style={{
              position: "absolute",
              left: "27px",
              top: "72px",
              fontSize: "33.5px",
              color: "RGB(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "700",

            }}
          >
            ({price})
          </div>
          
          <div
            style={{
              position: "absolute",
              right: "494px",
              top: "176px",
              fontSize: "35px",
              color: "rgb(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "1000",

            }}
          >
            {price}
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              top: "176px",
              fontSize: "35px",
              color: "rgb(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "1000",

            }}
          >
            {won}
          </div>
          <div
            style={{
              position: "absolute",
              right: "496px",
              top: "295px",
              fontSize: "35px",
              color: "rgb(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "1000",

            }}
          >
            {won}
          </div>
                   <div
            style={{
              position: "absolute",
              right: "16px",
              top: "295px",
              fontSize: "35px",
              color: "rgb(211,212,214)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "1000",

            }}
          >
            {won}
          </div>
          <div
            style={{
              position: "absolute",
              right: "603px",
              top: "293px",
              fontSize: "35.5px",
              color: "rgb(211,212,214)",
              fontFamily: "Roboto_Regular",
              fontWeight: "500",

            }}
          >
           {(Number((((maxPrice/askPrice)-(maxPrice/askPrice)*0.0005)*bidPrice) -(maxPrice/askPrice)*bidPrice*0.0005).toFixed(0)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              right: "120px",
              top: "293px",
              fontSize: "35.5px",
              color: "rgb(211,212,214)",
              fontFamily: "Roboto_Regular",
              fontWeight: "500",

            }}
          >
           {maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              top: "16px",
              fontSize: "35.5px",
              color: "rgb(208,69,42)",
              fontFamily: "Roboto_Regular",
              fontWeight: "500",

            }}
          >
            {(Number(((((maxPrice/askPrice)-(maxPrice/askPrice)*0.0005)*bidPrice) -(maxPrice/askPrice)*bidPrice*0.0005)-maxPrice).toFixed(0)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                right: "16px",
                top: "69px",
                fontSize: "35.5px",
                color: "rgb(208,69,42)",
                fontFamily: "Roboto_Regular",
                fontWeight: "500",

              }}
            >
              {result}%

            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
