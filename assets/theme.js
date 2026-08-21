// Palette switcher. ?theme=<name> pins a palette and remembers it; every
// later page reads it back from localStorage. ?theme=default clears.
// Loaded blocking in <head> so the sheet lands before first paint.
(function () {
  var THEMES = ['ember', 'moss', 'plum', 'midnight', 'carbon'];
  var q = new URLSearchParams(location.search).get('theme');
  if (q !== null) {
    try { q === 'default' ? localStorage.removeItem('quire-theme') : localStorage.setItem('quire-theme', q); } catch (e) {}
  }
  var name = q !== null ? q : (function () { try { return localStorage.getItem('quire-theme'); } catch (e) { return null; } })();
  if (THEMES.indexOf(name) === -1) return;
  document.write('<link rel="stylesheet" href="assets/themes/' + name + '.css">');
  document.documentElement.dataset.theme = name;
})();
