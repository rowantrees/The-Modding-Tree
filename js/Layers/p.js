addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of prestige currency
    baseResource: "tests", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        if(['d','b','c'].includes(resettingLayer)) {
            const testUpgradesToKeep = {
                21: hasUpgrade("b", 11)
            }
            const upgradesToKeep = []
            for (let upgrade of player[this.layer].upgrades) {
                if (testUpgradesToKeep[upgrade]) {
                    upgradesToKeep.push(upgrade)
                }
            }
            layerDataReset(this.layer)
            player[this.layer].upgrades = upgradesToKeep

        }
    },
    upgrades: {
        11: {
            title: "Doubler",
            description: "Double your test gain",
            cost: new Decimal(1),
        },
        12: {
            title: "PP boost",
            description: "Prestige Points boost test gain",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "third",
            description: "Tests boost Prestige Point gain",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "B",
            description: "B points boost P points",
            cost: new Decimal(50),
            effect() {
                return player.b.points.pow(0.15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
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
            display() {return "UNcheat"},
            canAfford() {return true},
            buy() {
                player[this.layer].points = new Decimal(0)
                player["b"].points = new Decimal(0)
                player["c"].points = new Decimal(0)
                player[this.layer].upgrades = []
                player["b"].upgrades = []
                player["c"].upgrades = []

            }

        }
    },
    
})
