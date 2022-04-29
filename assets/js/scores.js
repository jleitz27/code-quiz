//High Score table
var scoreTable = document.getElementById("scores-table");
var clearBtn = document.getElementById("clear");

//Event listener
clearBtn.addEventListener('click', clearScores);

//Table on open of page:
generateScoresTable();

function generateScoresTable() {
    var highscores = localStorage.getItem("scoreList");
    if (highscores) {
        addTableRows(highscores);
    } 
}

//Add table
function addTableRows(highscores) {
    highscores = JSON.parse(highscores);

    highscores.forEach(function(scoreItem, index) {
        var rankGroup = createRankGroup(index + 1);
        var scoreGroup = createScoreGroup(scoreItem.score);
        var initialsGroup = createInitialsGroup(scoreItem.initials);
        var highscoreTableRow = createHighscoreTableRow(rankGroup, scoreGroup, initialsGroup);
        scoreTable.appendChild(highscoreTableRow);
    });
}

function createRankGroup(rank) {
    var rankGroup = document.createElement('td');
    rankGroup.textContent = `#${rank}`;
    return rankGroup;
}

function createScoreGroup(score) {
    var scoreGroup = document.createElement('td');
    scoreGroup.textContent = score;
    return scoreGroup;
}

function createInitialsGroup(initials) {
    var initialsGroup = document.createElement('td');
    initialsGroup.textContent = initials;
    return initialsGroup;
}

function createHighscoreTableRow(rankGroup, scoreGroup, initialsGroup) {
    var tableRow = document.createElement('tr');
    tableRow.appendChild(rankGroup);
    tableRow.appendChild(scoreGroup);
    tableRow.appendChild(initialsGroup);
    return tableRow;
}

//Clear scores
function clearScores() {
    localStorage.setItem('scoreList', []);
    while (scoreTable.children.length > 1) {
        scoreTable.removeChild(scoreTable.lastChild);
    }
}