// randomPosition.js

const positions = ["원위치", "1번 좌표", "2번 좌표", "3번 좌표", "4번 좌표"];

function getRandomPosition() {
    const randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
}

function updatePosition() {
    const newPosition = getRandomPosition();
    window.setPosition(newPosition);
    console.log(`New Position Set: ${newPosition}`);
}

window.setInterval(updatePosition, 3000);
