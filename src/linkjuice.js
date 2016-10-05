let scope, nodes, inject;

const makeLink = (node, inject) => `
    <a class="linkjuice" href="#${node.id}">
      <span class="linkjuice-icon">${inject}</span>${node.innerHTML}
    </a>`;

const wrapNode = (node, contentFn) => {
  if (!node.id) {
    console.warn('No ID for element', node);
    return;
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
