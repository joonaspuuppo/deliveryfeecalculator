import { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  const [deliveryFee, setDeliveryFee] = useState(0)


  return (
    <div id="background">
      <div className="app">
        <h1>Delivery Fee Calculator</h1>
        <CalculatorForm updateDeliveryFee={(fee: number) => setDeliveryFee(fee)}/>
        <p id="deliveryFeeAmount"><strong>{deliveryFee} €</strong></p>
      </div>
    </div>
  );
}

export default App;
