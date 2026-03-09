import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.navbar}>
      <Link style={styles.link} to="/">Welcome</Link>
      <Link style={styles.link} to="/products">Products</Link>
      <Link style={styles.link} to="/contact">Contact</Link>
    </div>
  );
}

function Welcome() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <div style={styles.box}><h1 style={styles.boxTitle}>Welcome Page</h1></div>
      <h2 style={styles.title}>React Router Navigation Demo</h2>
      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={() => navigate("/products")}>Navigate to New Path</button>
        <button style={styles.btn} onClick={() => navigate("/contact", { replace: true })}>Replace Current Path</button>
      </div>
    </div>
  );
}

function Products() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <div style={styles.box}><h1 style={styles.boxTitle}>Products Page</h1></div>
      <h2 style={styles.title}>Биздин продуктылар</h2>
      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={() => navigate("/")}>Башкы бетке</button>
        <button style={styles.btn} onClick={() => navigate("/contact")}>Contact бетке</button>
      </div>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <div style={styles.box}><h1 style={styles.boxTitle}>Contact Page</h1></div>
      <h2 style={styles.title}>Биз менен байланышыңыз</h2>
      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={() => navigate("/")}>Башкы бетке</button>
        <button style={styles.btn} onClick={() => navigate("/products")}>Products бетке</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  navbar: { background:"#1a3a8f", display:"flex", justifyContent:"center", gap:40, padding:"16px 0" },
  link: { color:"white", textDecoration:"none", fontSize:16, fontWeight:600 },
  page: { background:"#e8edf5", minHeight:"90vh", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:60, gap:24 },
  box: { border:"2px solid #1a3a8f", borderRadius:4, padding:"20px 80px" },
  boxTitle: { color:"#1a3a8f", fontSize:26, fontWeight:700 },
  title: { color:"#1a3a8f", fontSize:22, fontWeight:700 },
  btnRow: { display:"flex", gap:16 },
  btn: { padding:"10px 22px", border:"1.5px solid #888", borderRadius:4, background:"white", fontSize:15, cursor:"pointer" },
};