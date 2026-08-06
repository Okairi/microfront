import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function handleCart(event) {
      const product = event.detail;

      setProducts((prev) => {
        const exists = prev.find((item) => item.id === product.id);

        if (exists) {
          return prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          );
        }

        return [
          ...prev,

          {
            ...product,
            quantity: 1,
          },
        ];
      });
    }

    window.addEventListener("add-to-cart", handleCart);

    return () => {
      window.removeEventListener("add-to-cart", handleCart);
    };
  }, []);

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0,
  );

  const totalProducts = products.reduce(
    (sum, item) => sum + item.quantity,

    0,
  );

  return (
    <div className="cart">
      <h2 className="titleCart">Tú carrito de compras</h2>

      {products.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
      ) : (
        products.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>

              <p>Cantidad: {item.quantity}</p>
            </div>

            <span>S/. {item.price * item.quantity}</span>
          </div>
        ))
      )}

      <hr />

      <div className="cart-total">
        <span>Productos:</span>

        <span>{totalProducts}</span>
      </div>

      <div className="cart-total">
        <span>Total:</span>

        <span>S/. {total}</span>
      </div>

      <button disabled={products.length === 0}>Comprar</button>
    </div>
  );
}

export default App;
