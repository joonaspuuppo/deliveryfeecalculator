import { useState } from "react"
import calculateDeliveryFee from "../utils/calculator"

const CalculatorForm = ({updateDeliveryFee}:{updateDeliveryFee:any}) => {
    const [cartValue, setCartValue] = useState<string>("")
    const [deliveryDistance, setDeliveryDistance] = useState<string>("")
    const [itemCount, setItemCount] = useState<string>("")

    // datetime-local input string doesn't contain time zone information so it's removed from the default value
    const [time, setTime] = useState<string>(new Date().toISOString().split(".")[0])

    const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setCartValue(e.target.value)
    }
    
    const handleDeliveryDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDeliveryDistance(e.target.value)
    }

    const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setItemCount(e.target.value)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTime(e.target.value)
    }

    const handleCalculateDeliveryFee = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        const cartValueAsNumber = parseFloat(cartValue) || 0
        const deliveryDistanceAsNumber = parseInt(deliveryDistance) || 0
        const itemCountAsNumber = parseInt(itemCount) || 0
        
        // time zone (UTC) information is added to the datetime input
        const deliveryFee = calculateDeliveryFee(cartValueAsNumber, deliveryDistanceAsNumber, itemCountAsNumber, new Date(time + ".000Z"))
        updateDeliveryFee(deliveryFee.total.toFixed(2))
    }

    return (
        <form onSubmit={handleCalculateDeliveryFee}>
            <label>
            Cart value (euros):
            <input type="text" pattern="^[1-9]\d*([.,]{1}\d+)?$" title="Non-negative number required" placeholder="0.00" value={cartValue} onChange={handleCartValueChange} />
            </label><br/>
            <label>
            Delivery distance (meters):
            <input type="text" pattern="^[1-9]\d*$" title="Non-negative whole number required" placeholder="0" value={deliveryDistance} onChange={handleDeliveryDistanceChange} />
            </label><br/>
            <label>
            Number of items:
            <input type="text" pattern="^[1-9]\d*$" title="Non-negative whole number required" placeholder="0" value={itemCount} onChange={handleItemCountChange} />
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