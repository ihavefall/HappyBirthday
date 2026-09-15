/* =====================================================
   MUSIC
===================================================== */

const songs = [
    {
        title: "Swear It Again",
        artist: "Westlife",
        file: "song1.mp3"
    },
    {
        title: "Best Part Of Me",
        artist: "Ed Sheeran ft. YEBBA",
        file: "song2.mp3"
    },
    {
        title: "Last Night On Earth",
        artist: "Green Day",
        file: "song3.mp3"
    }
];


let currentSong = 0;

const vinyl =
    document.getElementById("vinyl");

const playBtn =
    document.getElementById("playBtn");


/* =====================================================
   SEND COMMAND TO PARENT MUSIC PLAYER
===================================================== */

function sendMusicCommand(type, index = null) {

    if (window.parent !== window) {

        window.parent.postMessage(
            {
                type: type,
                index: index
            },
            "*"
        );

        return true;
    }

    return false;
}


/* =====================================================
   UPDATE MUSIC UI
===================================================== */

function updateMusicUI(
    isPlaying,
    index = currentSong
) {

    currentSong = index;


    if (vinyl) {

        if (isPlaying) {

            vinyl.classList.add("playing");

        } else {

            vinyl.classList.remove("playing");

        }

    }


    if (playBtn) {

        playBtn.textContent =
            isPlaying
                ? "❚❚"
                : "▶";

    }


    const title =
        document.getElementById(
            "songTitle"
        );


    const artist =
        document.getElementById(
            "songArtist"
        );


    if (songs[index]) {

        if (title) {

            title.textContent =
                songs[index].title;

        }


        if (artist) {

            artist.textContent =
                songs[index].artist;

        }

    }


    document
        .querySelectorAll(".track")
        .forEach((track, i) => {

            track.classList.toggle(
                "active",
                i === index
            );

        });

}


/* =====================================================
   REQUEST MUSIC STATE FROM PARENT
===================================================== */

function requestMusicState() {

    if (window.parent !== window) {

        window.parent.postMessage(
            {
                type: "requestMusicState"
            },
            "*"
        );

    }

}


/* =====================================================
   TOGGLE MUSIC
===================================================== */

function toggleMusic() {

    sendMusicCommand(
        "toggleMusic"
    );

}


/* =====================================================
   SELECT SONG
===================================================== */

function selectSong(index) {

    sendMusicCommand(
        "selectSong",
        index
    );

}


/* =====================================================
   NEXT SONG
===================================================== */

function nextSong() {

    sendMusicCommand(
        "nextSong"
    );

}


/* =====================================================
   PREVIOUS SONG
===================================================== */

function previousSong() {

    sendMusicCommand(
        "previousSong"
    );

}


/* =====================================================
   RECEIVE MUSIC STATE
===================================================== */

window.addEventListener(
    "message",
    function(event) {

        if (!event.data) return;


        if (
            event.data.type ===
            "musicState"
        ) {

            updateMusicUI(
                event.data.playing,
                event.data.currentSong
            );

        }

    }
);


/* =====================================================
   ASK PARENT FOR CURRENT STATE
===================================================== */

requestMusicState();


/* =====================================================
   PHOTO MODAL
===================================================== */

const photos =
    document.querySelectorAll(
        ".photo-card"
    );


const imageModal =
    document.getElementById(
        "imageModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


photos.forEach(photo => {

    photo.addEventListener(
        "click",
        () => {

            const image =
                photo.querySelector("img");


            if (
                !imageModal ||
                !modalImage ||
                !image
            ) {

                return;

            }


            modalImage.src =
                image.src;


            imageModal.classList.add(
                "show"
            );

        }
    );

});


/* =====================================================
   CLOSE IMAGE MODAL
===================================================== */

function closeImage() {

    if (imageModal) {

        imageModal.classList.remove(
            "show"
        );

    }

}


/* =====================================================
   CLOSE IMAGE MODAL OUTSIDE
===================================================== */

if (imageModal) {

    imageModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                imageModal
            ) {

                closeImage();

            }

        }
    );

}


/* =====================================================
   10 REASONS
===================================================== */

