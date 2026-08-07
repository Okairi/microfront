import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { FaRegUser } from "react-icons/fa6";
import { RiStore2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Catalog = lazy(() => import("catalog/Catalog"));
const Cart = lazy(() => import("cart/Cart"));

function Loading({ text }) {
  return text;
}

function App() {
  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/success") {
      Swal.fire({
        icon: "success",
        title: "¡Pago realizado!",
        text: "Tu compra fue procesada correctamente.",
        confirmButtonText: "Aceptar",
      });
    }

    if (path === "/cancel") {
      Swal.fire({
        icon: "warning",
        title: "Pago cancelado",
        text: "Tu operación no fue completada.",
        confirmButtonText: "Entendido",
      });
    }
  }, []);

  return (
    <div>
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
