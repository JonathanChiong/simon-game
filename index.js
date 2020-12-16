var gameSession = false;
var level = 0;
var counter = 0;
var currentColor = "";
var userPattern = [];
var gamePattern = [];
var colors = ["green", "red", "yellow", "blue"];


// START GAME 
$('body').keydown(() => {
    if (gameSession == false) {
        gameSession = true;
        sequence();
    };
});

//GENERATE SEQUENCE
var sequence = () => {
    userPattern = [];
    level++;
    $("#level-title").html(`Level ${level}`);

    currentColor = colors[Math.floor(Math.random() * Math.floor(4))];
    gamePattern.push(currentColor);

    setTimeout(() => {
        playSound(currentColor);
        blinkColor(currentColor);
    }, 400);

};

// CHECK ANSWER
$(".btn").on("click", e => {
    blinkColor(e.target.id);
    userPattern.push(e.target.id);


    if (gamePattern[userPattern.length - 1] === userPattern[userPattern.length - 1]) {
        if (JSON.stringify(gamePattern) === JSON.stringify(userPattern)) {
            sequence();
        }
    } else {
        gameOver();
    }
});


var playSound = color => {
    var sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
};
var blinkColor = color => {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 100);
};

var gameOver = () => {
    userPattern = [];
    gamePattern = [];
    gameSession = false;
    level = 0;
    $(`#level-title`).html(`Game-over.<br>Press any key to continue`);

    $("body").addClass("game-over")

    playSound("wrong");

    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200);
}
