import { useState, useEffect } from "react"
const calculateDeliveryFee = require("../utils/calculator").calculateDeliveryFee

const CalculatorForm = ({updateDeliveryFee}) => {
    const [cartValue, setCartValue] = useState("0")
    const [deliveryDistance, setDeliveryDistance] = useState("0")
    const [itemCount, setItemCount] = useState("0")

    // datetime-local input string doesn't contain time zone information so it's removed from the default value
    const [time, setTime] = useState(new Date().toISOString().split(".")[0])
    const [formIsValid, setFormIsValid] = useState(true)
    
    // validate inputs on change
    useEffect(() => {
        const positiveDecimalRegex = /^\d+([.,]\d{1,2})?$/;

        if (!positiveDecimalRegex.test(cartValue) || deliveryDistance < 0 || itemCount < 0) {
            setFormIsValid(false)
        } else {
            setFormIsValid(true)
        }

    }, [cartValue, deliveryDistance, itemCount])

    // disable calculator if input is invalid
    useEffect(() => {
        document.getElementById("calculateButton").disabled = !formIsValid
    }, [formIsValid])

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
        // if a comma was used as a decimal separator it's replaced with a dot
        // and time zone (UTC) information is added to the datetime input
        const deliveryFee = calculateDeliveryFee(cartValue.replace(",", "."), deliveryDistance, itemCount, new Date(time + ".000Z"))
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
            <button type="submit" id="calculateButton">Calculate delivery fee</button>
        </form>
    )
}

export default CalculatorForm