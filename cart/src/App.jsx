import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function handleCart(event) {
      setProducts((prev) => [...prev, event.detail]);
    }

    window.addEventListener(
      "add-to-cart",

      handleCart,
    );

    return () => {
      window.removeEventListener(
        "add-to-cart",

        handleCart,
      );
    };
  }, []);

  const total = products.reduce(
    (sum, item) => sum + item.price,

    0,
  );

  return (
    <div className="cart">
      <h2>🛒 Carrito</h2>

      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        products.map((item, index) => (
          <div className="cart-item" key={index}>
            <span>{item.name}</span>

            <span>S/. {item.price}</span>
          </div>
        ))
      )}

      <hr />

      <h3>Total: S/. {total}</h3>

      <button>Comprar</button>
    </div>
  );
}

export default App;
