import { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  const [deliveryFee, setDeliveryFee] = useState(0)


  return (
    <div className="app">
      <h1>Delivery Fee Calculator</h1>
      <CalculatorForm updateDeliveryFee={fee => setDeliveryFee(fee)}/>
      <p>Delivery fee: <strong>{deliveryFee} €</strong></p>
    </div>
  );
}

export default App;
