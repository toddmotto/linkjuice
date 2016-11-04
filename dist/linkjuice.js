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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var scope = void 0,
      nodes = void 0,
      inject = void 0;

  var makeLink = function makeLink(node, inject) {
    return '\n    <a class="linkjuice" id="' + node.id + '">\n      <span class="linkjuice-icon">' + inject + '</span>' + node.innerHTML + '\n    </a>';
  };

  var makeTocItem = function makeTocItem(node) {
    return '<a href="#' + node.id + '">' + node.innerHTML + '</a>';
  };

  var wrapNode = function wrapNode(node, contentFn) {
    if (!node.id) {
      console.warn('No ID for element', node);
      return;
    }
    node.innerHTML = contentFn(node, inject);
  };

  var addAtLevel = function addAtLevel(nodeLevel, node, tree) {
    var level = tree;

    while (--nodeLevel >= 0) {
      if (!Array.isArray(level[level.length - 1])) {
        level.push([]);
      }

      level = level[level.length - 1];
    }

    level.push(node);
  };

  var createTree = function createTree(nodes) {
    var headerRegexp = /^H[1-6]$/;
    var tree = [];

    if (nodes.filter(function (node) {
      return !headerRegexp.test(node.tagName);
    }).length > 0) {
      console.warn('Nested table of contents is only possible with regular header tags');
      return tree;
    }

    nodes.forEach(function (node) {
      return addAtLevel(parseInt(node.tagName.substr(1), 10) - 1, node, tree);
    });
    return tree;
  };

  var createTocHtml = function createTocHtml(nodes, contentFn) {

    var nodesHtml = nodes.map(function (node) {
      return Array.isArray(node) ? createTocHtml(node, contentFn) : '<li>' + contentFn(node) + '</li>';
    }).join('');

    return '<ul>' + nodesHtml + '</ul>';
  };

  var linkjuice = function linkjuice(mount, _ref) {
    var _ref$contentFn = _ref.contentFn;
    var contentFn = _ref$contentFn === undefined ? makeLink : _ref$contentFn;
    var _ref$icon = _ref.icon;
    var icon = _ref$icon === undefined ? '#' : _ref$icon;
    var _ref$selectors = _ref.selectors;
    var selectors = _ref$selectors === undefined ? ['h2', 'h3', 'h4', 'h5', 'h6'] : _ref$selectors;
    var _ref$tableOfContents = _ref.tableOfContents;
    var tableOfContents = _ref$tableOfContents === undefined ? false : _ref$tableOfContents;

    scope = document.querySelector(mount);
    if (!scope) return;

    inject = icon;
    nodes = Array.prototype.slice.call(scope.querySelectorAll(selectors.join(',')));

    if ((typeof tableOfContents === 'undefined' ? 'undefined' : _typeof(tableOfContents)) === 'object' && tableOfContents !== null) {
      var toc = document.querySelector(tableOfContents.selector);

      if (!toc) {
        console.warn('No table of contents element found for the specified selector');
        return;
      }

      var tocElements = tableOfContents.nested === true ? createTree(nodes) : nodes;
      var createTocItem = typeof tableOfContents.contentFn === 'function' ? tableOfContents.contentFn : makeTocItem;

      toc.innerHTML = createTocHtml(tocElements, createTocItem);
    }

    nodes.map(function (node) {
      return wrapNode(node, contentFn);
    });
  };

  var init = exports.init = function init(mount) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return linkjuice(mount, options);
  };
});