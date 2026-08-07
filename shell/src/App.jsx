import { lazy, Suspense } from "react";
import "./App.css";
import { FaRegUser } from "react-icons/fa6";
import { RiStore2Line } from "react-icons/ri";

const Catalog = lazy(() => import("catalog/Catalog"));
const Cart = lazy(() => import("cart/Cart"));

function Loading({ text }) {
  return <div className="loading">{text}</div>;
}

function App() {
  const path = window.location.pathname;

  let paymentMessage = null;

  if (path === "/success") {
    paymentMessage = "🎉 ¡Felicidades! Tu pago fue realizado correctamente.";
  }

  if (path === "/cancel") {
    paymentMessage = "❌ Operación cancelada. Tu pago no fue procesado.";
  }

  return (
    <div className="app">
      {paymentMessage && (
        <div className="payment-message">{paymentMessage}</div>
      )}

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
