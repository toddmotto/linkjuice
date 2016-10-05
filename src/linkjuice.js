let scope, nodes, inject;

const makeLink = (node, inject) => `
    <a class="linkjuice" id="${node.id}">
      <span class="linkjuice-icon">${inject}</span>${node.innerHTML}
    </a>`;

const sanitizeString = (string) => {
  var tr = {'ä':'ae', 'ü':'ue', 'ö':'oe', 'ß':'ss' };
  var output = string;

  // make it all lowercase
  output = output.toLowerCase();
  // replace "Umlaute"
  output = output.replace(/[äöüß]/g, function($0) { return tr[$0]; });
  // replace spaces
  output = output.replace(/ /g,'-');
  // only keep wanted symbols
  output = output.replace(/[^a-z 0-9 -]*/g, '');
};

const wrapNode = (node, contentFn) => {
  if (!node.id) {
    node.id = sanitizeString(node.innerText);
  }
  node.innerHTML = contentFn(node, inject);
};

const linkjuice = (mount, { contentFn = makeLink, icon = '#', selectors = ['h2', 'h3', 'h4', 'h5', 'h6']}) => {
  scope = document.querySelector(mount);
  if (!scope) return;
  inject = icon;
  nodes = scope.querySelectorAll((selectors).join(','));
  for (var i = nodes.length; i--;) {
    wrapNode(nodes[i], contentFn);
  }
};

export const init = (mount, options = {}) => linkjuice(mount, options);
