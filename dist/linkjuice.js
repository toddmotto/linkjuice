/*! linkjuice v1.0.0 | (c) 2016 @toddmotto | https://github.com/toddmotto/linkjuice */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.linkjuice = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var scope = void 0,
      nodes = void 0,
      inject = void 0;

  var wrapNode = function wrapNode(node) {
    var a = document.createElement('a');
    a.href = '#' + node.id;
    if (!a.href) {
      console.warn('No ID for element', a);
      return;
    }
    a.className = 'linkjuice';
    a.innerHTML = '<span class="linkjuice-icon">' + inject + '</span>' + node.innerHTML;
    node.innerHTML = '';
    node.appendChild(a);
  };

  var linkjuice = function linkjuice(mount, _ref) {
    var _ref$icon = _ref.icon;
    var icon = _ref$icon === undefined ? '#' : _ref$icon;
    var _ref$selectors = _ref.selectors;
    var selectors = _ref$selectors === undefined ? ['h2', 'h3', 'h4', 'h5', 'h6'] : _ref$selectors;

    scope = document.querySelector(mount);
    if (!scope) return;
    inject = icon;
    nodes = scope.querySelectorAll(selectors.join(','));
    for (var i = nodes.length; i--;) {
      wrapNode(nodes[i]);
    }
  };

  var init = exports.init = function init(mount, options) {
    return linkjuice(mount, options);
  };
});