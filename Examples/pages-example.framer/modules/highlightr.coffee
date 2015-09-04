###
 | Highlightr v1.0.0 - 2015-09-02 
 | A custom Framer.js module that shows hotspots over clickable Layers in your prototype
 | https://github.com/jonahvsweb/Framer-Highlightr
 | 
 | Copyright (c) 2015 Jonah Bitautas <jonahvsweb@gmail.com> 
 | 
 | Released under the MIT license 
###
class window.Layer extends Layer

	constructor: (options={}) ->
		options.highlight ?= false
		super options

		if options.highlight
			@_dispatch()

	addListener: (eventNames..., originalListener) =>
		super
		@_element.classList.add 'pitchr'

	_dispatch: ->
		this.addListener exports.clickTap, (e) ->
			evt = new CustomEvent 'pitchr', 
				detail: 
					message: 
						targ: e.currentTarget
						x: this.x
						y: this.y
						width: this.width
						height: this.height
				bubbles: true
				cancelable: true

			e.currentTarget.dispatchEvent evt

exports.clickTap = if 'ontouchstart' of window then 'touchstart' else 'click'
exports.killAllHighlights = false

exports.highlightr = ->
	hasPitchr = false
	pitchrs = []

	window.addEventListener 'pitchr', (e) ->
		if !exports.killAllHighlights 
			layerList = window.Framer.CurrentContext.getLayers()
			pitchrs = []

			for layer in layerList
				if layer.classList.contains 'pitchr'
					pitchrs.push layer
					hasPitchr = true

	window.addEventListener exports.clickTap, (e) ->
		if !exports.killAllHighlights 
			if pitchrs.length <= 0
				layerList = window.Framer.CurrentContext.getLayers()
			else
				layerList = pitchrs

			for layer, i in layerList
				if layer.classList.contains 'pitchr'
					if hasPitchr
						if i == layerList.length - 1
							hasPitchr = false
					else 
						hotSpot = new Layer 
							name: 'hotSpot' + i
							superLayer: layer.superLayer
							x: layer.x - 10
							y: layer.y - 10
							width: layer.width + 20
							height: layer.height + 20
							backgroundColor: 'rgba(100, 240, 244, 0.5)'

						hotSpot.animate 
							properties:
								opacity: 0
							time: 0.4
							curve: 'ease-in-out'
							delay: 0.2

						hotSpot.on Events.AnimationStop, -> 
							this.destroy()

exports.highlightr()

