import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 3000,
      image: "💻",
    },

    {
      id: 2,
      name: "Mouse",
      price: 80,
      image: "🖱️",
    },

    {
      id: 3,
      name: "Teclado",
      price: 200,
      image: "⌨️",
    },

    {
      id: 4,
      name: "Monitor",
      price: 900,
      image: "🖥️",
    },
  ];

  function addToCart(product) {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: product,
      }),
    );
  }

  return (
    <div className="catalog">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="image">{product.image}</div>

          <h3>{product.name}</h3>

          <p>S/. {product.price}</p>

          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default App;
