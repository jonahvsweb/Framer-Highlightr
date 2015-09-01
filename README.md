# Highlightr (Framer.js Module)

A custom [Framer.js](http://framerjs.com/) module that shows hotspots over clickable `Layer`s in your prototype.

This module is useful when creating more complex Framer prototypes that have multiple states/screens by showing what is clickable within the prototype. The nice part is that the hotspots only show when you click on something that is not clickable.

Highlightr is very easy to implement and is great for user testing, presentations and client reviews.

This module was inspired by [Invision App](http://www.invisionapp.com)'s hotspots feature. 

![Highlightr in action](http://jonahvsweb.com/in-the-lab/lib/highlightr/highlightr-intro.gif "Highlightr in action")

**Live Demo: [View](http://jonahvsweb.com/in-the-lab/lib/highlightr/pages-example/)**

## Installation
Download `highlightr.coffee` and copy it into the `modules` directory of your project. There are no other dependencies:

![How to install Highlightr](http://jonahvsweb.com/in-the-lab/lib/highlightr/where-to-install-highlightr.png "How to install Highlightr")

## Quick Start/How to Use
After you install the script you simply initialize Highlightr towards the beginning of your project: 

```coffeescript
hl = require "highlightr"
```

Once you do that, it's up to you to define which `Layer`s in your prototype are going to have a hotspot. So if there's a `Layer` that has a `Events.Click' listener attached to it, you would set `highlight` to `true` in the `Layer`s properties when you are defining it. The code might look something like this: 

```coffeescript
clickable = new Layer
	x: 20
	y: 20
	width: 300
	height: 100
	backgroundColor: "#F1F1F1"
	highlight: true # Show hit area with Highlightr
```

**That's it!** 

The nice part is that the hotspots only show when you click on something that is not clickable.

[Simple Demo with Project Code Download](http://share.framerjs.com/80xz3qhm34gn/)

The intention was to make this custom module as easy to integrate as possible. That's why I extended the current `Layer` class instead of creating a new Class within the Framer namespace. This makes it easy to use this module for previous prototypes that you've built with Framer. 

## Uninstall

It is very simple to remove Highlightr. To uninstall, you just need to delete any mentions of:

```coffeescript
highlight: true
```

on any `Layer`s and delete the import statement: 

```coffeescript
hl = require "highlightr"
```

## Options
Highlightr will have more options for small customizations coming soon. Check the roadmap for updates on what's to come. 

#### Kill All Highlights
If you would like to quickly kill all the highlights throughout the prototype without having to manually delete all the lines of `highlight: true` on each `Layer` then call the `killAllHighlights` property and set it to `true`.

Default value: `'false'`
```coffeescript
hl.killAllHighlights = true
```

`hl` represents whatever you define Highlightr as when you `require` it in the beginning of your project.

## Release Notes
**Highlightr 1.0**   
– Initial Release       

*This is in active development.*

## Roadmap
- Allow customization of the hotspot color.
- Integrate use for imported Sketch and Photoshop files.
- Add keyboard shortcut to enable/disable script from a browser.

## Feedback
If you discover any issues please first check [open/past issues](https://github.com/jonahvsweb/Framer-Highlightr/issues) or [open a new issue](https://github.com/jonahvsweb/Framer-Highlightr/issues/new) if one does not already exist.

If you have any questions regarding usage, please send a message to me here on GitHub, [@jonahvsweb](https://twitter.com/jonahvsweb) on Twitter or from my website, [jonahvsweb.com](http://jonahvsweb.com).