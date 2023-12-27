import React, { useEffect, useState } from "react";
import GmtData from "./GmtData";

type binaryGmtDataListType = {
  id: number;
  country: string;
  gmtInBinary: string;
  isPlus: boolean;
};

const App: React.FC = () => {
  const [binaryGmtDataList, setBinaryGmtDataList] = useState<Array<binaryGmtDataListType>>();
  const [result, setResult] = useState<string>();

  useEffect(() => {
    convertGmtDataList();
    // これだとうごかない
  }, []);

  function onClickHandler() {
    // 入力された数字を2進数に変換する
    // GtmDataの2進数化された値と入力された2進数を比較する
    // 結果を出力する
  }

  function convertGmtDataList() {
    const binaryGmtDataResult: Array<binaryGmtDataListType> = [];
    let isPlus: boolean;

    GmtData.map((countryAndGmt) => {
      if (countryAndGmt.gmt > 0) {
        isPlus = true;
      } else {
        isPlus = false;
      }

      let convertedData = {
        id: countryAndGmt.id,
        country: countryAndGmt.country,
        gmtInBinary: countryAndGmt.gmt.toString(2).padStart(5, "0"),
        isPlus: isPlus,
      };
      binaryGmtDataResult.push(convertedData);
    });

    setBinaryGmtDataList(binaryGmtDataResult);
    console.log(binaryGmtDataList);
  }
  return (
    <div className="App">
      <input type="number"></input>
      <button
        onClick={() => {
          onClickHandler();
        }}
      >
        都市の検索
      </button>
      <div>{result}</div>
      {/* 0から入力した値と一致するGMTの都市を出力することにする */}
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

// リストの数字を2進数に変換する;
// 入力された値を2進数に変換する;
// リストの数字を2進数に変換したものの集まりから、AND検索で入力された値の2進数を比較、、、？
