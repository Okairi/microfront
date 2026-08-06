import Catalog from "catalog/Catalog";
import Cart from "cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1>🛒 Mini Store</h1>

          <span>Micro Frontend Ecommerce</span>
        </div>

        <div className="user">👤 Cliente</div>
      </header>

      <main className="layout">
        <section className="products-section">
          <h2>Productos</h2>

          <Catalog />
        </section>

        <aside className="cart-section">
          <Cart />
        </aside>
      </main>
    </div>
  );
}

export default App;
