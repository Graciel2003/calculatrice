function addition(a, b) {
    return a + b
}

function soustration(a, b) {
    return a - b
}

function multiplication(a, b) {
    return a * b
}

function division(a, b) {
    return a / b
}

let premierNombre = ""
let operateur = ""
let deuxiemeNombre = ""
let resultatAffiche = false

function operate(operateur, a, b) {
    a = Number(a)
    b = Number(b)
    if (operateur === "+") {
        return addition(a, b)
    } else if (operateur === "-") {
        return soustration(a, b)
    } else if (operateur === "*") {
        return multiplication(a, b)
    } else if (operateur === "/") {
        return division(a, b)
    }
}

const ecran = document.getElementById("ecran")
const boutons = document.querySelectorAll("button")

function updateEcran(valeur) {
    ecran.textContent = valeur
}

function getExpression() {
    if (!premierNombre) {
        return "0"
    }
    if (!operateur) {
        return premierNombre
    }
    return premierNombre + " " + operateur + (deuxiemeNombre ? " " + deuxiemeNombre : "")
}

function resetCalculatrice() {
    premierNombre = ""
    operateur = ""
    deuxiemeNombre = ""
    resultatAffiche = false
    updateEcran(0)
}

function saisirValeur(valeur) {
    if (resultatAffiche) {
        premierNombre = ""
        operateur = ""
        deuxiemeNombre = ""
        resultatAffiche = false
    }

    if (!operateur) {
        if (valeur === "." && premierNombre.includes(".")) {
            return
        }
        premierNombre += valeur
    } else {
        if (valeur === "." && deuxiemeNombre.includes(".")) {
            return
        }
        deuxiemeNombre += valeur
    }

    updateEcran(getExpression())
}

function saisirOperateur(valeur) {
    if (!premierNombre) {
        return
    }

    if (deuxiemeNombre) {
        const resultat = operate(operateur, premierNombre, deuxiemeNombre)
        premierNombre = String(resultat)
        deuxiemeNombre = ""
    }

    operateur = valeur
    resultatAffiche = false
    updateEcran(getExpression())
}

boutons.forEach(button => {
    button.addEventListener("click", function () {
        const valeur = button.textContent.trim()

        if (valeur === "Effacer") {
            resetCalculatrice()
            return
        }

        if (valeur === "=") {
            if (!premierNombre || !operateur) {
                return
            }

            const valeurDeuxieme = deuxiemeNombre || premierNombre
            const resultat = operate(operateur, premierNombre, valeurDeuxieme)
            updateEcran(resultat)
            premierNombre = String(resultat)
            deuxiemeNombre = ""
            operateur = ""
            resultatAffiche = true
            return
        }

        if (valeur === "+" || valeur === "-" || valeur === "*" || valeur === "/") {
            saisirOperateur(valeur)
            return
        }

        if (!isNaN(valeur) || valeur === ".") {
            saisirValeur(valeur)
        }
    })
})

