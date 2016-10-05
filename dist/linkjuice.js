/*! linkjuice v1.0.1 | (c) 2016 @toddmotto | https://github.com/toddmotto/linkjuice */
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

  var makeLink = function makeLink(node, inject) {
    return '\n    <a class="linkjuice" id="' + node.id + '">\n      <span class="linkjuice-icon">' + inject + '</span>' + node.innerHTML + '\n    </a>';
  };

  var sanitizeString = function sanitizeString(string) {
    var tr = { 'ä': 'ae', 'ü': 'ue', 'ö': 'oe', 'ß': 'ss' };
    var output = string;

    // make it all lowercase
    output = output.toLowerCase();
    // replace "Umlaute"
    output = output.replace(/[äöüß]/g, function ($0) {
      return tr[$0];
    });
    // replace spaces
    output = output.replace(/ /g, '-');
    // only keep wanted symbols
    output = output.replace(/[^a-z 0-9 -]*/g, '');
  };

  var wrapNode = function wrapNode(node, contentFn) {
    if (!node.id) {
      node.id = sanitizeString(node.innerText);
    }
    node.innerHTML = contentFn(node, inject);
  };

  var linkjuice = function linkjuice(mount, _ref) {
    var _ref$contentFn = _ref.contentFn;
    var contentFn = _ref$contentFn === undefined ? makeLink : _ref$contentFn;
    var _ref$icon = _ref.icon;
    var icon = _ref$icon === undefined ? '#' : _ref$icon;
    var _ref$selectors = _ref.selectors;
    var selectors = _ref$selectors === undefined ? ['h2', 'h3', 'h4', 'h5', 'h6'] : _ref$selectors;

    scope = document.querySelector(mount);
    if (!scope) return;
    inject = icon;
    nodes = scope.querySelectorAll(selectors.join(','));
    for (var i = nodes.length; i--;) {
      wrapNode(nodes[i], contentFn);
    }
  };

  var init = exports.init = function init(mount) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return linkjuice(mount, options);
  };
});