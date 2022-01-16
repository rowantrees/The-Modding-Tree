addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    branches: ["p"],

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "c points",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    baseResource: "Prestige Points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.3,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('c', 11)) mult = mult.times(upgradeEffect('c', 11))
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
        // explained in b.js
    layerShown() { return player.c.points.gte(1) ? true : player.p.points.gte(70) ? true : "ghost"}, 

    upgrades: {
        11: {
            title: "B boost",
            description: "Bs boost C Gain",
            cost: new Decimal(5),
            effect() {
                return player.b.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        // Look in the upgrades docs to see what goes here!
    },
    buyables: {
        31: {
            cost(x) {return 0},
            display() {return "cheat"},
            canAfford() {return true},
            buy() {
                player[this.layer].points = player[this.layer].points.add(10)
            }
        },
        32: {
            cost(x) {return 0},
            display() {return "UNcheat (this node)"},
            canAfford() {return true},
            buy() {
                player[this.layer].points = new Decimal(0)
                player[this.layer].upgrades = []
            }

        }
    }
})