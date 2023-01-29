import { useState } from "react"
import calculateDeliveryFee from "../utils/calculator"

const CalculatorForm = ({updateDeliveryFee}) => {
    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [itemCount, setItemCount] = useState(0)
    const [time, setTime] = useState(new Date().toISOString().split(".")[0])

    const handleCartValueChange = (e) => {
        e.preventDefault()
        setCartValue(e.target.value)
    }
    
    const handleDeliveryDistanceChange = (e) => {
        e.preventDefault()
        setDeliveryDistance(e.target.value)
    }

    const handleItemCountChange = (e) => {
        e.preventDefault()
        setItemCount(e.target.value)
    }

    const handleTimeChange = (e) => {
        e.preventDefault()
        setTime(e.target.value)
    }

    const handleCalculateDeliveryFee = (e) => {
        e.preventDefault()
        const deliveryFee = calculateDeliveryFee(cartValue, deliveryDistance, itemCount, new Date(time + ".000Z"))
        updateDeliveryFee(deliveryFee.total.toFixed(2))
    }


    return (
        <form onSubmit={handleCalculateDeliveryFee}>
            <label>
            Cart value (euros):
            <input type="text" value={cartValue} onChange={handleCartValueChange} />
            </label><br/>
            <label>
            Delivery distance (meters):
            <input type="number" value={deliveryDistance} onChange={handleDeliveryDistanceChange} />
            </label><br/>
            <label>
            Number of items:
            <input type="number" value={itemCount} onChange={handleItemCountChange} />
            </label><br/>
            <label>
            Time:
            <input type="datetime-local" value={time} onChange={handleTimeChange} />
            </label><br/>
            <button type="submit">Calculate delivery fee</button>
        </form>
    )
}

export default CalculatorForm