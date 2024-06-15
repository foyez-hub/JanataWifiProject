import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts";

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [selectedTradeCode, setSelectedTradeCode] = useState("");
  const [selectedView, setSelectedView] = useState("chart1");
  const [isInserting, setIsInserting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Number of rows per page


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/stocks/api/stocks/"
      );
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await axios.delete(
          `http://127.0.0.1:8000/stocks/api/stocks/${id}/delete/`
        );
        setStocks(stocks.filter((stock) => stock.id !== id));
      } catch (error) {
        console.error("Error deleting data:", error);
      } finally {
        setLoading(false);
      }
    },
    [stocks]
  );

  const handleEdit = (id) => {
    setEditableId(id);
  };

  const handleSave = useCallback(
    async (id, newData) => {
      for (const key in newData) {
        if (!newData[key]) {
          alert("All fields are required.");
          return;
        }
      }
      setLoading(true);
      try {
        await axios.put(
          `http://127.0.0.1:8000/stocks/api/stocks/${id}/update/`,
          newData
        );
        setStocks(
          stocks.map((stock) => (stock.id === id ? { ...newData, id } : stock))
        );
        setEditableId(null);
      } catch (error) {
        console.error("Error updating data:", error);
      } finally {
        setLoading(false);
      }
    },
    [stocks]
  );

  const handleInsertSave = useCallback(async () => {
    const newStock = {
      date: document.querySelector("#new-date").value,
      trade_code: document.querySelector("#new-trade-code").value,
      high: document.querySelector("#new-high").value,
      low: document.querySelector("#new-low").value,
      open: document.querySelector("#new-open").value,
      close: document.querySelector("#new-close").value,
      volume: document.querySelector("#new-volume").value,
    };

    if (Object.values(newStock).some((value) => value === "")) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/stocks/api/stocks/create/",
        newStock
      );
      setStocks([...stocks, response.data]);
      setIsInserting(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      setLoading(false);
    }
  }, [stocks]);

  const filteredData = useMemo(
    () => stocks.filter((stock) => stock.trade_code === selectedTradeCode),
    [stocks, selectedTradeCode]
  );

  const processedData = filteredData.map((stock) => ({
    ...stock,
    volume: Number(stock.volume),
  }));


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stocks.slice(indexOfFirstRow, indexOfLastRow);

  const renderChart = () => (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2 style={{ color: "#7F0909" }}>Chart of close</h2>
      <div
        style={{ display: "flex", justifyContent: "center", color: "#7F0909" }}
      >
        <ComposedChart width={800} height={400} data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="close"
            stroke="#7F0909"
          />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#7F0909" />
        </ComposedChart>
      </div>
    </div>
  );

  const renderChart2 = () => (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2 style={{ color: "#EEE117" }}>Chart of Low</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ComposedChart width={800} height={400} data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="low" stroke="#EEE117" />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#EEE117" />
        </ComposedChart>
      </div>
    </div>
  );
  const renderChart3 = () => (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2 style={{ color: "#000A90" }}>Chart of High</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ComposedChart width={800} height={400} data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="high"
            stroke="#000A90"
          />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#000A90" />
        </ComposedChart>
      </div>
    </div>
  );

  const renderChart4 = () => (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2 style={{ color: "#2A623D" }}>Chart of Open</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ComposedChart width={800} height={400} data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="open"
            stroke="#2A623D"
          />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#2A623D" />
        </ComposedChart>
      </div>
    </div>
  );

  const renderTable = () => (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ color: "black" }}>Table</h1>
      <button
        onClick={() => setIsInserting(true)}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Insert new row
      </button>
      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "80%",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Trade Code
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>High</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Low</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Open</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Close</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Volume
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isInserting && (
            <tr>
              <td>
                <input type="text" id="new-date" />
              </td>
              <td>
                <input type="text" id="new-trade-code" />
              </td>
              <td>
                <input type="text" id="new-high" />
              </td>
              <td>
                <input type="text" id="new-low" />
              </td>
              <td>
                <input type="text" id="new-open" />
              </td>
              <td>
                <input type="text" id="new-close" />
              </td>
              <td>
                <input type="text" id="new-volume" />
              </td>
              <td>
                <button
                  onClick={handleInsertSave}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
          )}
          {currentRows.map((stock) => (
            <tr key={stock.id}>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`date-${stock.id}`}
                    defaultValue={stock.date}
                  />
                ) : (
                  stock.date
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`trade-code-${stock.id}`}
                    defaultValue={stock.trade_code}
                  />
                ) : (
                  stock.trade_code
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`high-${stock.id}`}
                    defaultValue={stock.high}
                  />
                ) : (
                  stock.high
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`low-${stock.id}`}
                    defaultValue={stock.low}
                  />
                ) : (
                  stock.low
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`open-${stock.id}`}
                    defaultValue={stock.open}
                  />
                ) : (
                  stock.open
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`close-${stock.id}`}
                    defaultValue={stock.close}
                  />
                ) : (
                  stock.close
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <input
                    type="text"
                    id={`volume-${stock.id}`}
                    defaultValue={stock.volume}
                  />
                ) : (
                  stock.volume
                )}
              </td>
              <td>
                {editableId === stock.id ? (
                  <button
                    onClick={() =>
                      handleSave(stock.id, {
                        date: document.querySelector(`#date-${stock.id}`)
                          .value,
                        trade_code: document.querySelector(
                          `#trade-code-${stock.id}`
                        ).value,
                        high: document.querySelector(`#high-${stock.id}`)
                          .value,
                        low: document.querySelector(`#low-${stock.id}`).value,
                        open: document.querySelector(`#open-${stock.id}`)
                          .value,
                        close: document.querySelector(`#close-${stock.id}`)
                          .value,
                        volume: document.querySelector(`#volume-${stock.id}`)
                          .value,
                      })
                    }
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(stock.id)}
                    style={{
                      backgroundColor: "yellow",
                      color: "black",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(stock.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Wait for data to Load</p>}
      {/* Pagination controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            marginRight: "30px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastRow >= stocks.length}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
  

  return (
    <div>
      <h1  style={{textAlign:'center'}}>Data visualization</h1>

      <div style={{ textAlign: "center", margin: "20px" }}>
        <select
          onChange={(e) => setSelectedView(e.target.value)}
          value={selectedView}
          style={{
            padding: "10px",
            margin: "10px 0",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            width: "200px",
          }}
        >
          <option value="chart1">Chart of Close column</option>
          <option value="chart2">Chart of Low column</option>
          <option value="chart3">Chart of High column</option>
          <option value="chart4">Chart of Open column</option>
        </select>
      </div>

      <select
        onChange={(e) => setSelectedTradeCode(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px 0",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          width: "180px",
         
          marginLeft: "42%",
        }}
      >
        <option value="">Select Trade Code</option>
        {Array.from(new Set(stocks.map((stock) => stock.trade_code))).map(
          (code, index) => (
            <option key={index} value={code}>
              {code}
            </option>
          )
        )}
      </select>

      {selectedView === "chart1" && renderChart()}
      {selectedView === "chart2" && renderChart2()}
      {selectedView === "chart3" && renderChart3()}
      {selectedView === "chart4" && renderChart4()}
      <hr />
      {renderTable()}
    </div>
  );
};

export default App;
