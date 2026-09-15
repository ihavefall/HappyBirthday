/* ========================================
   MUSIC PLAYER
======================================== */

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

const audio = document.getElementById("audioPlayer");
const vinyl = document.getElementById("vinyl");
const playBtn = document.getElementById("playBtn");

function loadSong(index) {
    if (!audio) return;
    
    currentSong = index;
    audio.src = songs[index].file;

    const title = document.getElementById("songTitle");
    const artist = document.getElementById("songArtist");

    if (title) title.textContent = songs[index].title;
    if (artist) artist.textContent = songs[index].artist;

    document.querySelectorAll(".track").forEach((track, i) => {
        track.classList.toggle("active", i === index);
    });
}

function updateUI(isPlaying) {
    if (vinyl) {
        if (isPlaying) vinyl.classList.add("playing");
        else vinyl.classList.remove("playing");
    }
    if (playBtn) {
        playBtn.textContent = isPlaying ? "❚❚" : "▶";
    }
}

function toggleMusic() {
    if (!audio) return;

    if (audio.paused) {
        audio.play();
        updateUI(true);
    } else {
        audio.pause();
        updateUI(false);
    }
}

function selectSong(index) {
    if (!audio) return;
    loadSong(index);
    audio.play();
    updateUI(true);
}

function nextSong() {
    if (!audio) return;
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    selectSong(currentSong);
}

function previousSong() {
    if (!audio) return;
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    selectSong(currentSong);
}

/* ========================================
   CONTINUOUS PLAYBACK LOGIC
======================================== */

if (audio) {
    audio.addEventListener("ended", nextSong);

    // 1. Simpan detik dan status musik setiap kali berputar
    audio.addEventListener("timeupdate", () => {
        localStorage.setItem("savedMusicIndex", currentSong);
        localStorage.setItem("savedMusicTime", audio.currentTime);
        localStorage.setItem("isMusicPlaying", !audio.paused);
    });

    // 2. Saat pindah halaman, cek apakah ada musik yang sebelumnya diputar
    const savedIndex = localStorage.getItem("savedMusicIndex");
    const savedTime = localStorage.getItem("savedMusicTime");
    const isPlaying = localStorage.getItem("isMusicPlaying");

    if (savedIndex !== null) {
        // Lanjutkan dari detik terakhir
        loadSong(parseInt(savedIndex));
        audio.currentTime = parseFloat(savedTime);

        // Jika sebelumnya dalam kondisi "Play", otomatis putar lagi
        if (isPlaying === "true") {
            audio.play().then(() => {
                updateUI(true);
            }).catch(() => {
                // Catatan: Kadang browser memblokir autoplay jika berpindah halaman terlalu cepat
                console.log("Autoplay diblokir browser, menunggu interaksi.");
                updateUI(false);
            });
        } else {
            updateUI(false);
        }
    } else {
        // Jika ini halaman pertama kali dibuka
        loadSong(0);
    }
}

/* ========================================
   PHOTO MODAL
======================================== */

const photos =
    document.querySelectorAll(".photo-card");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");


photos.forEach(photo => {

    photo.addEventListener("click", () => {

        const image =
            photo.querySelector("img");

        if (!imageModal || !modalImage) return;

        modalImage.src = image.src;

        imageModal.classList.add("show");

    });

});


function closeImage() {

    if (imageModal) {
        imageModal.classList.remove("show");
    }

}


if (imageModal) {

    imageModal.addEventListener(
        "click",
        event => {

            if (event.target === imageModal) {
                closeImage();
            }

        }
    );

}



/* ========================================
   10 REASONS
======================================== */

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


function showReason(number) {

    const popup =
        document.getElementById("reasonPopup");

    const reasonNumber =
        document.getElementById("reasonNumber");

    const reasonTitle =
        document.getElementById("reasonTitle");

    const reasonText =
        document.getElementById("reasonText");


    if (!popup) return;


    reasonNumber.textContent =
        String(number).padStart(2, "0");

    reasonTitle.textContent =
        reasons[number].title;

    reasonText.textContent =
        reasons[number].text;


    popup.classList.add("show");
}


function closeReason() {

    const popup =
        document.getElementById("reasonPopup");

    if (popup) {
        popup.classList.remove("show");
    }

}



/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let score = 0;

const MAX_SCORE = 10;

let timeLeft = 30;

let gameRunning = false;

let gameTimer = null;

let heartSpawner = null;


/* =====================================================
   ELEMENTS
===================================================== */

const scoreElement = document.getElementById("score");

const timerElement = document.getElementById("timer");

const progressFill = document.getElementById("progressFill");

const progressText = document.getElementById("progressText");

const gameArea = document.getElementById("gameArea");

const gameMessage = document.getElementById("gameMessage");

const congratsPopup = document.getElementById("congratsPopup");

const continueButton = document.getElementById("continueButton");

const lockedMessage = document.getElementById("lockedMessage");


/* =====================================================
   UPDATE SCORE
===================================================== */

