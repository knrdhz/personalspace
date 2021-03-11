---
title: Squared Lines
date: 2019-07-30
tags:
    - Generative
    - Art
layout: layout
teaser: Commodore 64 classic 10 print code in JS canvas
---

First experiments with generative art. A cover of Commodore 64's 10 print. I find it unbelievably interesting to read about the history of such programs. Could you imagine, that the thing below was generated originally by a single one-liner?

```
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
RUN
```

<canvas></canvas>

<script>
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var size = 300;
var step = 10;
var dpr = window.devicePixelRatio;
canvas.width = size;
canvas.height = size;
context.scale(1, 1);

context.lineCap = "square";
context.width = 2;

function draw(x, y, width, height) {
	var leftToRight = Math.random() >= 0.5;

	if(leftToRight) {
		context.moveTo(x, y);
		context.lineTo(x + width, y + height);
	} else {
		context.moveTo(x + width, y);
		context.lineTo(x, y + height);
	}
	context.stroke();
}

for (var x = 0; x < size; x+= step) {
	for (var y = 0; y < size; y += step) {
		draw(x, y, step, step)
	}
}
</script>
