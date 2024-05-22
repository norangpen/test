const { setPosition } = require('./position.js');

const positions = ["¿øÀ§Ä¡", "1¹ø ÁÂÇ¥", "2¹ø ÁÂÇ¥", "3¹ø ÁÂÇ¥", "4¹ø ÁÂÇ¥"];

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