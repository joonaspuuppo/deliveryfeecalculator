import { useState } from "react"
import calculateDeliveryFee from "../utils/calculator"

const CalculatorForm = ({updateDeliveryFee}:{updateDeliveryFee:any}) => {
    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [itemCount, setItemCount] = useState(0)

    // datetime-local input string doesn't contain time zone information so it's removed from the default value
    const [time, setTime] = useState(new Date().toISOString().split(".")[0])

    const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setCartValue(parseFloat(e.target.value.replace(",", ".")) || 0)
    }
    
    const handleDeliveryDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDeliveryDistance(parseInt(e.target.value) || 0)
    }

    const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setItemCount(parseInt(e.target.value) || 0)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTime(e.target.value)
    }

    const handleCalculateDeliveryFee = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // and time zone (UTC) information is added to the datetime input
        const deliveryFee = calculateDeliveryFee(cartValue, deliveryDistance, itemCount, new Date(time + ".000Z"))
        updateDeliveryFee(deliveryFee.total.toFixed(2))
    }

    return (
        <form onSubmit={handleCalculateDeliveryFee}>
            <label>
            Cart value (euros):
            <input type="number" step="any" min="0" value={cartValue} onChange={handleCartValueChange} />
            </label><br/>
            <label>
            Delivery distance (meters):
            <input type="number" min="0" value={deliveryDistance} onChange={handleDeliveryDistanceChange} />
            </label><br/>
            <label>
            Number of items:
            <input type="number" min="0" value={itemCount} onChange={handleItemCountChange} />
            </label><br/>
            <label>
            Time:
            <input type="datetime-local" value={time} onChange={handleTimeChange} />
            </label><br/>
            <button type="submit" id="calculateButton">Calculate delivery fee</button>
        </form>
    )
}

export default CalculatorForm