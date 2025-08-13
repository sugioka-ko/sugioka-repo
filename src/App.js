import React, { useState } from 'react';

function App() {
  const [sumResult, setSumResult] = useState(null);
  const [productResult, setProductResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(5);

  const API_URL = 'https://0vsbyqtymc.execute-api.ap-northeast-1.amazonaws.com/v1'; // ★ここにURLを貼り付け

  const fetchCalculations = async () => {
    setLoading(true);
    setError(null);
    try {
      const dataToSend = {
        num1: Number(num1),
        num2: Number(num2)
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('API呼び出しに失敗しました');
      }
      const data = await response.json();

      setSumResult(data.sum);
      setProductResult(data.product);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', backgroundColor: '#282c34', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 'calc(10px + 2vmin)', color: 'white' }}>
      <header className="App-header">
        <h1>Lambda計算結果表示アプリ</h1>

        <div style={{ marginBottom: '20px' }}>
          <input 
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            style={{ fontSize: '18px', padding: '8px', width: '100px' }}
          />
          <span style={{ margin: '0 10px' }}>+ / *</span>
          <input 
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            style={{ fontSize: '18px', padding: '8px', width: '100px' }}
          />
        </div>

        <button onClick={fetchCalculations} disabled={loading} style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? '計算中...' : 'Lambda APIを呼び出す'}
        </button>

        {error && <p style={{ color: 'red' }}>エラー: {error}</p>}

        <div style={{ marginTop: '20px' }}>
          {sumResult !== null && (
            <p>足し算の結果: {sumResult}</p>
          )}
          {productResult !== null && (
            <p>掛け算の結果: {productResult}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;