const reasons = {

    1: {
        title: "Your smile.",
        text: "It somehow makes ordinary days feel a little less ordinary."
    },

    2: {
        title: "Your laugh.",
        text: "I could probably listen to it for way longer than I'd ever admit."
    },

    3: {
        title: "The way you care.",
        text: "You notice little things that other people might miss, and I love that about you."
    },

    4: {
        title: "You make me comfortable.",
        text: "Being around you feels easy. I can just be myself."
    },

    5: {
        title: "Your weird side.",
        text: "Especially the parts you think are too weird. Those are some of my favorite parts."
    },

    6: {
        title: "Your kindness.",
        text: "The way you treat people says so much about the kind of person you are."
    },

    7: {
        title: "You listen.",
        text: "Even when I'm talking about the most random things, you make me feel heard."
    },

    8: {
        title: "You inspire me.",
        text: "You make me want to grow, try harder, and become a better version of myself."
    },

    9: {
        title: "You're you.",
        text: "There isn't another person quite like you, and that's something I'll always treasure."
    },

    10: {
        title: "You're my favorite.",
        text: "I don't think I need a more complicated reason than that."
    }

};


/* =====================================================
   SHOW REASON
===================================================== */

function showReason(number) {

    const popup =
        document.getElementById(
            "reasonPopup"
        );


    const reasonNumber =
        document.getElementById(
            "reasonNumber"
        );


    const reasonTitle =
        document.getElementById(
            "reasonTitle"
        );


    const reasonText =
        document.getElementById(
            "reasonText"
        );


    if (!popup) return;


    reasonNumber.textContent =
        String(number).padStart(
            2,
            "0"
        );


    reasonTitle.textContent =
        reasons[number].title;


    reasonText.textContent =
        reasons[number].text;


    popup.classList.add(
        "show"
    );

}


/* =====================================================
   CLOSE REASON
===================================================== */

function closeReason() {

    const popup =
        document.getElementById(
            "reasonPopup"
        );


    if (popup) {

        popup.classList.remove(
            "show"
        );

    }

}


/* =====================================================
   GAME
===================================================== */

let score = 0;

const MAX_SCORE = 10;

let timeLeft = 30;

let gameRunning = false;

let gameTimer = null;

let heartSpawner = null;


/* =====================================================
   GAME ELEMENTS
===================================================== */

const scoreElement =
    document.getElementById(
        "score"
    );


const timerElement =
    document.getElementById(
        "timer"
    );


const progressFill =
    document.getElementById(
        "progressFill"
    );


const progressText =
    document.getElementById(
        "progressText"
    );


const gameArea =
    document.getElementById(
        "gameArea"
    );


const gameMessage =
    document.getElementById(
        "gameMessage"
    );


const congratsPopup =
    document.getElementById(
        "congratsPopup"
    );


const continueButton =
    document.getElementById(
        "continueButton"
    );


const lockedMessage =
    document.getElementById(
        "lockedMessage"
    );


/* =====================================================
   UPDATE SCORE
===================================================== */

function updateScore() {

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }


    if (progressText) {

        progressText.textContent =
            `${score} / ${MAX_SCORE}`;

    }


    if (progressFill) {

        const percentage =
            (score / MAX_SCORE) * 100;


        progressFill.style.width =
            `${percentage}%`;

    }

}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    score = 0;

    timeLeft = 30;

    gameRunning = true;


    updateScore();


    if (timerElement) {

        timerElement.textContent =
            timeLeft;

    }


    if (gameMessage) {

        gameMessage.style.display =
            "none";

    }


    if (continueButton) {

        continueButton.disabled =
            true;

        continueButton.classList.remove(
            "unlocked"
        );

        continueButton.classList.add(
            "locked"
        );

        continueButton.textContent =
            "Complete the game first ♡";

    }


    if (lockedMessage) {

        lockedMessage.textContent =
            "🔒 Catch 10 hearts to unlock your reward.";

    }


    document
        .querySelectorAll(
            ".falling-heart"
        )
        .forEach(heart => {

            heart.remove();

        });


    clearInterval(
        gameTimer
    );


    gameTimer =
        setInterval(
            () => {

                timeLeft--;


                if (timerElement) {

                    timerElement.textContent =
                        timeLeft;

                }


                if (timeLeft <= 0) {

                    clearInterval(
                        gameTimer
                    );

                    endGame();

                }

            },
            1000
        );


    clearInterval(
        heartSpawner
    );


    createHeart();


    heartSpawner =
        setInterval(
            () => {

                if (gameRunning) {

                    createHeart();

                }

            },
            700
        );

}


/* =====================================================
   CREATE FALLING HEART
===================================================== */

