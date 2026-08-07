import Catalog from "catalog/Catalog";
import Cart from "cart/Cart";
import "./App.css";
import { FaRegUser } from "react-icons/fa6";
import { RiStore2Line } from "react-icons/ri";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1 className="align">
            <RiStore2Line />
            Mini Store
          </h1>

          <span>Micro Frontend Ecommerce</span>
        </div>

        <div className="user">
          <FaRegUser />
          <span> </span>
          Cliente
        </div>
      </header>

      <main className="layout">
        <section className="products-section">
          <h2 className="titleCatalog">Productos</h2>

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
