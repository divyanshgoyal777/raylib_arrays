const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function findMax(data) {
    let max = data[0];

    for (const num of data) {
        max = Math.max(max, num);
    }

    return max;
}

function calcHeight(data, maxValue, maxHeight, windowHeight) {
    const newHeights = [];

    for (const num of data) {
        newHeights.push(windowHeight - (maxHeight * (num / maxValue)));
    }

    return newHeights;
}


function isPeak(left, middle, right) {
    return middle > left && middle > right;
}

function getPeakIndicators(data) {
    const peaks = [false];

    for (let i = 1; i < data.length; i++) {
        peaks.push(isPeak(data[i - 1], data[i], data[i + 1]));
    }

    return peaks;
}

function setup() {
    const WIDTH = 500;
    const HEIGHT = 500;
    const TITLE = "Peaks";
    const FPS = 60;

    const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 91, 37, 105, 84, 149, 75, 39, 27];
    const peaks = getPeakIndicators(data);
    const maxValue = findMax(data);
    const maxHeight = HEIGHT * 0.9;
    const newHeights = calcHeight(data, maxValue, maxHeight, HEIGHT);
    const lineWidth = 20;
    const gap = 10;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH, HEIGHT, TITLE, FPS, data, maxValue, maxHeight, newHeights, lineWidth, gap, peaks
    }
}

function update() { }

function connectTopPoints(w) {
    for (let i = 0; i < w.newHeights.length - 1; i++) {
        const x = i * (w.lineWidth + w.gap);
        const v1 = { x: x + w.gap, y: w.newHeights[i] };
        const v2 = { x: x + w.lineWidth + 2 * w.gap, y: w.newHeights[i + 1] }
        r.DrawLineEx(v1, v2, 5, r.BLACK);
    }
}

function drawPeakPoint(w) {
    for (let i = 0; i < w.peaks.length - 1; i++) {
        if (w.peaks[i]) {
            const x = i * (w.lineWidth + w.gap) + w.gap;
            r.DrawCircle(x, w.newHeights[i], 5, r.RED);
        }
    }

}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    connectTopPoints(w);
    drawPeakPoint(w);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};