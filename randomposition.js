const { setPosition } = require('./position.js');

const positions = ["����ġ", "1�� ��ǥ", "2�� ��ǥ", "3�� ��ǥ", "4�� ��ǥ"];

function getRandomPosition() {
    const randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
}

function updatePosition() {
    const newPosition = getRandomPosition();
    setPosition(newPosition);
    console.log(`New Position Set: ${newPosition}`);
}

setInterval(updatePosition, 3000);