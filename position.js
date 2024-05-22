// position.js

let position = null;

function setPosition(value) {
    position = value;
}

function getPosition() {
    return position;
}

// Set functions on the window object for browser usage
window.setPosition = setPosition;
window.getPosition = getPosition;

// Also export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setPosition, getPosition };
}
