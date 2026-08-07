import { useEffect } from "react";

function Processing({ onSuccess }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSuccess();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="cart processing">
      <div className="spinner"></div>

      <h2>Procesando pago...</h2>

      <p>Estamos verificando tu transacción.</p>
    </div>
  );
}

export default Processing;
