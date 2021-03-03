---
title: Asynchronous JavaScript - callbacks
date: 2020-10-26
tags:
    - JavaScript
    - Web development
layout: layout
---

In order to grasp all the Promises, asyncs and awaits that modern JavaScript is sugared with, first we need to answer few basic questions: what is asynchronous code and what problems does it solve?

## Synchronous code

Computer programs, .js scripts included, are executed in a synchronous way. It means, that the interpreter (in our case it's the browser) reads JavaScript code line by line: do what Johnny asked you to do in line 1, and only once you're done, move on to the line 2, and so on.

Easy to imagine, that everything should work just fine until the browser encounters a line requiring some heavy task to be performed. Whereas adding 2 and 2 should take relatively little time on a modern machine, doing the same calculation for, say, 100 000 000 times can have a serious impact on the performance. So imagine a web application which logs the classic 'Hello, World!' for three lines, then performs a heavy task (imaging a function drawing 100 000 000 photorealistic sheeps in your [canvas](https://developer.mozilla.org/en-US/docs/Glossary/Canvas) - something rather heavy for your computer to perform) and then logs 'Goodbye, World!' before finishing its rather miserable lifespan:

```javascript
console.log('Hello, World!')
console.log('Hello, World!')
console.log('Hello, World!')
drawHundredMillionSheeps()
console.log('Goodbye, World!')
```

Obviously, the first three lines will be logged to the console almost instantaneously, but the last `console.log` statement will need to wait for the sheeps to arrive. What's more, that would probably freeze your computer and make you rather unhappy about not being able to do a thing apart from desperately moving your mouse around the desk while looking at the thousandth sheep being performed by your faithful JS interpreter.

A serious bummer.

And this is what people mean when they say that 'JavaScript is single-threaded'.

Another problem arriving from this single-threadism is being apparent once your code needs to communicate with some remote server. Imagine another situation, where you run a similar code as above, with a small exception: all the sheep images need to be actually downloaded from a remote server:

```javascript
console.log('Hello, World!')
console.log('Hello, World!')
console.log('Hello, World!')
downloadHundredMillionSheeps()
console.log('Goodbye, World!')
```

Should that operation be performed in a synchronous manner, we could sometimes observe some drastic outcomes. For instance, while downloading the sheep number 9423 the network went off. Not only the rest of the sheeps stay calmly on the server but also our 'Goodbye, World!' is never shown to the user. Or, if you perform the code while being on a lonely retreat in the mountains with only poor 3G or Edge mobile connection, it would take considerably more time than while at home to get to the Goodbye log.

## Asynchronous code

The natural solution is to delegate the code to be ran in the background while other tasks are being performed. Thanks to this approach, we can still update other components of our website or app while not being blocked by the heavy functions being performed somewhere in the background. For example, if, while downloading our sheeps from the server, we would like to draw two simple cat silhouettes (completely unrelated tasks that do not depend on each other), we could imagine a following code:

```javascript
downloadHundredMillionSheeps()
/* Wait for the sheeps and then: */ console.log('Goodbye, World!')

/* in the meantime */
drawCats()
```

Neat! We just need to get our syntax right.

## Solution: Callbacks

...and this is when JavaScript creators came up with the idea of **Callbacks**.

Callback function in JavaScript is a function that is passed in another function in form of an argument to be executed later. There are two types of callback functions: synchronous and asynchronous, but here we will focus on the asynchronous ones as they are the ones that solve our problems.

In our example, we would like to run the Goodbye log ONCE the sheeps are all safe and sound on our computer. In order to do so, we need to transform the code a bit to have the full control on the timing. First, let's elaborate on the `downloadHundredMillionSheeps` function and make it accept one argument: callback function. Then, let's create a function that will say goodbye to the user as well as the blazing-fast `drawCats` function.

```javascript
function downloadHundredMillionSheeps(callback) {
    console.log('Downloading 100 000 000 sheeps')
    setTimeout(callback, 3000) // completely made-up method. Imagine it performs a request to a server that takes around 3 seconds. I'm not ashamed.
}

function sayGoodbye() {
    console.log('Goodbye, World!')
}

function drawCats() {
    console.log('CATS')
}

downloadHundredMillionSheeps(sayGoodbye)

drawCats()
```

Then let's call `downloadHundredMillionSheeps` with `sayGoodbye` as callback and then right after, add a call to `drawCats`.

```javascript
downloadHundredMillionSheeps(sayGoodbye)
drawCats()
```

Here's how the code will be executed:

1. downloadHundredMillionSheeps is called
2. Interpreter gets to downloadSheeps() method, it takes around 30 seconds
3. In the meanTime, drawCats() is performed, cats magically appear before your eyes
4. Sheeps are here, time to sayGoodbye()

Our console output would look like that:

```javascript
'Downloading 100 000 000 sheeps'

'CATS'

// nothing for 3000ms

'Goodbye, World!'
```

Beautiful! This is just one method of handling the asynchronous code. Next stop: Promises!
