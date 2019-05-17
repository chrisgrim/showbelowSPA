export default function openWindow(url, title, options = {}) {
  if (typeof url === 'object') {
    options = url;
    url = '';
  }

  options = {
    url, title, width: 600, height: 720, ...options,
  };

  const ws = window.screen;

  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : ws.left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : ws.top;
  const width = window.innerWidth || document.documentElement.clientWidth || ws.width;
  const height = window.innerHeight || document.documentElement.clientHeight || ws.height;

  options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft;
  options.top = ((height / 2) - (options.height / 2)) + dualScreenTop;

  const optionsStr = Object.keys(options).reduce((acc, key) => {
    acc.push(`${key}=${options[key]}`);
    return acc;
  }, []).join(',');

  const newWindow = window.open(url, title, optionsStr);

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
}
