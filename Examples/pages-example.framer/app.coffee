# Import Highlightr module
hl = require "highlightr"

hl.killAllHighlights = true

sketch = Framer.Importer.load "imported/page-simple"
buttons = []

page = new PageComponent
	width: Screen.width, height: Screen.height
	y: 128, scrollVertical: false
	contentInset: {top: 32, left: 0, right: 32}

card1 = new Layer 
	backgroundColor: "#fff", borderRadius: 8
	width: page.width - 64, height: 1040 
	x: 32, superLayer: page.content
card1.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

clickable = new Layer
	x: 20
	y: 20
	width: card1.width - 40
	height: card1.height * 0.5 - 30
	superLayer: card1
	backgroundColor: "#F1F1F1"
	highlight: true # Show hit area with Highlightr
clickable.on Events.Click, (e) ->
	card1.animate
		properties:
			x: -(card1.width)
		curve:'cubic-bezier(0.215, 0.61, 0.355, 1)'
		time: 0.3
		
	card2.animate
		properties:
			x: 32
		curve:'cubic-bezier(0.215, 0.61, 0.355, 1)'
		time: 0.3

nonClickable = new Layer
	x: 20
	y: (clickable.y + clickable.height) + 20
	width: card1.width - 40
	height: card1.height * 0.5 - 30
	superLayer: card1
	backgroundColor: "#F1F1F1"
	
card2 = new Layer 
	backgroundColor: "#fff", borderRadius: 8
	width: page.width - 64, height: 1040 
	x: page.width, superLayer: page.content
card2.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

nonclickableC2 = new Layer
	x: 20
	y: 20
	width: card2.width - 40
	height: card2.height / 3 - 30
	superLayer: card2
	backgroundColor: "#F1F1F1"

clickableC2 = new Layer
	x: 20
	y: (nonclickableC2.y + nonclickableC2.height) + 20
	width: card2.width - 40
	height: card2.height / 3 - 30
	superLayer: card2
	backgroundColor: "#F1F1F1"
	highlight: true
clickableC2.on Events.Click, (e) ->
	card2.animate
		properties:
			x: page.width
		curve:'cubic-bezier(0.215, 0.61, 0.355, 1)'
		time: 0.3
		
	card1.animate
		properties:
			x: 32
		curve:'cubic-bezier(0.215, 0.61, 0.355, 1)'
		time: 0.3
	
clickableC3 = new Layer
	x: 20
	y: (clickableC2.y + clickableC2.height) + 20
	width: card2.width - 40
	height: card2.height / 3 - 30
	superLayer: card2
	backgroundColor: "#F1F1F1"
# 	highlight: true

buttons.push clickable, clickableC2, clickableC3

for layer, i in buttons
	layer.on Events.Click, (e) ->
# 		print "I'm a button."