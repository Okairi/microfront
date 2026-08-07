import { FaLock, FaCcVisa, FaCcMastercard } from "react-icons/fa";

function Checkout({ products, onBack, onPay }) {
  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart checkout">
      <h2>
        <FaLock /> Checkout Seguro
      </h2>

      <div className="card-preview">
        <div className="card-icons">
          <FaCcVisa size={28} />
          <FaCcMastercard size={28} />
        </div>

        <p className="card-number">•••• •••• •••• 4242</p>

        <p className="card-name">ALESSANDRO MARINO</p>
      </div>

      <div className="checkout-form">
        <input type="email" placeholder="Correo electrónico" />

        <input type="text" placeholder="Nombre del titular" />

        <input type="text" placeholder="4242 4242 4242 4242" />

        <div className="checkout-row">
          <input type="text" placeholder="MM/AA" />

          <input type="text" placeholder="CVC" />
        </div>
      </div>

      <div className="checkout-summary">
        <h3>Resumen</h3>

        {products.map((item) => (
          <div key={item.id} className="summary-item">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>S/. {item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <div className="summary-total">
          <strong>Total</strong>
          <strong>S/. {total}</strong>
        </div>
      </div>

      <button onClick={onPay}>Pagar S/. {total}</button>

      <button className="secondary-btn" onClick={onBack}>
        Volver al carrito
      </button>
    </div>
  );
}

export default Checkout;
