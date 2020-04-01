---
title: Running NPM scripts from Grunt
date:  2020-01-07
category: JavaScript
layout: layout
---

Grunt is a long-standing task runner that is somehow still present on JavaScript scene in 2020. It is somehow damaged by the rising popularity of Webpack, Gulp or Parcel, but still manages to show its capabilities when you need to do something more than just build a library or concatenate files.

I use Grunt to centralize various tasks that just need to be done during the 'build' process of my external library: building the actual package, copying files, generating documentation, .pdf files and so on. Grunt comes in handy when the tasks require different JavaScript tools to work and you don't want to let your package.json's scripts section grow to 562 lines.

Recently I came up with the idea to actually pass many tasks that are normally executed from terminal to Grunt so it incorporates it in my usual flow. But hey, how do I actually run a shell or NPM script from Grunt?

Here's where [grunt-exec](https://www.npmjs.com/package/grunt-exec) plugin comes in handy. It basically tells Grunt to run a given command as if you would run it from the terminal.

Let's say I want to run an `echo "Hello, world!"` command, here's how to do it:

1. Install `grunt-exec` plugin:
```sh
npm i -D grunt-exec
```
2. Load it into **Gruntfile.js**:
```sh
grunt.loadNpmTasks('grunt-exec');
```
3. Update Gruntfile with the string of a command that is to be ran by Grunt:
```JavaScript
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
	exec: {
	  echo_something: 'echo "Hello, world!"'
	}
  });

  grunt.registerTask('echo', [ 'exec:echo_something' ]);

4. Run the new Grunt task from the terminal:
```sh
grunt echo
```

And that's it! `grunt-exec` has more powerful options to automate plenty of tasks, for example it can `cd` into a subfolder and run `npm install` inside of it:

**Gruntfile.js**
```javascript
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
	exec: {
	  echo_something: {
		cwd: './dependencies_folder/',
		cmd: "npm install"
	  }
	}
  });

  grunt.registerTask('installDependencies', [ 'exec:installDependencies' ]);

};
```
