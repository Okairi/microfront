import { lazy, Suspense } from "react";
import "./App.css";
import { FaRegUser } from "react-icons/fa6";
import { RiStore2Line } from "react-icons/ri";

const Catalog = lazy(() => import("catalog/Catalog"));
const Cart = lazy(() => import("cart/Cart"));

function Loading({ text }) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}

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

          <Suspense fallback={<Loading text="Cargando productos..." />}>
            <Catalog />
          </Suspense>
        </section>

        <aside className="cart-section">
          <Suspense fallback={<Loading text="Cargando carrito..." />}>
            <Cart />
          </Suspense>
        </aside>
      </main>
    </div>
  );
}

export default App;
