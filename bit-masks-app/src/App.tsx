import React, { useState } from "react";
import GmtData from "./GmtData";

const App: React.FC = () => {
  const [numberEntered, setNumberEntered] = useState<number>();
  const [convertedNumber, setConvertedNumber] = useState<number>();
  const [result, setResult] = useState<Array<string>>([""]);

  function onClickHandler() {
    setResult([]);
    convertToBinaryBit();
    compareValuesAndSetResult();
  }

  function convertToBinaryBit() {
    if (numberEntered) {
      setConvertedNumber(Number("0b" + "1".padStart(numberEntered + 12, "0").padEnd(24, "0")));
    }
  }

  function compareValuesAndSetResult() {
    const temporaryResults = [""];
    if (convertedNumber) {
      GmtData.map((countryAndGmt) => {
        if ((countryAndGmt.twentyfourbinarybits & convertedNumber).toString(2) === convertedNumber?.toString(2)) {
          temporaryResults?.push(countryAndGmt.country);
        } else {
          console.log("不一致");
        }
      });
    }
    setResult(temporaryResults);
  }

  return (
    <div className="App">
      <input
        type="number"
        onChange={(e) => {
          setNumberEntered(Number(e.target.value));
        }}
      ></input>
      <button
        onClick={() => {
          onClickHandler();
        }}
      >
        都市の検索
      </button>
      <div>{result}</div>
      {GmtData.map((countryAndGmt) => {
        return (
          <p>
            <input type="checkbox"></input>
            {countryAndGmt.country} {countryAndGmt.gmt}
          </p>
        );
      })}
    </div>
  );
};

export default App;
