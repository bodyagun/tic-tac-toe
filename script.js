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

    let player1name = document.getElementById("player1name")
    let player2name = document.getElementById("player2name")
    let p1 = document.getElementById(`p1`)
    let p2 = document.getElementById(`p2`)

function Player(name, marker) {
    return {name, marker}
}

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
            return
        } else {
            Gameboard.placeMarker(index, activePlayer)
            switchTurn()
            checkWinner()
            checkTie()
            DisplayController.renderBoard()
            gameStart = true
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
        player1name.value = ""
        player2name.value = ""

    }

    function checkWinner() {
        wins.forEach(combo => {
  if (Gameboard.getBoard()[combo[0]] === Gameboard.getBoard()[combo[1]] && 
      Gameboard.getBoard()[combo[1]] === Gameboard.getBoard()[combo[2]] &&
      Gameboard.getBoard()[combo[0]] !== "") {
        winner = Gameboard.getBoard()[combo[0]]
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


    function renderBoard() {
        for (let i = 0; i < Gameboard.getBoard().length; i++) {
            let field = document.getElementById(`${i}`)
            
            if (Gameboard.getBoard()[i] === "x") {
                field.textContent = "x"
            } else if (Gameboard.getBoard()[i] === "o") {
                field.textContent = "o"
            } else {
                field.textContent = ""
            }
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

        if (player1name.value === "" || player2name.value == "") {
            return
        }

        const player1 = Player(player1name.value, "x")
        const player2 = Player(player2name.value, "o")
        gameStart = true
        renderBoard()
        updateStatus()
    })

    function renderResult() {
        if (GameController.getWinner() === "x") {
            p1.style.color = "var(--green)"
            p1.style.scale = 1.3
            p2.style.color = "var(--red)"    
        } else if (GameController.getWinner() === "o") {
            p2.style.color = "var(--green)"
            p2.style.scale = 1.3
            p1.style.color = "var(--red)"   
        }
    }

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (gameStart === false) {
            return
        } else {
            p1.style.color = "var(--off)"
            p2.style.color = "var(--off)"
            GameController.resetGame()
            renderBoard()
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



    return {renderBoard, updateStatus}
})()

// can start after game ended
// P1 bigger issue
// finish styling svg animations etc