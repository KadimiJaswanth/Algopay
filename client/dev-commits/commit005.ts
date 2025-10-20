// Commit 005 - small UI component (vanilla) for demo

export function SimpleBadge(text: string) {
  const span = document.createElement('span');
  span.textContent = text;
  span.style.padding = '4px 8px';
  span.style.borderRadius = '8px';
  span.style.background = '#eef';
  span.style.color = '#013';
  span.style.fontSize = '12px';
  return span;
}

export function SimpleButton(label: string, onClick: () => void) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.padding = '8px 12px';
  btn.style.borderRadius = '6px';
  btn.style.border = '1px solid #ccd';
  btn.addEventListener('click', onClick);
  return btn;
}

export function mountDemo(rootId = 'dev-demo-root') {
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
  }
  const badge = SimpleBadge('demo');
  const btn = SimpleButton('Click me', () => alert('Clicked'));
  root.appendChild(badge);
  root.appendChild(btn);
}
