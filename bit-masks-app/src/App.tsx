import React, { useState } from "react";
import GmtData from "./GmtData";

const App: React.FC = () => {
  const [numberEntered, setNumberEntered] = useState<number>();
  const [result, setResult] = useState<Array<string> | string>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  function onClickHandler() {
    setResult([]);
    setErrorMessage("");
    const convertedNumber = convertToBinaryBit();
    compareValuesAndSetResult(convertedNumber);
  }

  function convertToBinaryBit() {
    if (numberEntered !== undefined && 1 <= numberEntered && numberEntered <= 12) {
      const tempNum = Number("0b0000000000000" + "1".padStart(numberEntered, "0").padEnd(12, "0"));
      return tempNum;
    } else if (numberEntered !== undefined && -12 <= numberEntered && numberEntered <= 0) {
      const tempNum = Number("0b" + "1".padStart(numberEntered + 12, "0").padEnd(24, "0"));
      return tempNum;
    } else {
      setErrorMessage("-12以上12以下の値を入力してください。");
      throw Error("-12以上12以下の値を入力してください。");
    }
  }

  function compareValuesAndSetResult(convertedNumber: number) {
    // convert
    const temporaryResults: Array<string> | string = [];
    GmtData.map((countryAndGmt) => {
      if ((countryAndGmt.twentyfourbinarybits & convertedNumber).toString(2) === convertedNumber?.toString(2)) {
        temporaryResults?.push(countryAndGmt.country);
      } else {
        console.log("不一致");
      }
    });

    // setResult
    if (temporaryResults.length === 0) {
      setResult("一致する国は存在しません。");
    } else {
      setResult(temporaryResults);
    }
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

      <div>{errorMessage}</div>
      <p>結果</p>
      {typeof result !== "string" ? (
        result.map((countryName) => {
          return <p>{countryName}</p>;
        })
      ) : (
        <p>{result}</p>
      )}

      <hr></hr>
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
