const calculateDeliveryFee = (cartValue, deliveryDistance, itemCount, time) => {

    console.log("Calculating delivery fee")
    console.log(`Cart value: ${cartValue}`)
    console.log(`Delivery distance: ${deliveryDistance}`)
    console.log(`Item count: ${itemCount}`)
    console.log(`Time: ${time.toISOString()}`)
    console.log("-------------")

    const deliveryFee = {
        total: 0,
        smallOrderSurcharge: 0,
        fivePlusItemSurcharge: 0,
        twelvePlusItemSurcharge: 0,
        deliveryDistanceCharge: 0,
        fridayRushMultiplier: 1
    }

    if (cartValue >= 100) return deliveryFee

    deliveryFee.deliveryDistanceCharge = calculateDistanceFee(deliveryDistance)

    if (cartValue < 10) deliveryFee.smallOrderSurcharge = 10 - cartValue

    if (itemCount >= 5) deliveryFee.fivePlusItemSurcharge = (itemCount - 4) * 0.5

    if (itemCount > 12) deliveryFee.twelvePlusItemSurcharge = 1.20

    if (time.getUTCDay() === 5) {
        if (time.getUTCHours() >= 15 && time.getUTCHours() <= 19) {
            deliveryFee.fridayRushMultiplier = 1.2
        }
    }

    deliveryFee.total =    deliveryFee.fridayRushMultiplier 
                        * (deliveryFee.smallOrderSurcharge 
                         + deliveryFee.fivePlusItemSurcharge 
                         + deliveryFee.twelvePlusItemSurcharge 
                         + deliveryFee.deliveryDistanceCharge)
    
    if (deliveryFee.total > 15) deliveryFee.total = 15

    console.log(deliveryFee)

    return deliveryFee

}

const calculateDistanceFee = (deliveryDistance) => {

    // base fee is 2, covers up to 1000m
    let distanceFee = 2
    let distance = 1000
    
    //for every additional 500m, add 1 to fee
    while (distance < deliveryDistance) {
        distanceFee += 1
        distance += 500
    }

    return distanceFee
}

module.exports = {
    calculateDeliveryFee
}