import React, { useState } from 'react';
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth(); // useAuthフックを使って認証状態を取得

  const [sumResult, setSumResult] = useState(null);
  const [productResult, setProductResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sumAnimalName, setSumAnimalName] = useState(null);
  const [productAnimalName, setProductAnimalName] = useState(null);
  
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(5);

  const API_URL = 'https://dpupajh4nl.execute-api.ap-northeast-1.amazonaws.com/v1';

  const fetchCalculations = async () => {
    setLoading(true);
    setError(null);
    setSumAnimalName(null); 
    setProductAnimalName(null);
    try {
      const dataToSend = {
        num1: Number(num1),
        num2: Number(num2)
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 認証済みのユーザーの場合、Authorizationヘッダにトークンを追加する
          'Authorization': auth.isAuthenticated ? `Bearer ${auth.user?.id_token}` : '',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('API呼び出しに失敗しました');
      }
      const data = await response.json();
      
      setSumResult(data.sum);
      setProductResult(data.product);
      setSumAnimalName(data.sum_animal_name);
      setProductAnimalName(data.product_animal_name);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理用の関数
  const signOutRedirect = () => {
    const clientId = "22tvs2tsgiihsbc4hbd8n65pf"; // あなたのアプリクライアントID
    const logoutUri = "http://localhost:3000"; // あなたのログアウト後にリダイレクトされるURL
    const cognitoDomain = "https://myserverlessapp-851725630271.auth.ap-northeast-1.amazoncognito.com"; // スクリーンショットのURL
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  
  // 認証状態の確認
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    // 認証済みのユーザーに表示するUI
    return (
      <div className="App" style={{ textAlign: 'center', backgroundColor: '#282c34', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 'calc(10px + 2vmin)', color: 'white' }}>
        <header className="App-header">
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <span style={{ marginRight: '10px' }}>こんにちは！ {auth.user?.profile.email}</span>
            <button onClick={() => signOutRedirect()} style={{ padding: '8px', fontSize: '14px' }}>ログアウト</button>
          </div>
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
          
          {sumAnimalName && (
            <div style={{ marginTop: '20px', maxWidth: '500px', fontStyle: 'italic', border: '1px solid #61dafb', padding: '10px', borderRadius: '8px' }}>
              <p>足し算の結果と同じくらいの体重の動物: {sumAnimalName}</p>
            </div>
          )}
          {productAnimalName && (
            <div style={{ marginTop: '10px', maxWidth: '500px', fontStyle: 'italic', border: '1px solid #61dafb', padding: '10px', borderRadius: '8px' }}>
              <p>掛け算の結果と同じくらいの体重の動物: {productAnimalName}</p>
            </div>
          )}
        </header>
      </div>
    );
  }

  // 認証前のユーザーに表示するUI（ログイン画面）
  return (
    <div style={{ textAlign: 'center', backgroundColor: '#282c34', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 'calc(10px + 2vmin)', color: 'white' }}>
      <h1>ログインしてください</h1>
      <button onClick={() => auth.signinRedirect()} style={{ padding: '10px 20px', fontSize: '16px' }}>Sign in with Cognito</button>
    </div>
  );
}

export default App;