function updateScore() {

    scoreElement.textContent = score;

    progressText.textContent =
        `${score} / ${MAX_SCORE}`;

    const percentage =
        (score / MAX_SCORE) * 100;

    progressFill.style.width =
        `${percentage}%`;

}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    // Reset values
    score = 0;

    timeLeft = 30;

    gameRunning = true;

    updateScore();

    timerElement.textContent = timeLeft;

    // Hide starting message
    gameMessage.style.display = "none";

    // Disable continue button
    continueButton.disabled = true;

    continueButton.classList.remove("unlocked");

    continueButton.classList.add("locked");

    continueButton.textContent =
        "Complete the game first ♡";

    lockedMessage.textContent =
        "🔒 Catch 10 hearts to unlock your reward.";

    // Remove any old hearts
    document
        .querySelectorAll(".falling-heart")
        .forEach(heart => heart.remove());

    // Start timer
    clearInterval(gameTimer);

    gameTimer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(gameTimer);

            endGame();

        }

    }, 1000);

    // Start creating hearts
    clearInterval(heartSpawner);

    createHeart();

    heartSpawner = setInterval(() => {

        if (gameRunning) {

            createHeart();

        }

    }, 700);

}


/* =====================================================
   CREATE FALLING HEART
===================================================== */

function createHeart() {

    if (!gameRunning) return;

    if (score >= MAX_SCORE) return;

    const heart = document.createElement("div");

    heart.classList.add("falling-heart");

    heart.textContent = "♡";

    // Random horizontal position
    const maxLeft =
        gameArea.clientWidth - 40;

    const randomLeft =
        Math.random() * maxLeft;

    heart.style.left =
        `${randomLeft}px`;

    // Random size
    const randomSize =
        22 + Math.random() * 18;

    heart.style.fontSize =
        `${randomSize}px`;

    // Random falling speed
    const duration =
        2.5 + Math.random() * 2;

    heart.style.animationDuration =
        `${duration}s, 1.2s`;

    // Click heart
    heart.addEventListener("click", () => {

        if (!gameRunning) return;

        catchHeart(heart);

    });

    gameArea.appendChild(heart);

    // Remove after animation
    setTimeout(() => {

        if (heart.parentElement) {

            heart.remove();

        }

    }, duration * 1000);

}


/* =====================================================
   CATCH HEART
===================================================== */

function catchHeart(heart) {

    if (!gameRunning) return;

    // Prevent double click
    heart.style.pointerEvents = "none";

    // Increase score
    score++;

    updateScore();

    // Pop animation
    heart.classList.add("heart-pop");

    setTimeout(() => {

        if (heart.parentElement) {

            heart.remove();

        }

    }, 250);

    // Check if player reached 10
    if (score >= MAX_SCORE) {

        completeGame();

    }

}


/* =====================================================
   COMPLETE GAME
===================================================== */

function completeGame() {

    gameRunning = false;

    clearInterval(gameTimer);

    clearInterval(heartSpawner);

    // Remove remaining hearts
    document
        .querySelectorAll(".falling-heart")
        .forEach(heart => {

            heart.remove();

        });

    // Make sure score is exactly 10
    score = MAX_SCORE;

    updateScore();

    timerElement.textContent = "✓";

    // Add completed class
    document.body.classList.add("game-complete");

    // Show congratulations popup
    setTimeout(() => {

        congratsPopup.classList.add("show");

    }, 350);

}


/* =====================================================
   END GAME
===================================================== */

function endGame() {

    gameRunning = false;

    clearInterval(gameTimer);

    clearInterval(heartSpawner);

    document
        .querySelectorAll(".falling-heart")
        .forEach(heart => heart.remove());

    if (score < MAX_SCORE) {

        gameMessage.innerHTML = `
            <div class="game-message-icon">♡</div>

            <h2>Almost there!</h2>

            <p>
                You caught ${score} hearts,
                but you need 10 to unlock the next page.
                Give it another try ♡
            </p>

            <button
                onclick="startGame()"
                class="game-button"
            >
                Try Again ♡
            </button>
        `;

        gameMessage.style.display = "block";

        lockedMessage.textContent =
            "🔒 You need 10 hearts to unlock your reward.";

    }

}


/* =====================================================
   UNLOCK REWARD
===================================================== */

function unlockReward() {

    congratsPopup.classList.remove("show");

    continueButton.disabled = false;

    continueButton.classList.remove("locked");

    continueButton.classList.add("unlocked");

    continueButton.textContent =
        "Continue to your reward!";

    lockedMessage.textContent =
        "✨ You did it! The next part is yours.";

    // Small delay so popup closes before button changes
    setTimeout(() => {

        continueButton.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* =====================================================
   GO TO NEXT PAGE
===================================================== */

function goToReward() {

    if (score < MAX_SCORE) {

        return;

    }

    /*
        Change this filename if you want
        the reward to be a different page.

        Example:
        photos.html
        reasons.html
        final.html
    */

    window.location.href = "photos.html";

}


/* =====================================================
   CLOSE POPUP IF CLICKING OUTSIDE
===================================================== */

congratsPopup.addEventListener("click", function(event) {

    if (event.target === congratsPopup) {

        // Don't let her accidentally skip
        // the congratulations/reward step.

        return;

    }

});


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener("keydown", function(event) {

    // Press Enter to start if the game hasn't started
    if (
        event.key === "Enter" &&
        !gameRunning &&
        score < MAX_SCORE
    ) {

        const startButton =
            gameMessage.querySelector("button");

        if (startButton) {

            startGame();

        }

    }

});
