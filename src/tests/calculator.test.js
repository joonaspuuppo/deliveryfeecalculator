const calculateDeliveryFee = require("../utils/calculator").calculateDeliveryFee

const normalTime = new Date("2023-01-30T06:47:51.000Z")
const rushTime = new Date("2023-02-03T17:47:51.000Z")

test("if cart value is < 10, small order surcharge of 10 - cart value gets added", () => {
    const deliveryFee = calculateDeliveryFee("9", "0", "0", normalTime)
    expect(deliveryFee.smallOrderSurcharge).toBe(1)

    const deliveryFee1 = calculateDeliveryFee("4.65", "0", "0", normalTime)
    expect(deliveryFee1.smallOrderSurcharge).toBe(10 - 4.65)
})

test("if cart value is >= 10, no small order surcharge gets added", () => {
    const deliveryFee = calculateDeliveryFee("11", "0", "0", normalTime)
    expect(deliveryFee.smallOrderSurcharge).toBe(0)
})

test("if 0 <= deliveryDistance <= 1000m, delivery distance charge is 2", () => {
    const deliveryFee = calculateDeliveryFee("0", "0", "0", normalTime)
    expect(deliveryFee.deliveryDistanceCharge).toBe(2)

    const deliveryFee1 = calculateDeliveryFee("0", "1000", "0", normalTime)
    expect(deliveryFee1.deliveryDistanceCharge).toBe(2)
    
    const deliveryFee2 = calculateDeliveryFee("0", "500", "0", normalTime)
    expect(deliveryFee2.deliveryDistanceCharge).toBe(2)
})

test("if delivery distance > 1000m, 1 gets added to delivery fee for every 500m", () => {
    const deliveryFee = calculateDeliveryFee("0", "1001", "0", normalTime)
    expect(deliveryFee.deliveryDistanceCharge).toBe(3)

    const deliveryFee1 = calculateDeliveryFee("0", "1500", "0", normalTime)
    expect(deliveryFee1.deliveryDistanceCharge).toBe(3)
    
    const deliveryFee2 = calculateDeliveryFee("0", "1501", "0", normalTime)
    expect(deliveryFee2.deliveryDistanceCharge).toBe(4)
})

test("if item count < 5, no item count surcharge gets added", () => {
    const deliveryFee = calculateDeliveryFee("0", "0", "1", normalTime)
    expect(deliveryFee.fivePlusItemSurcharge).toBe(0)
    expect(deliveryFee.twelvePlusItemSurcharge).toBe(0)
})

test("if item count >= 5, fivePlusItemSurcharge of 0.5 gets added for each item above and including 5th item", () => {
    const deliveryFee = calculateDeliveryFee("0", "0", "5", normalTime)
    expect(deliveryFee.fivePlusItemSurcharge).toBe(0.5)

    const deliveryFee1 = calculateDeliveryFee("0", "0", "6", normalTime)
    expect(deliveryFee1.fivePlusItemSurcharge).toBe(1)
})

test("if item count > 12, twelvePlusItemSurcharge of 1.2 gets added", () => {
    const deliveryFee = calculateDeliveryFee("0", "0", "1", normalTime)
    expect(deliveryFee.twelvePlusItemSurcharge).toBe(0)

    const deliveryFee1 = calculateDeliveryFee("0", "0", "13", normalTime)
    expect(deliveryFee1.twelvePlusItemSurcharge).toBe(1.2)
})

test("if time is Friday between 3-7 PM UTC, fridayRushMultiplier is 1.2", () => {
    const deliveryFee = calculateDeliveryFee("0", "0", "0", rushTime)
    expect(deliveryFee.fridayRushMultiplier).toBe(1.2)

    const deliveryFee1 = calculateDeliveryFee("0", "0", "0", normalTime)
    expect(deliveryFee1.fridayRushMultiplier).toBe(1)
})

test("if cart value >= 100 total delivery fee is 0", () => {
    const deliveryFee = calculateDeliveryFee("100", "0", "0", normalTime)
    expect(deliveryFee.total).toBe(0)
})

test("if cart value < 100 total delivery fee is sum of components times fridayRushMultiplier but not more than 15", () => {
    const deliveryFee = calculateDeliveryFee("8.75", "1345", "5", rushTime)
    expect(deliveryFee.total).toBe(deliveryFee.fridayRushMultiplier * 
                                    (deliveryFee.smallOrderSurcharge + deliveryFee.deliveryDistanceCharge 
                                        + deliveryFee.fivePlusItemSurcharge + deliveryFee.twelvePlusItemSurcharge))
    
    const maxDeliveryFee = calculateDeliveryFee("8.75", "10000", "5", rushTime)
    
    // checking that calculated delivery fee is over 15
    expect(maxDeliveryFee.fridayRushMultiplier * 
        (maxDeliveryFee.smallOrderSurcharge + maxDeliveryFee.deliveryDistanceCharge 
            + maxDeliveryFee.fivePlusItemSurcharge + maxDeliveryFee.twelvePlusItemSurcharge)).toBeGreaterThan(15)
    
    // ...but total is limited to 15
    expect(maxDeliveryFee.total).toBe(15)
})


