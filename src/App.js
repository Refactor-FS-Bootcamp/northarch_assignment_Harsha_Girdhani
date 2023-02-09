import "./App.css";
import { useState } from "react";
import Papa from "papaparse";


function App() {

  const [parsedData, setParsedData] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        console.log(results.data)

        setParsedData(results.data);

        setTableRows(rowsArray[0]);


        setValues(valuesArray);

      },
    });
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />

      <table style={{ fontFamily: "Arial, Helvetica, sans-serif;", borderCollapse: "collapse", width: "100%" }}>
        <tr >
          {tableRows.map((rows, index) => {
            return <th style={{
              border: "1px solid #ddd",
              padding: "8px",
              paddingTop: "12px",
              paddingBottom: "12px",
              textAlign: "left",
              backgroundColor: "#04AA6D",
              color: "white"
            }} key={index}>{rows}</th>;
          })}
        </tr>
        {values.map((value, index) => {
          return (
            <tr key={index}>
              {value.map((val, i) => {
                return <td style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                }} key={i}>{val}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;