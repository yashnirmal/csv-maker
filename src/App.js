import './App.css';
import React, { useEffect, useState } from "react";


export default function App() {

  const [tableHeader,setTableHeader]= useState(["Roll Number","Name","Marks"]);
  const [tableData,setTableData] = useState([[1,"Ram",92],[2,"Shyam",99]]);
  const [change,setChange]=useState(0);

  function addNewHeader(){
    setTableHeader([...tableHeader,document.querySelector('.new-header-adder input').value]);
    refreshTables();
  }

  function addNewRow(){
    let maxLength = findMaxLength();
    refreshTables();
    setTableData([...tableData,Array(maxLength).fill("")])
  }

  function findMaxLength(){
    let maxLength = tableHeader.length;
    tableData.forEach((el, index) => {
      if (maxLength < el.length) {
        maxLength = el.length;
      }
    });
    return maxLength;
  }

  function refreshTables(){
    let newTableData = tableData;
    newTableData.forEach((el,index)=>{
      for(let i=findMaxLength()-el.length;i>0;i--){
        el.push("");
      }
    })
    setTableData(newTableData);
    setChange(change+1);
  }

  function downloadCSV(){

    let csv = tableHeader.join(',');
    csv+="\n";

    tableData.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);



    //display the created CSV data on the web browser
    // document.write(csv);

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = "csv file.csv";
    hiddenElement.click();  
  }


  return (
    <div className="App">
      <h2>CSV Maker</h2>

      <div className="new-header-adder">
        <input type="text" placeholder="Enter New Header Title" />
        <br />
        <button onClick={addNewHeader}>Add New Column Header</button>
      </div>

      <div className="table-container">
        <table>
          <tr>
            {tableHeader.map((el, index) => (
              <th>
                <input type="text" value={el} style={{fontWeight:"bold"}} onChange={(e)=>{
                    let newTableHeader = tableHeader;
                    newTableHeader[index] = e.target.value;
                    setTableHeader(newTableHeader);
                    setChange(change+1);   // to forcefully re-render the component
                  }}/>
              </th>
            ))}
          </tr>

          {tableData.map((arr, superindex) => (
            <tr>
              {arr.map((el, index) => (
                <td>
                  <input type="text" value={el} onChange={(e)=>{
                    let newTableData = tableData;
                    console.table(newTableData);
                    newTableData[superindex][index] = e.target.value;
                    console.table(newTableData);
                    setTableData(newTableData);
                    setChange(change+1);   // to forcefully re-render the component
                  }}/>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>

      <div>
        <button onClick={addNewRow}>Add New Row</button>
      </div>

      <div>
        <button onClick={downloadCSV}>Download CSV file</button>
      </div>
    </div>
  );
}
