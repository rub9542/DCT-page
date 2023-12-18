import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { addItem } from "./Components/redux/actions";
import DragAndDropList from "./Components/DragList";

function App() {
  const items = useSelector((state:any) => state.content.items);
  const dispatch = useDispatch();
  const upgradeData = (data:any) => {
    let data1:any = [];
    data.map((element:any, index:number) => {
      let newEle = { ...element, id: `${index + 1}`, complete: false };
      data1 = [...data1, newEle];
    });
    return data1;
  };
  const getData = () => {
    const apiUrl = "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addItem(upgradeData(data)));
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("chnaged in app", items);
  }, [items]);
  return (
    <div className="App">
    <DragAndDropList/>
    </div>
  );
}

export default App;
