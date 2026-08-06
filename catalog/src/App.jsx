import "./App.css";
import { products } from "./data/data";

function App() {
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
          <div className="image">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="info">
            <h3>{product.name}</h3>
            <p className="price">
              <span className="currency">S/.</span>
              {product.price}
            </p>
            <button onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
