---
title: Asynchronous JavaScript - promises
date: 2021-03-08
tags:
    - JavaScript
    - Web development
layout: layout
teaser: Coming back to the topic of asynchronous JavaScript. Let's figure out what promises are and how to use them.
---

In the last part I described the way the callbacks work and used to help
developers use asynchronous methods in JavaScript. This time, I will have a
closer look at the next step in the hierarchy: promises.

### Problem to solve

To wrap our head around the promises and why does it exist, we need to understand two concepts: asynchronous code and callbacks. Let's take the example from my last article. We tried then to downloadHundredMillionSheeps:

```javascript
function downloadHundredMillionSheeps(callback, error) {
    console.log('Downloading 100 000 000 sheeps')
    connectToServer(callback, error)
}

function success() {
    console.log('Success!')
}

function failure() {
    console.log('Failure...')
}

downloadHundredMillionSheeps(success, failure)
```

Our `sayGoodbye` function served as a callback passed to `downloadHundredMillionSheeps` and was to be executed when the sheeps are all safe home (in your /Downloads folder, that is).

We had to write the function that does the actual job and another one that is going, in a way, confirm that the first one is done. If we would like to know when the download operation fails, we would need to add another one - it would handle the errors, for example. Tedious, isn't it?

This is what the creators of JavaScript standard methods thought as well when they started working on Promises.

### Promises

"A Promise is an object representing the eventual completion or failure of an asynchronous operation", we can read in the [excellent article provided by MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

The above example becomes simpler when the Promises come into game

```javascript
function downloadHundredMillionSheeps(callback, error) {
    return new Promise((successCallback, failureCallback) => {
        let sheepsDownloaded
        let err
        //
        // Connect to server and download sheeps
        //
        // ...

        if (sheepsDownloaded) {
            return successCallback(sheepsDownloaded)
        } else {
            return failureCallback(err)
        }
    })
}

downloadHundredMillionSheeps()
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))
```

We can see that the downloadHundredMillionSheeps function returns a new object of `Promise` which itself has two methods - `successCallback` and `failureCallback`
