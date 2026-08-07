import { useEffect, useState } from "react";

import { FaArrowRight, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function Cart({ products, setProducts }) {
  const [loading, setLoading] = useState(false);

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
  }, [setProducts]);

  function increaseQuantity(id) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setProducts((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeProduct(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalProducts = products.reduce((sum, item) => sum + item.quantity, 0);

  async function handleCheckout() {
    try {
      setLoading(true);

      console.log("Productos enviados:", products);

      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            products,
          }),
        },
      );

      const text = await response.text();

      console.log("Status:", response.status);
      console.log("Respuesta cruda:", text);

      const data = JSON.parse(text);

      console.log("Data:", data);

      window.location.href = data.url;
    } catch (error) {
      console.error("Error checkout:", error);
      setLoading(false);
    }
  }

  return (
    <div className="cart">
      <h2 className="titleCart">🛒 Tu carrito de compras</h2>

      {products.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
      ) : (
        products.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-info">
              <strong>{item.name}</strong>

              <p>S/. {item.price}</p>

              <div className="quantity">
                <button onClick={() => decreaseQuantity(item.id)}>
                  <FaMinus />
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="cart-actions">
              <strong>S/. {item.price * item.quantity}</strong>

              <button className="delete" onClick={() => removeProduct(item.id)}>
                <FaTrash />
              </button>
            </div>
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

      <button
        disabled={products.length === 0 || loading}
        className="align"
        onClick={handleCheckout}
      >
        {loading ? (
          "Procesando..."
        ) : (
          <>
            Comprar <FaArrowRight />
          </>
        )}
      </button>
    </div>
  );
}

export default Cart;
