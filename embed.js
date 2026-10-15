/* Einbettung in die Karte erkennen, bevor gezeichnet wird (kein Springen) */
if (/[?&]embed\b/.test(location.search)) document.documentElement.classList.add('embed');
