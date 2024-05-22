// position.js
let position = null;

export function setPosition(value) {
    position = value;
}

export function getPosition() {
    return position;
}

// Also set functions on the window object for browser usage
if (typeof window !== 'undefined') {
    window.setPosition = setPosition;
    window.getPosition = getPosition;
}
