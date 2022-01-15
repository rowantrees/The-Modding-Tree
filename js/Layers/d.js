addLayer("d", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    branches: ["b","c"],

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "bc points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
    baseResource: "B and C Points Prestige Points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.b.points.divide(player.c.points) },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.3,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.d.points.gte(1) ? true : player.b.points.gte(100) & player.c.points.gte(100) ? true : "ghost"},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})