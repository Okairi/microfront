import { FaCheckCircle } from "react-icons/fa";

function Success({ onFinish }) {
  const orderNumber = "ORD-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="cart success">
      <FaCheckCircle size={72} color="#16a34a" />

      <h2>Pago realizado</h2>

      <p>Gracias por tu compra.</p>

      <p>Número de orden:</p>

      <strong>#{orderNumber}</strong>

      <button onClick={onFinish}>Volver a la tienda</button>
    </div>
  );
}

export default Success;
