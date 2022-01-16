addLayer("b", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    branches: ["p"],

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "b points",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    baseResource: "Prestige Points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(50),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
                                            // NOTE modifiers to gain actually reduce the amount of baseResource required, 
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
        //if you have >= 1 b point OR >= 30 Prestige points it is visible.  Otherwise it's a ghost
    layerShown() { return player.b.points.gte(1) || player.p.points.gte(30) ? true : "ghost"},  // could be false instead of ghost, ghost makes it take up space whether it can be seen or not



    upgrades: {
        11: {
            title: "Keep upgrade \"B\"",
            description: "Sick of buying it every prestige?",
            cost: new Decimal(10),
        },
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