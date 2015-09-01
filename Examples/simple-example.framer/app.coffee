# Import Highlightr module
hl = require 'highlightr'

bg = new BackgroundLayer
	backgroundColor: "#28affa"

constraints = new Layer 
	width: 300
	height: 150
	backgroundColor: "rgba(255,255,255, 0.2)"
	borderRadius: 6

layerA = new Layer
	width: 150
	height: 150
	backgroundColor: "#fff"
	borderRadius: 4
	highlight: true # Show hit area with Highlightr
	
layerB = new Layer
	x: 170
	y: 100
	width: 150
	height: 150
	backgroundColor: "#fff"
	borderRadius: 4
	
layerC = new Layer
	x: 170
	y: 450
	width: 150
	height: 150
	backgroundColor: "#fff"
	borderRadius: 4
	highlight: true # Show hit area with Highlightr

layerD = new Layer
	x: 340
	y: 450
	width: 150
	height: 150
	backgroundColor: "#fff"
	borderRadius: 4
	highlight: true # Show hit area with Highlightr

constraints.center()
layerA.centerX(-75)
layerA.centerY()
layerA.draggable.enabled = true
layerA.draggable.constraints = constraints.frame
