// position.js

let position = null;

function setPosition(value) {
    position = value;
}

function getPosition() {
    return position;
}

// Export for Node.js and set on window for browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setPosition, getPosition };
} else {
    window.setPosition = setPosition;
    window.getPosition = getPosition;
}
