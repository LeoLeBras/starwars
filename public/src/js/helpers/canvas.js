/*
 * Draw a circle
 *
 * @param {canvas} c
 * @param {int} x
 * @param {int} y
 * @param {int} size
 * @param {string} color
 */
export const drawCircle = (c, x, y, size, color) => {
    c.beginPath();
    c.arc(x, y, size / 2, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
};



/*
 * Clear a canvas
 *
 * @param {canvas} c
 */
export const clearCanvas = (c) => {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
};
