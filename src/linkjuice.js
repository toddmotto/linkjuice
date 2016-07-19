let scope, nodes, inject;

const wrapNode = node => {
  let a = document.createElement('a');
  a.href = `#${node.id}`;
  if(!a.href) {
      console.warn('No ID for element', a);
      return ;
  }
  a.className = 'linkjuice';
  a.innerHTML = `<span class="linkjuice-icon">${inject}</span>${node.innerHTML}`;
  node.innerHTML = '';
  node.appendChild(a);
};

const linkjuice = (mount, { icon = '#', selectors = ['h2', 'h3', 'h4', 'h5', 'h6']}) => {
  scope = document.querySelector(mount);
  if (!scope) return;
  inject = icon;
  nodes = scope.querySelectorAll((selectors).join(','));
  for (var i = nodes.length; i--;) {
    wrapNode(nodes[i]);
  }
};

export const init = (mount, options) => linkjuice(mount, options);