function createHeart() {

    if (!gameRunning) return;

    if (score >= MAX_SCORE) return;

    if (!gameArea) return;


    const heart =
        document.createElement(
            "div"
        );


    heart.classList.add(
        "falling-heart"
    );


    heart.textContent =
        "♡";


    const maxLeft =
        Math.max(
            gameArea.clientWidth - 40,
            0
        );


    const randomLeft =
        Math.random() * maxLeft;


    heart.style.left =
        `${randomLeft}px`;


    const randomSize =
        22 + Math.random() * 18;


    heart.style.fontSize =
        `${randomSize}px`;


    const duration =
        2.5 + Math.random() * 2;


    heart.style.animationDuration =
        `${duration}s, 1.2s`;


    heart.addEventListener(
        "click",
        () => {

            if (!gameRunning) return;

            catchHeart(heart);

        }
    );


    gameArea.appendChild(
        heart
    );


    setTimeout(
        () => {

            if (heart.parentElement) {

                heart.remove();

            }

        },
        duration * 1000
    );

}


/* =====================================================
   CATCH HEART
===================================================== */

function catchHeart(heart) {

    if (!gameRunning) return;


    heart.style.pointerEvents =
        "none";


    score++;


    updateScore();


    heart.classList.add(
        "heart-pop"
    );


    setTimeout(
        () => {

            if (heart.parentElement) {

                heart.remove();

            }

        },
        250
    );


    if (score >= MAX_SCORE) {

        completeGame();

    }

}


/* =====================================================
   COMPLETE GAME
===================================================== */

function completeGame() {

    gameRunning = false;


    clearInterval(
        gameTimer
    );


    clearInterval(
        heartSpawner
    );


    document
        .querySelectorAll(
            ".falling-heart"
        )
        .forEach(heart => {

            heart.remove();

        });


    score = MAX_SCORE;


    updateScore();


    if (timerElement) {

        timerElement.textContent =
            "✓";

    }


    document.body.classList.add(
        "game-complete"
    );


    if (congratsPopup) {

        setTimeout(
            () => {

                congratsPopup.classList.add(
                    "show"
                );

            },
            350
        );

    }

}


/* =====================================================
   END GAME
===================================================== */

function endGame() {

    gameRunning = false;


    clearInterval(
        gameTimer
    );


    clearInterval(
        heartSpawner
    );


    document
        .querySelectorAll(
            ".falling-heart"
        )
        .forEach(heart => {

            heart.remove();

        });


    if (score < MAX_SCORE) {

        if (gameMessage) {

            gameMessage.innerHTML = `

                <div class="game-message-icon">
                    ♡
                </div>

                <h2>
                    Almost there!
                </h2>

                <p>
                    You caught ${score} hearts,
                    but you need 10 to unlock
                    the next page.
                    Give it another try ♡
                </p>

                <button
                    onclick="startGame()"
                    class="game-button"
                >
                    Try Again ♡
                </button>

            `;


            gameMessage.style.display =
                "block";

        }


        if (lockedMessage) {

            lockedMessage.textContent =
                "🔒 You need 10 hearts to unlock your reward.";

        }

    }

}


/* =====================================================
   UNLOCK REWARD
===================================================== */

function unlockReward() {

    if (congratsPopup) {

        congratsPopup.classList.remove(
            "show"
        );

    }


    if (continueButton) {

        continueButton.disabled =
            false;


        continueButton.classList.remove(
            "locked"
        );


        continueButton.classList.add(
            "unlocked"
        );


        continueButton.textContent =
            "Continue to your reward!";

    }


    if (lockedMessage) {

        lockedMessage.textContent =
            "✨ You did it! The next part is yours.";

    }


    setTimeout(
        () => {

            if (continueButton) {

                continueButton.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        },
        200
    );

}


/* =====================================================
   GO TO REWARD
===================================================== */

function goToReward() {

    if (score < MAX_SCORE) {

        return;

    }


    /*
       Because game.html is inside the iframe,
       this navigation stays inside the iframe.

       The music player in index.html
       continues playing.
    */

    if (
        window.parent !== window
    ) {

        window.parent.postMessage(
            {
                type: "navigate",
                page: "photos.html"
            },
            "*"
        );

    } else {

        window.location.href =
            "photos.html";

    }

}


/* =====================================================
   HANDLE PARENT NAVIGATION
===================================================== */

window.addEventListener(
    "message",
    function(event) {

        if (!event.data) return;


        if (
            event.data.type ===
            "musicState"
        ) {

            updateMusicUI(
                event.data.playing,
                event.data.currentSong
            );

        }

    }
);


/* =====================================================
   CONGRATULATIONS POPUP
===================================================== */

if (congratsPopup) {

    congratsPopup.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                congratsPopup
            ) {

                return;

            }

        }
    );

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !gameRunning &&
            score < MAX_SCORE
        ) {

            if (!gameMessage) return;


            const startButton =
                gameMessage.querySelector(
                    "button"
                );


            if (startButton) {

                startGame();

            }

        }

    }
);
