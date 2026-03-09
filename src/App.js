import { useState } from "react";

const accounts = [
  { username: "Marmelab", password: "123456" },
  { username: "admin", password: "admin123" },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    const found = accounts.find(
      (a) => a.username === username && a.password === password
    );
    if (found) { setError(""); setSuccess(true); }
    else setError("Username же password туура эмес!");
  };

  if (success) {
    return (
      <div style={styles.bg}>
        <div style={styles.card}>
          <h2 style={{ color: "#3a3a8f", fontWeight: 700 }}>Кош келдиңиз, {username}! 🎉</h2>
          <button style={styles.btn} onClick={() => { setSuccess(false); setUsername(""); setPassword(""); }}>
            Чыгуу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <div style={styles.lockWrap}>
          <span style={{ fontSize: 28 }}>🔒</span>
        </div>

        <p style={styles.label}>Username</p>
        <input
          style={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p style={styles.label}>Password</p>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.btn} onClick={handleLogin}>SIGN IN</button>

        <div style={styles.testBox}>
          <p style={styles.testTitle}>Тест аккаунттар:</p>
          {accounts.map((a) => (
            <p key={a.username} style={styles.testItem}
              onClick={() => { setUsername(a.username); setPassword(a.password); setError(""); }}>
              {a.username} / {a.password}
            </p>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Nunito, sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 8,
    padding: "40px 48px",
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  lockWrap: {
    width: 52, height: 52, borderRadius: "50%",
    background: "#e0e0e0", display: "flex",
    alignItems: "center", justifyContent: "center",
    alignSelf: "center", marginBottom: 8,
  },
  label: { fontSize: 13, color: "#666", fontWeight: 600 },
  input: {
    padding: "10px 12px", borderRadius: 4,
    border: "1px solid #ccc", fontSize: 15,
    background: "#ffffcc", outline: "none",
    fontFamily: "Nunito, sans-serif",
  },
  btn: {
    padding: "13px", borderRadius: 4, border: "none",
    background: "#3a4dbf", color: "white",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    letterSpacing: 1, marginTop: 6,
    fontFamily: "Nunito, sans-serif",
  },
  error: { color: "#ff4444", fontSize: 13 },
  testBox: { background: "#f5f5ff", borderRadius: 8, padding: "10px 14px", marginTop: 4 },
  testTitle: { fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 4 },
  testItem: { fontSize: 12, color: "#3a4dbf", cursor: "pointer", padding: "2px 0", fontWeight: 600 },
};