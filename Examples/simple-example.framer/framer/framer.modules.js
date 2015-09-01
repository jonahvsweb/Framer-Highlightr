require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"highlightr":[function(require,module,exports){
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
    return this.addListener('click', function(e) {
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
  return window.addEventListener('click', function(e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9uYWh2c3dlYi9Eb2N1bWVudHMvX0Rlc2lnbi9Qcm90b3R5cGluZy9GcmFtZXJKUy9mcmFtZXItbW9kdWxlcy9wcmVzZW50ci9GcmFtZXItSGlnaGxpZ2h0ci9FeGFtcGxlcy9leHRlbmRpbmctZXZlbnRzLmZyYW1lci9tb2R1bGVzL2hpZ2hsaWdodHIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7O2tCQUFBOztBQUFBLE1BQVksQ0FBQztBQUVaLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxlQUFDLE9BQUQsR0FBQTs7TUFBQyxVQUFRO0tBQ3JCO0FBQUEsbURBQUEsQ0FBQTs7TUFBQSxPQUFPLENBQUMsWUFBYTtLQUFyQjtBQUFBLElBQ0EsdUNBQU0sT0FBTixDQURBLENBQUE7QUFHQSxJQUFBLElBQUcsT0FBTyxDQUFDLFNBQVg7QUFDQyxNQUFBLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBQSxDQUREO0tBSlk7RUFBQSxDQUFiOztBQUFBLGtCQU9BLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDWixRQUFBLCtCQUFBO0FBQUEsSUFEYSx1R0FBZSxpQ0FDNUIsQ0FBQTtBQUFBLElBQUEsd0NBQUEsU0FBQSxDQUFBLENBQUE7V0FDQSxJQUFDLENBQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFwQixDQUF3QixRQUF4QixFQUZZO0VBQUEsQ0FQYixDQUFBOztBQUFBLGtCQVdBLFNBQUEsR0FBVyxTQUFBLEdBQUE7V0FDVixJQUFJLENBQUMsV0FBTCxDQUFpQixPQUFqQixFQUEwQixTQUFDLENBQUQsR0FBQTtBQUN6QixVQUFBLEdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBVSxJQUFBLFdBQUEsQ0FBWSxRQUFaLEVBQ1Q7QUFBQSxRQUFBLE1BQUEsRUFDQztBQUFBLFVBQUEsT0FBQSxFQUNDO0FBQUEs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RUFBUyxDQUFUO2VBREQ7QUFBQSxjQUVBLElBQUEsRUFBTSxHQUZOO0FBQUEsY0FHQSxLQUFBLEVBQU8sYUFIUDtBQUFBLGNBSUEsS0FBQSxFQUFPLEdBSlA7YUFERCxDQVRBLENBQUE7QUFBQSx5QkFnQkEsT0FBTyxDQUFDLEVBQVIsQ0FBVyxNQUFNLENBQUMsYUFBbEIsRUFBaUMsU0FBQSxHQUFBO3FCQUNoQyxJQUFJLENBQUMsT0FBTCxDQUFBLEVBRGdDO1lBQUEsQ0FBakMsRUFoQkEsQ0FKRDtXQUREO1NBQUEsTUFBQTsrQkFBQTtTQUREO0FBQUE7cUJBTkQ7S0FEZ0M7RUFBQSxDQUFqQyxFQWRvQjtBQUFBLENBOUJyQixDQUFBOztBQUFBLE9BNEVPLENBQUMsVUFBUixDQUFBLENBNUVBLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3Mgd2luZG93LkxheWVyIGV4dGVuZHMgTGF5ZXJcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0b3B0aW9ucy5oaWdobGlnaHQgPz0gZmFsc2Vcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRpZiBvcHRpb25zLmhpZ2hsaWdodFxuXHRcdFx0QF9kaXNwYXRjaCgpXG5cblx0YWRkTGlzdGVuZXI6IChldmVudE5hbWVzLi4uLCBvcmlnaW5hbExpc3RlbmVyKSA9PlxuXHRcdHN1cGVyXG5cdFx0QF9lbGVtZW50LmNsYXNzTGlzdC5hZGQgJ3BpdGNocidcblxuXHRfZGlzcGF0Y2g6IC0+XG5cdFx0dGhpcy5hZGRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cblx0XHRcdGV2dCA9IG5ldyBDdXN0b21FdmVudCAncGl0Y2hyJywgXG5cdFx0XHRcdGRldGFpbDogXG5cdFx0XHRcdFx0bWVzc2FnZTogXG5cdFx0XHRcdFx0XHR0YXJnOiBlLmN1cnJlbnRUYXJnZXRcblx0XHRcdFx0XHRcdHg6IHRoaXMueFxuXHRcdFx0XHRcdFx0eTogdGhpcy55XG5cdFx0XHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFxuXHRcdFx0XHRidWJibGVzOiB0cnVlXG5cdFx0XHRcdGNhbmNlbGFibGU6IHRydWVcblxuXHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQgZXZ0XG5cbmV4cG9ydHMua2lsbEFsbEhpZ2hsaWdodHMgPSBmYWxzZVxuXG5leHBvcnRzLmhpZ2hsaWdodHIgPSAtPlxuXHRoYXNQaXRjaHIgPSBmYWxzZVxuXHRwaXRjaHJzID0gW11cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncGl0Y2hyJywgKGUpIC0+XG5cdFx0aWYgIWV4cG9ydHMua2lsbEFsbEhpZ2hsaWdodHMgXG5cdFx0XHRsYXllckxpc3QgPSB3aW5kb3cuRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpXG5cdFx0XHRwaXRjaHJzID0gW11cblxuXHRcdFx0Zm9yIGxheWVyIGluIGxheWVyTGlzdFxuXHRcdFx0XHRpZiBsYXllci5jbGFzc0xpc3QuY29udGFpbnMgJ3BpdGNocidcblx0XHRcdFx0XHRwaXRjaHJzLnB1c2ggbGF5ZXJcblx0XHRcdFx0XHRoYXNQaXRjaHIgPSB0cnVlXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG5cdFx0aWYgIWV4cG9ydHMua2lsbEFsbEhpZ2hsaWdodHMgXG5cdFx0XHRpZiBwaXRjaHJzLmxlbmd0aCA8PSAwXG5cdFx0XHRcdGxheWVyTGlzdCA9IHdpbmRvdy5GcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGF5ZXJMaXN0ID0gcGl0Y2hyc1xuXG5cdFx0XHRmb3IgbGF5ZXIsIGkgaW4gbGF5ZXJMaXN0XG5cdFx0XHRcdGlmIGxheWVyLmNsYXNzTGlzdC5jb250YWlucyAncGl0Y2hyJ1xuXHRcdFx0XHRcdGlmIGhhc1BpdGNoclxuXHRcdFx0XHRcdFx0aWYgaSA9PSBsYXllckxpc3QubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdFx0XHRoYXNQaXRjaHIgPSBmYWxzZVxuXHRcdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0XHRob3RTcG90ID0gbmV3IExheWVyIFxuXHRcdFx0XHRcdFx0XHRuYW1lOiAnaG90U3BvdCcgKyBpXG5cdFx0XHRcdFx0XHRcdHN1cGVyTGF5ZXI6IGxheWVyLnN1cGVyTGF5ZXJcblx0XHRcdFx0XHRcdFx0eDogbGF5ZXIueCAtIDEwXG5cdFx0XHRcdFx0XHRcdHk6IGxheWVyLnkgLSAxMFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogbGF5ZXIud2lkdGggKyAyMFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IGxheWVyLmhlaWdodCArIDIwXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMTAwLCAyNDAsIDI0NCwgMC41KSdcblxuXHRcdFx0XHRcdFx0aG90U3BvdC5hbmltYXRlIFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0XHRcdFx0dGltZTogMC40XG5cdFx0XHRcdFx0XHRcdGN1cnZlOiAnZWFzZS1pbi1vdXQnXG5cdFx0XHRcdFx0XHRcdGRlbGF5OiAwLjJcblxuXHRcdFx0XHRcdFx0aG90U3BvdC5vbiBFdmVudHMuQW5pbWF0aW9uU3RvcCwgLT4gXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGVzdHJveSgpXG5cbmV4cG9ydHMuaGlnaGxpZ2h0cigpXG5cbiJdfQ==
