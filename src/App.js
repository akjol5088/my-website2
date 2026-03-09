import { useState } from "react";

const cocktails = [
  { id: 1, name: "Margarita", category: "Classic", price: 350, img: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" },
  { id: 2, name: "Mojito", category: "Classic", price: 300, img: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg" },
  { id: 3, name: "Espresso Martini", category: "Coffee", price: 400, img: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg" },
  { id: 4, name: "Lemonade", category: "Non-alcoholic", price: 150, img: "https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg" },
  { id: 5, name: "Pina Colada", category: "Tropical", price: 380, img: "https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg" },
  { id: 6, name: "Blue Lagoon", category: "Tropical", price: 360, img: "https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg" },
  { id: 7, name: "Daiquiri", category: "Classic", price: 320, img: "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg" },
  { id: 8, name: "Old Fashioned", category: "Classic", price: 450, img: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg" },
];

const categories = ["All", "Classic", "Coffee", "Tropical", "Non-alcoholic"];
const PHONE = "996777268153";

export default function App() {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (cocktail) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === cocktail.id);
      if (exists) return prev.map(i => i.id === cocktail.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...cocktail, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const orderViaWhatsApp = () => {
    const items = cart.map(i => `- ${i.name} x${i.qty} = ${i.price * i.qty} сом`).join("%0A");
    const msg = `🍹 Заказ:%0A${items}%0A💰 Жалпы: ${total} сом`;
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  const filtered = filter === "All" ? cocktails : cocktails.filter(c => c.category === filter);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (showCart) {
    return (
      <div style={styles.wrap}>
        <Navbar setPage={setPage} cartCount={cartCount} setShowCart={setShowCart} />
        <div style={styles.cartPage}>
          <button style={styles.backBtn} onClick={() => setShowCart(false)}>← Артка</button>
          <h2 style={styles.pageTitle}>🛒 Себет</h2>
          {cart.length === 0 ? (
            <p style={{ color: "#888" }}>Себет бош!</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.img} alt={item.name} style={styles.cartImg} />
                  <div style={{ flex: 1 }}>
                    <p style={styles.cartName}>{item.name}</p>
                    <p style={styles.cartPrice}>{item.price} сом x {item.qty} = {item.price * item.qty} сом</p>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
              <div style={styles.totalRow}>
                <span style={styles.totalText}>Жалпы: {total} сом</span>
              </div>
              <button style={styles.waBtn} onClick={orderViaWhatsApp}>
                <span style={{ fontSize: 20 }}>📲</span> WhatsApp аркылуу заказ кылуу
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (page === "cocktails") {
    return (
      <div style={styles.wrap}>
        <Navbar setPage={setPage} cartCount={cartCount} setShowCart={setShowCart} />
        <div style={styles.cocktailPage}>
          <h2 style={styles.pageTitle}>CockTails</h2>
          <div style={styles.filters}>
            {categories.map(cat => (
              <button key={cat}
                style={{ ...styles.filterBtn, background: filter === cat ? "#00bcd4" : "white", color: filter === cat ? "white" : "#333" }}
                onClick={() => setFilter(cat)}>{cat}
              </button>
            ))}
          </div>
          <div style={styles.grid}>
            {filtered.map(c => (
              <div key={c.id} style={styles.card}>
                <img src={c.img} alt={c.name} style={styles.cardImg} />
                <div style={styles.cardBody}>
                  <h3 style={styles.cardName}>{c.name}</h3>
                  <span style={styles.badge}>{c.category}</span>
                  <p style={styles.cardPrice}>{c.price} сом</p>
                  <button style={styles.addBtn} onClick={() => addToCart(c)}>+ Себетке</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === "about") {
    return (
      <div style={styles.wrap}>
        <Navbar setPage={setPage} cartCount={cartCount} setShowCart={setShowCart} />
        <div style={styles.otherPage}>
          <h2 style={styles.pageTitle}>About</h2>
          <p style={{ color: "#555", fontSize: 16, maxWidth: 500, textAlign: "center" }}>
            Cocktail App — дүйнөнүн эң жакшы коктейлдерин табуу үчүн жасалган колдонмо!
          </p>
        </div>
      </div>
    );
  }

  if (page === "products") {
    return (
      <div style={styles.wrap}>
        <Navbar setPage={setPage} cartCount={cartCount} setShowCart={setShowCart} />
        <div style={styles.otherPage}>
          <h2 style={styles.pageTitle}>Products</h2>
          <p style={{ color: "#555", fontSize: 16 }}>Биздин продуктылар жакында чыгат!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <Navbar setPage={setPage} cartCount={cartCount} setShowCart={setShowCart} />
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>It's time for some Cocktails</h1>
        <button style={styles.viewBtn} onClick={() => setPage("cocktails")}>View Cocktails</button>
      </div>
    </div>
  );
}

function Navbar({ setPage, cartCount, setShowCart }) {
  return (
    <div style={styles.navbar}>
      <span style={styles.logo} onClick={() => setPage("home")}>COCKTAIL APP</span>
      <div style={styles.navLinks}>
        <span style={styles.navLink} onClick={() => setPage("home")}>Home</span>
        <span style={styles.navLink} onClick={() => setPage("about")}>About</span>
        <span style={styles.navLink} onClick={() => setPage("products")}>Products</span>
        <span style={styles.cartIcon} onClick={() => setShowCart(true)}>
          🛒 {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </span>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", fontFamily: "sans-serif", background: "#f0f0f0" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  logo: { color: "#00bcd4", fontWeight: 800, fontSize: 20, cursor: "pointer" },
  navLinks: { display: "flex", gap: 28, alignItems: "center" },
  navLink: { color: "#00bcd4", fontWeight: 600, fontSize: 15, cursor: "pointer" },
  cartIcon: { fontSize: 22, cursor: "pointer", position: "relative" },
  cartBadge: { background: "red", color: "white", borderRadius: "50%", fontSize: 11, padding: "2px 6px", fontWeight: 700 },
  hero: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: 32 },
  heroTitle: { fontFamily: "Georgia, serif", fontSize: 52, color: "#222", textAlign: "center", fontStyle: "italic" },
  viewBtn: { padding: "14px 36px", background: "#00bcd4", color: "white", border: "none", borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: "pointer" },
  cocktailPage: { padding: "32px 40px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#00bcd4", marginBottom: 20 },
  filters: { display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  filterBtn: { padding: "8px 20px", borderRadius: 20, border: "1.5px solid #00bcd4", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 },
  card: { background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  cardImg: { width: "100%", height: 180, objectFit: "cover" },
  cardBody: { padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 },
  cardName: { fontSize: 16, fontWeight: 700, color: "#222" },
  badge: { background: "#e0f7fa", color: "#00838f", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, width: "fit-content" },
  cardPrice: { fontSize: 15, fontWeight: 700, color: "#00bcd4" },
  addBtn: { padding: "8px", background: "#00bcd4", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer" },
  cartPage: { padding: "32px 40px", maxWidth: 600, margin: "0 auto" },
  backBtn: { padding: "8px 20px", background: "white", border: "1.5px solid #ccc", borderRadius: 6, cursor: "pointer", fontSize: 14, marginBottom: 20 },
  cartItem: { display: "flex", alignItems: "center", gap: 16, background: "white", borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  cartImg: { width: 70, height: 70, borderRadius: 8, objectFit: "cover" },
  cartName: { fontSize: 16, fontWeight: 700, color: "#222" },
  cartPrice: { fontSize: 14, color: "#666", marginTop: 4 },
  removeBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#ff4444" },
  totalRow: { textAlign: "right", marginBottom: 16 },
  totalText: { fontSize: 20, fontWeight: 800, color: "#222" },
  waBtn: { width: "100%", padding: "16px", background: "#25D366", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 },
  otherPage: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: 16 },
};