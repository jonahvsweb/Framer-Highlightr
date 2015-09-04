require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"highlightr":[function(require,module,exports){

/*
 | Highlightr v1.0.0 - 2015-09-02 
 | A custom Framer.js module that shows hotspots over clickable Layers in your prototype
 | https://github.com/jonahvsweb/Framer-Highlightr
 | 
 | Copyright (c) 2015 Jonah Bitautas <jonahvsweb@gmail.com> 
 | 
 | Released under the MIT license
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

window.Layer = (function(superClass) {
  extend(Layer, superClass);

  function Layer(options) {
    if (options == null) {
      options = {};
    }
    this.addListener = bind(this.addListener, this);
    if (options.highlight == null) {
      options.highlight = false;
    }
    Layer.__super__.constructor.call(this, options);
    if (options.highlight) {
      this._dispatch();
    }
  }

  Layer.prototype.addListener = function() {
    var eventNames, j, originalListener;
    eventNames = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), originalListener = arguments[j++];
    Layer.__super__.addListener.apply(this, arguments);
    return this._element.classList.add('pitchr');
  };

  Layer.prototype._dispatch = function() {
    return this.addListener(exports.clickTap, function(e) {
      var evt;
      evt = new CustomEvent('pitchr', {
        detail: {
          message: {
            targ: e.currentTarget,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
          }
        },
        bubbles: true,
        cancelable: true
      });
      return e.currentTarget.dispatchEvent(evt);
    });
  };

  return Layer;

})(Layer);

exports.clickTap = 'ontouchstart' in window ? 'touchstart' : 'click';

exports.killAllHighlights = false;

exports.highlightr = function() {
  var hasPitchr, pitchrs;
  hasPitchr = false;
  pitchrs = [];
  window.addEventListener('pitchr', function(e) {
    var j, layer, layerList, len, results;
    if (!exports.killAllHighlights) {
      layerList = window.Framer.CurrentContext.getLayers();
      pitchrs = [];
      results = [];
      for (j = 0, len = layerList.length; j < len; j++) {
        layer = layerList[j];
        if (layer.classList.contains('pitchr')) {
          pitchrs.push(layer);
          results.push(hasPitchr = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  });
  return window.addEventListener(exports.clickTap, function(e) {
    var hotSpot, i, j, layer, layerList, len, results;
    if (!exports.killAllHighlights) {
      if (pitchrs.length <= 0) {
        layerList = window.Framer.CurrentContext.getLayers();
      } else {
        layerList = pitchrs;
      }
      results = [];
      for (i = j = 0, len = layerList.length; j < len; i = ++j) {
        layer = layerList[i];
        if (layer.classList.contains('pitchr')) {
          if (hasPitchr) {
            if (i === layerList.length - 1) {
              results.push(hasPitchr = false);
            } else {
              results.push(void 0);
            }
          } else {
            hotSpot = new Layer({
              name: 'hotSpot' + i,
              superLayer: layer.superLayer,
              x: layer.x - 10,
              y: layer.y - 10,
              width: layer.width + 20,
              height: layer.height + 20,
              backgroundColor: 'rgba(100, 240, 244, 0.5)'
            });
            hotSpot.animate({
              properties: {
                opacity: 0
              },
              time: 0.4,
              curve: 'ease-in-out',
              delay: 0.2
            });
            results.push(hotSpot.on(Events.AnimationStop, function() {
              return this.destroy();
            }));
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  });
};

exports.highlightr();



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9uYWh2c3dlYi9Eb2N1bWVudHMvX0Rlc2lnbi9Qcm90b3R5cGluZy9GcmFtZXJKUy9mcmFtZXItbW9kdWxlcy9oaWdobGlnaHRyL0ZyYW1lci1IaWdobGlnaHRyL0V4YW1wbGVzL3BhZ2VzLWV4YW1wbGUuZnJhbWVyL21vZHVsZXMvaGlnaGxpZ2h0ci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUFBOzs7Ozs7OztHQUFBO0FBQUEsSUFBQTs7O2tCQUFBOztBQUFBLE1BU1ksQ0FBQztBQUVaLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxlQUFDLE9BQUQsR0FBQTs7TUFBQyxVQUFRO0tBQ3JCO0FBQUEsbURBQUEsQ0FBQTs7TUFBQSxPQUFPLENBQUMsWUFBYTtLQUFyQjtBQUFBLElBQ0EsdUNBQU0sT0FBTixDQURBLENBQUE7QUFHQSxJQUFBLElBQUcsT0FBTyxDQUFDLFNBQVg7QUFDQyxNQUFBLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBQSxDQUREO0tBSlk7RUFBQSxDQUFiOztBQUFBLGtCQU9BLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDWixRQUFBLCtCQUFBO0FBQUEsSUFEYSx1R0FBZSxpQ0FDNUIsQ0FBQTtBQUFBLElBQUEsd0NBQUEsU0FBQSxDQUFBLENBQUE7V0FDQSxJQUFDLENBQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFwQixDQUF3QixRQUF4QixFQUZZO0VBQUEsQ0FQYixDQUFBOztBQUFBLGtCQVdBLFNBQUEsR0FBVyxTQUFBLEdBQUE7V0FDVixJQUFJLENBQUMsV0FBTCxDQUFpQixPQUFPLENBQUMsUUFBekIsRUFBbUMsU0FBQyxDQUFELEdBQUE7QUFDbEMsVUFBQSxHQUFBO0FBQUEsTUFBQSxHQUFBLEdBQVUsSUFBQSxXQUFBLENBQVksUUFBWixFQUNUO0FBQUEsUUFBQSxNQUFB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LEVBTHZCO0FBQUEsY0FNQSxlQUFBLEVBQWlCLDBCQU5qQjthQURhLENBQWQsQ0FBQTtBQUFBLFlBU0EsT0FBTyxDQUFDLE9BQVIsQ0FDQztBQUFBLGNBQUEsVUFBQSxFQUNDO0FBQUEsZ0JBQUEsT0FBQSxFQUFTLENBQVQ7ZUFERDtBQUFBLGNBRUEsSUFBQSxFQUFNLEdBRk47QUFBQSxjQUdBLEtBQUEsRUFBTyxhQUhQO0FBQUEsY0FJQSxLQUFBLEVBQU8sR0FKUDthQURELENBVEEsQ0FBQTtBQUFBLHlCQWdCQSxPQUFPLENBQUMsRUFBUixDQUFXLE1BQU0sQ0FBQyxhQUFsQixFQUFpQyxTQUFBLEdBQUE7cUJBQ2hDLElBQUksQ0FBQyxPQUFMLENBQUEsRUFEZ0M7WUFBQSxDQUFqQyxFQWhCQSxDQUpEO1dBREQ7U0FBQSxNQUFBOytCQUFBO1NBREQ7QUFBQTtxQkFORDtLQUR5QztFQUFBLENBQTFDLEVBZG9CO0FBQUEsQ0F4Q3JCLENBQUE7O0FBQUEsT0FzRk8sQ0FBQyxVQUFSLENBQUEsQ0F0RkEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyNcbiB8IEhpZ2hsaWdodHIgdjEuMC4wIC0gMjAxNS0wOS0wMiBcbiB8IEEgY3VzdG9tIEZyYW1lci5qcyBtb2R1bGUgdGhhdCBzaG93cyBob3RzcG90cyBvdmVyIGNsaWNrYWJsZSBMYXllcnMgaW4geW91ciBwcm90b3R5cGVcbiB8IGh0dHBzOi8vZ2l0aHViLmNvbS9qb25haHZzd2ViL0ZyYW1lci1IaWdobGlnaHRyXG4gfCBcbiB8IENvcHlyaWdodCAoYykgMjAxNSBKb25haCBCaXRhdXRhcyA8am9uYWh2c3dlYkBnbWFpbC5jb20+IFxuIHwgXG4gfCBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgXG4jIyNcbmNsYXNzIHdpbmRvdy5MYXllciBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMuaGlnaGxpZ2h0ID89IGZhbHNlXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0aWYgb3B0aW9ucy5oaWdobGlnaHRcblx0XHRcdEBfZGlzcGF0Y2goKVxuXG5cdGFkZExpc3RlbmVyOiAoZXZlbnROYW1lcy4uLiwgb3JpZ2luYWxMaXN0ZW5lcikgPT5cblx0XHRzdXBlclxuXHRcdEBfZWxlbWVudC5jbGFzc0xpc3QuYWRkICdwaXRjaHInXG5cblx0X2Rpc3BhdGNoOiAtPlxuXHRcdHRoaXMuYWRkTGlzdGVuZXIgZXhwb3J0cy5jbGlja1RhcCwgKGUpIC0+XG5cdFx0XHRldnQgPSBuZXcgQ3VzdG9tRXZlbnQgJ3BpdGNocicsIFxuXHRcdFx0XHRkZXRhaWw6IFxuXHRcdFx0XHRcdG1lc3NhZ2U6IFxuXHRcdFx0XHRcdFx0dGFyZzogZS5jdXJyZW50VGFyZ2V0XG5cdFx0XHRcdFx0XHR4OiB0aGlzLnhcblx0XHRcdFx0XHRcdHk6IHRoaXMueVxuXHRcdFx0XHRcdFx0d2lkdGg6IHRoaXMud2lkdGhcblx0XHRcdFx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHRcblx0XHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdFx0XHRjYW5jZWxhYmxlOiB0cnVlXG5cblx0XHRcdGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50IGV2dFxuXG5leHBvcnRzLmNsaWNrVGFwID0gaWYgJ29udG91Y2hzdGFydCcgb2Ygd2luZG93IHRoZW4gJ3RvdWNoc3RhcnQnIGVsc2UgJ2NsaWNrJ1xuZXhwb3J0cy5raWxsQWxsSGlnaGxpZ2h0cyA9IGZhbHNlXG5cbmV4cG9ydHMuaGlnaGxpZ2h0ciA9IC0+XG5cdGhhc1BpdGNociA9IGZhbHNlXG5cdHBpdGNocnMgPSBbXVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdwaXRjaHInLCAoZSkgLT5cblx0XHRpZiAhZXhwb3J0cy5raWxsQWxsSGlnaGxpZ2h0cyBcblx0XHRcdGxheWVyTGlzdCA9IHdpbmRvdy5GcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblx0XHRcdHBpdGNocnMgPSBbXVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gbGF5ZXJMaXN0XG5cdFx0XHRcdGlmIGxheWVyLmNsYXNzTGlzdC5jb250YWlucyAncGl0Y2hyJ1xuXHRcdFx0XHRcdHBpdGNocnMucHVzaCBsYXllclxuXHRcdFx0XHRcdGhhc1BpdGNociA9IHRydWVcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBleHBvcnRzLmNsaWNrVGFwLCAoZSkgLT5cblx0XHRpZiAhZXhwb3J0cy5raWxsQWxsSGlnaGxpZ2h0cyBcblx0XHRcdGlmIHBpdGNocnMubGVuZ3RoIDw9IDBcblx0XHRcdFx0bGF5ZXJMaXN0ID0gd2luZG93LkZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsYXllckxpc3QgPSBwaXRjaHJzXG5cblx0XHRcdGZvciBsYXllciwgaSBpbiBsYXllckxpc3Rcblx0XHRcdFx0aWYgbGF5ZXIuY2xhc3NMaXN0LmNvbnRhaW5zICdwaXRjaHInXG5cdFx0XHRcdFx0aWYgaGFzUGl0Y2hyXG5cdFx0XHRcdFx0XHRpZiBpID09IGxheWVyTGlzdC5sZW5ndGggLSAxXG5cdFx0XHRcdFx0XHRcdGhhc1BpdGNociA9IGZhbHNlXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdGhvdFNwb3QgPSBuZXcgTGF5ZXIgXG5cdFx0XHRcdFx0XHRcdG5hbWU6ICdob3RTcG90JyArIGlcblx0XHRcdFx0XHRcdFx0c3VwZXJMYXllcjogbGF5ZXIuc3VwZXJMYXllclxuXHRcdFx0XHRcdFx0XHR4OiBsYXllci54IC0gMTBcblx0XHRcdFx0XHRcdFx0eTogbGF5ZXIueSAtIDEwXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiBsYXllci53aWR0aCArIDIwXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogbGF5ZXIuaGVpZ2h0ICsgMjBcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgxMDAsIDI0MCwgMjQ0LCAwLjUpJ1xuXG5cdFx0XHRcdFx0XHRob3RTcG90LmFuaW1hdGUgXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHRcdFx0XHR0aW1lOiAwLjRcblx0XHRcdFx0XHRcdFx0Y3VydmU6ICdlYXNlLWluLW91dCdcblx0XHRcdFx0XHRcdFx0ZGVsYXk6IDAuMlxuXG5cdFx0XHRcdFx0XHRob3RTcG90Lm9uIEV2ZW50cy5BbmltYXRpb25TdG9wLCAtPiBcblx0XHRcdFx0XHRcdFx0dGhpcy5kZXN0cm95KClcblxuZXhwb3J0cy5oaWdobGlnaHRyKClcblxuIl19
