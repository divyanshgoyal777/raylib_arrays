const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function findMax(data) {
    let max = -Infinity;

    for (const num of data) {
        max = num >= max ? num : max;
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

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const TITLE = "Averages";
    const FPS = 60;

    const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
    const maxValue = findMax(data);
    const maxHeight = HEIGHT * 0.9;
    const newHeights = calcHeight(data, maxValue, maxHeight, HEIGHT);
    const barWidth = 20;
    const gap = 4;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH, HEIGHT, TITLE, FPS, data, maxValue, maxHeight, newHeights, barWidth, gap
    }
}

function update() { }

function calcAverage(data) {
    let sum = 0;

    for (const num of data) {
        sum += num;
    }

    return sum / data.length;
}

function drawAvgLine(windowWidth, newHeights) {
    const avg = calcAverage(newHeights);

    r.DrawLine(0, avg, windowWidth, avg, r.RED);
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    for (let i = 0; i < w.newHeights.length; i++) {
        const x = i * (w.barWidth + w.gap);
        r.DrawRectangle(x, w.newHeights[i], w.barWidth, w.HEIGHT, r.DARKBLUE);
    }

    drawAvgLine(w.WIDTH, w.newHeights);
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