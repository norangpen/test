// position.js
let position = null;

function setPosition(value) {
    position = value;
}

function getPosition() {
    return position;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setPosition, getPosition };
} else {
    // Set functions on the window object for browser usage
    window.setPosition = setPosition;
    window.getPosition = getPosition;
}
