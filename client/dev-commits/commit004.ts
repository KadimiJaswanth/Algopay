// Commit 004 - small DOM helper utilities for test UI

export function createElement(tag: string, className?: string, innerText?: string) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerText) el.innerText = innerText;
  return el;
}

export function emptyElement(el: HTMLElement) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function setText(el: HTMLElement, text: string) {
  el.textContent = text;
}

export function appendChildren(el: HTMLElement, children: Array<HTMLElement | string>) {
  for (const c of children) {
    if (typeof c === 'string') el.appendChild(document.createTextNode(c));
    else el.appendChild(c);
  }
}

export function toggleClass(el: HTMLElement, cls: string) {
  el.classList.toggle(cls);
}
