const sketch = require("./averages");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
}

main();