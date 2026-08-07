import { useState } from "react";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Processing from "./components/Processing";
import Success from "./components/Success";

import "./App.css";

function App() {
  const [step, setStep] = useState("cart");

  const [products, setProducts] = useState([]);

  switch (step) {
    case "cart":
      return (
        <Cart
          products={products}
          setProducts={setProducts}
          onCheckout={() => setStep("checkout")}
        />
      );

    case "checkout":
      return (
        <Checkout
          products={products}
          onBack={() => setStep("cart")}
          onPay={() => setStep("processing")}
        />
      );

    case "processing":
      return (
        <Processing
          onSuccess={() => {
            setProducts([]);
            setStep("success");
          }}
        />
      );

    case "success":
      return <Success onFinish={() => setStep("cart")} />;

    default:
      return null;
  }
}

export default App;
