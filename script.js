const Gameboard = (() => {
    let board = Array(9).fill("")

    function placeMarker(index, marker) {
        board[index] = marker
    }

    function getBoard() {
        return board
    }

    function reset() {
        board = Array(9).fill("")
    }

    return {placeMarker, getBoard, reset}
})()

    let p1 = document.getElementById(`p1`)
    let p2 = document.getElementById(`p2`)
    let gameEnd = false
    let winningCombo = []


// nextTurn = false is the default value (x placement)
let nextTurn = false
let gameStart = false

const GameController = (() => {

const wins = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

let activePlayer = "x"
let winner = ""
let tie = false

    function playRound(index) {
        if (Gameboard.getBoard()[index]) {
            return
        } else if (winner != "") {
            gameEnd = true
            return
        } else if (gameEnd === true) {return} else {
            Gameboard.placeMarker(index, activePlayer)
            switchTurn()
            checkWinner()
            checkTie()
            DisplayController.renderBoard(index)
            gameStart = true
            DisplayController.updateStatus()
        }
    }

    function switchTurn() {
        if (nextTurn === false) {
            nextTurn = true
            activePlayer = "o"
        } else if (nextTurn === true) {
            nextTurn = false
            activePlayer = "x"
        }
    }

    function getActivePlayer () {
        return activePlayer
    }

    function getWinner () {
        return winner
    }

    function resetGame() {
        Gameboard.reset()
        nextTurn = false
        activePlayer = "x"
        winner = ""
        tie = false
        gameEnd = false
        gameStart = false
        winningCombo = []

    }

    function checkWinner() {
        wins.forEach(combo => {
  if (Gameboard.getBoard()[combo[0]] === Gameboard.getBoard()[combo[1]] && 
      Gameboard.getBoard()[combo[1]] === Gameboard.getBoard()[combo[2]] &&
      Gameboard.getBoard()[combo[0]] !== "") {
        winner = Gameboard.getBoard()[combo[0]]
        winningCombo = combo
    }
})
    }

    function checkTie() {
        if (Gameboard.getBoard().length === 9 && winner === "") {
            tie = true
        }
    }

    return {playRound, switchTurn, getActivePlayer, resetGame, checkWinner, checkTie, getWinner}
})()

const DisplayController = (() => {


    function renderBoard(index) {
            let field = document.getElementById(index)

            if (Gameboard.getBoard()[index] === "x") {
                field.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
            } else if (Gameboard.getBoard()[index] === "o") {
                field.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="76%" height="76%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`
            }
    }

    function updateStatus() {
        p1.style.color = "var(--off)"
        p2.style.color = "var(--off)"

        if (nextTurn === false && gameStart === true) {
            p1.style.color = "var(--on)"
        } else if (nextTurn === true && gameStart === true) {
            p2.style.color = "var(--on)"
        }
    }

    let startBtn = document.getElementById("startBtn")
    let resetBtn = document.getElementById("resetBtn")

    startBtn.addEventListener("click", (e) => {
        e.preventDefault()
        
        if (gameEnd === true) {
            return
        } else if (gameStart === true) {
            return
        }
        
        gameStart = true
        updateStatus()
    })

    function renderResult() {
        if (GameController.getWinner() === "x") {
            p1.style.color = "var(--green)"
            p1.style.scale = 1.3
            p2.style.color = "var(--red)" 
setTimeout(() => {
    document.querySelectorAll(".field").forEach((field, index) => {
        if (!winningCombo.includes(index)) {
            const svg = field.querySelector("svg")
            if (svg) svg.style.stroke = "var(--off)"
        }
    })
}, 50)
        } else if (GameController.getWinner() === "o") {
            p2.style.color = "var(--green)"
            p2.style.scale = 1.3
            p1.style.color = "var(--red)"
setTimeout(() => {
    document.querySelectorAll(".field").forEach((field, index) => {
        if (!winningCombo.includes(index)) {
            const svg = field.querySelector("svg")
            if (svg) svg.style.stroke = "var(--off)"
        }
    })
}, 50)
        }
    }

function clearBoard() {
    document.querySelectorAll(".field").forEach(field => {
        const svg = field.querySelector("svg")
        if (svg) {
            svg.style.opacity = "0"
            setTimeout(() => { field.innerHTML = "" }, 300)
        } else {
            field.innerHTML = ""
        }
    })
}

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (gameStart === false) {
            return
        } else {
            p1.style.color = "var(--off)"
            p2.style.color = "var(--off)"
            GameController.resetGame()
            clearBoard()
            p1.style.scale = 1
            p2.style.scale = 1
        }
    })

    document.querySelectorAll(".field").forEach(field => {
    field.addEventListener("click", () => {
        if (gameStart === false) return
        GameController.playRound(Number(field.id))
        updateStatus()
        renderResult()
        })
    })



    return {renderBoard, updateStatus, renderResult}
})()

// P1 bigger issue
// finish styling svg animations etc