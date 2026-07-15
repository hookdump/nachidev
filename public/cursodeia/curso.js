/* Curso de IA — app logic (vanilla JS, no dependencies)
   Reads window.CURSO from content.js. Progress persisted in localStorage. */
(function () {
  "use strict";

  var CURSO = window.CURSO;
  var DONE_KEY = "cursoia:done";
  var TOTAL_KEY = "cursoia:total";

  var els = {
    toc: document.getElementById("toc"),
    view: document.getElementById("view"),
    bar: document.getElementById("topBar"),
    pct: document.getElementById("topPct"),
    crumb: document.getElementById("crumbCur"),
    scrim: document.getElementById("scrim"),
    menuBtn: document.getElementById("menuBtn"),
  };

  if (!CURSO || !Array.isArray(CURSO.modules) || !CURSO.modules.length) {
    els.view.innerHTML =
      '<div class="view-inner"><h1>Contenido no disponible</h1>' +
      "<p style='color:var(--muted)'>El contenido del curso todavía no se cargó. Volvé a intentar en unos minutos.</p></div>";
    return;
  }

  // ---- flatten lessons, keep module references ----
  var lessons = []; // {lesson, mod, gIndex, lIndex}
  CURSO.modules.forEach(function (mod) {
    (mod.lessons || []).forEach(function (lesson, li) {
      lessons.push({ lesson: lesson, mod: mod, lIndex: li });
    });
  });
  var TOTAL = lessons.length;
  try { localStorage.setItem(TOTAL_KEY, String(TOTAL)); } catch (e) {}

  // ---- progress state ----
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY) || "{}") || {}; }
    catch (e) { return {}; }
  }
  function saveDone(map) {
    try { localStorage.setItem(DONE_KEY, JSON.stringify(map)); } catch (e) {}
  }
  function isDone(id) { return !!loadDone()[id]; }
  function doneCount() {
    var m = loadDone(), n = 0;
    lessons.forEach(function (x) { if (m[x.lesson.id]) n++; });
    return n;
  }
  function modDoneCount(mod) {
    var m = loadDone(), n = 0;
    (mod.lessons || []).forEach(function (l) { if (m[l.id]) n++; });
    return n;
  }

  // ---- helpers ----
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function moduleById(id) { for (var i = 0; i < CURSO.modules.length; i++) if (CURSO.modules[i].id === id) return CURSO.modules[i]; return null; }
  function moduleIndex(id) { for (var i = 0; i < CURSO.modules.length; i++) if (CURSO.modules[i].id === id) return i; return -1; }
  function firstIncompleteLesson() {
    var m = loadDone();
    for (var i = 0; i < lessons.length; i++) if (!m[lessons[i].lesson.id]) return lessons[i];
    return lessons[0];
  }
  function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }
  function setBar(el, ratio) { if (el) el.style.transform = "scaleX(" + Math.max(0, Math.min(1, ratio)) + ")"; }

  // ---- top progress + crumb ----
  function updateTop(crumbText) {
    var d = doneCount();
    setBar(els.bar, TOTAL ? d / TOTAL : 0);
    els.pct.textContent = pct(d, TOTAL) + "%";
    els.crumb.textContent = crumbText || "Inicio";
  }

  // ---- sidebar / TOC ----
  function renderTOC(activeModuleId, activeLessonId) {
    var html = '<div class="toc-title">Contenido</div>';
    html += '<a class="ov' + (!activeModuleId ? " active" : "") + '" href="#/">🏠 Portada del curso</a>';
    CURSO.modules.forEach(function (mod) {
      var mDone = modDoneCount(mod), mTotal = (mod.lessons || []).length;
      var complete = mTotal > 0 && mDone === mTotal;
      var isActive = mod.id === activeModuleId;
      html += '<div class="mod' + (isActive ? " active" : "") + '">';
      html += '<a class="mod-head" href="#/' + mod.id + '" style="text-decoration:none">';
      html += '<span class="m-ico">' + mod.icon + "</span>";
      html += '<span class="m-name">' + esc(mod.title) + "</span>";
      html += '<span class="m-check' + (complete ? " done" : "") + '">' + (complete ? "✓" : mDone + "/" + mTotal) + "</span>";
      html += "</a>";
      if (isActive) {
        html += '<ul class="lessons">';
        (mod.lessons || []).forEach(function (l, i) {
          var d = isDone(l.id);
          var on = l.id === activeLessonId;
          html += '<li><a class="' + (on ? "active" : "") + '" href="#/' + mod.id + "/" + l.id + '">';
          html += '<span class="tick' + (d ? " done" : "") + '">' + (d ? "✓" : "") + "</span>";
          html += "<span>" + esc(l.title) + "</span></a></li>";
        });
        html += "</ul>";
      }
      html += "</div>";
    });
    els.toc.innerHTML = html;
  }

  // ---- overview ----
  function renderOverview() {
    var d = doneCount();
    var cont = firstIncompleteLesson();
    var allDone = d === TOTAL;
    var h = '<div class="view-inner mod-view">';
    h += '<div class="ov-hero"><h1>' + esc(CURSO.title).replace(/^IA/, "<b>IA</b>") + "</h1>";
    h += '<p class="sub">' + esc(CURSO.subtitle) + "</p></div>";

    h += '<div class="ov-progress">';
    h += '<div class="row"><span class="big">Tu progreso</span><span class="muted">' + d + " de " + TOTAL + " lecciones · " + pct(d, TOTAL) + "%</span></div>";
    h += '<div class="progress"><i id="ovBar"></i></div>';
    h += '<div class="ov-actions">';
    h += '<a class="btn btn--primary" href="#/' + cont.mod.id + "/" + cont.lesson.id + '">' + (d === 0 ? "Empezar el curso →" : allDone ? "Repasar desde el inicio →" : "Continuar →") + "</a>";
    if (d > 0) h += '<button class="btn btn--ghost" id="resetBtn">Reiniciar progreso</button>';
    h += "</div></div>";

    h += '<div class="section-head" style="margin-top:1rem"><h2 style="font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)">Módulos</h2></div>';
    h += '<div class="mod-grid">';
    CURSO.modules.forEach(function (mod) {
      var md = modDoneCount(mod), mt = (mod.lessons || []).length;
      var complete = mt > 0 && md === mt;
      h += '<a class="mod-card' + (complete ? " complete" : "") + '" href="#/' + mod.id + '">';
      h += '<div class="top"><span class="ico">' + mod.icon + '</span><span class="num">Módulo ' + mod.num + "</span></div>";
      h += "<h3>" + esc(mod.title) + "</h3>";
      h += "<p>" + esc(mod.summary || "") + "</p>";
      h += '<div class="mc-foot"><div class="progress"><i data-mod="' + mod.id + '"></i></div><span class="n">' + md + "/" + mt + "</span></div>";
      h += "</a>";
    });
    h += "</div></div>";
    els.view.innerHTML = h;

    setBar(document.getElementById("ovBar"), TOTAL ? d / TOTAL : 0);
    els.view.querySelectorAll("i[data-mod]").forEach(function (i) {
      var mod = moduleById(i.getAttribute("data-mod"));
      setBar(i, mod && mod.lessons.length ? modDoneCount(mod) / mod.lessons.length : 0);
    });
    var reset = document.getElementById("resetBtn");
    if (reset) reset.addEventListener("click", function () {
      if (confirm("¿Seguro que querés borrar tu progreso? No se puede deshacer.")) {
        saveDone({}); renderOverview(); renderTOC(null, null); updateTop("Inicio"); toast("Progreso reiniciado");
      }
    });
    renderTOC(null, null);
    updateTop("Inicio");
    document.title = CURSO.title + " — nachidev";
    window.scrollTo(0, 0);
  }

  // ---- module view ----
  function renderModule(mod, scrollLessonId) {
    var idx = moduleIndex(mod.id);
    var prev = idx > 0 ? CURSO.modules[idx - 1] : null;
    var next = idx < CURSO.modules.length - 1 ? CURSO.modules[idx + 1] : null;

    var h = '<div class="view-inner mod-view">';
    h += '<header class="mh"><div class="eyebrow">Módulo ' + mod.num + " de " + CURSO.modules.length + "</div>";
    h += "<h1><span class='e'>" + mod.icon + "</span>" + esc(mod.title) + "</h1>";
    if (mod.summary) h += '<p class="sub">' + esc(mod.summary) + "</p></header>";
    else h += "</header>";

    (mod.lessons || []).forEach(function (l, i) {
      var d = isDone(l.id);
      h += '<section class="lesson" id="' + l.id + '">';
      h += '<div class="lh"><div class="lh-main">';
      h += '<div class="l-num">Lección ' + mod.num + "." + (i + 1) + "</div>";
      h += "<h2>" + esc(l.title) + "</h2>";
      h += '<div class="mins">⏱ ' + (l.minutes || 6) + " min de lectura</div>";
      h += "</div></div>";
      h += '<div class="lesson-body">' + (l.html || "") + "</div>";
      h += '<div class="complete-bar"><button class="complete-btn" data-lesson="' + l.id + '" aria-pressed="' + (d ? "true" : "false") + '">';
      h += '<span class="box">✓</span><span class="label">' + (d ? "Completada" : "Marcar como completada") + "</span></button></div>";
      h += "</section>";
    });

    if (mod.quiz && mod.quiz.length) h += renderQuizHTML(mod);

    // pager
    h += '<div class="pager">';
    if (prev) h += '<a class="prev" href="#/' + prev.id + '"><span class="dir">← Módulo anterior</span><span class="ttl">' + prev.icon + " " + esc(prev.title) + "</span></a>";
    else h += '<a class="prev disabled"><span class="dir">← Anterior</span><span class="ttl">Empieza aquí</span></a>';
    if (next) h += '<a class="next" href="#/' + next.id + '"><span class="dir">Módulo siguiente →</span><span class="ttl">' + next.icon + " " + esc(next.title) + "</span></a>";
    else h += '<a class="next" href="#/"><span class="dir">Fin →</span><span class="ttl">🎓 Volver a la portada</span></a>';
    h += "</div></div>";

    els.view.innerHTML = h;

    // wire completion buttons
    els.view.querySelectorAll(".complete-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-lesson");
        var map = loadDone();
        if (map[id]) { delete map[id]; btn.setAttribute("aria-pressed", "false"); btn.querySelector(".label").textContent = "Marcar como completada"; }
        else {
          map[id] = true; btn.setAttribute("aria-pressed", "true"); btn.querySelector(".label").textContent = "Completada";
          if (doneCountFrom(map) === TOTAL) toast("🎉 ¡Completaste todo el curso!");
          else toast("¡Lección completada! ✓");
        }
        saveDone(map);
        renderTOC(mod.id, id);
        updateTop("Módulo " + mod.num);
      });
    });

    if (mod.quiz && mod.quiz.length) wireQuiz(mod);
    renderTOC(mod.id, scrollLessonId || (mod.lessons[0] && mod.lessons[0].id));
    updateTop("Módulo " + mod.num);
    document.title = mod.num + ". " + mod.title + " — " + CURSO.title;

    if (scrollLessonId) {
      var target = document.getElementById(scrollLessonId);
      if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo(0, 0);
  }
  function doneCountFrom(map) { var n = 0; lessons.forEach(function (x) { if (map[x.lesson.id]) n++; }); return n; }

  // ---- quiz ----
  var QUIZ_KEY = "cursoia:quiz";
  function loadQuiz() { try { return JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function saveQuiz(m) { try { localStorage.setItem(QUIZ_KEY, JSON.stringify(m)); } catch (e) {} }
  function letter(i) { return String.fromCharCode(65 + i); }
  function explainHTML(q, chosen) {
    var head = chosen === q.answer ? "¡Correcto! " : "Respuesta correcta: " + letter(q.answer) + ". ";
    return "<b>" + head + "</b>" + esc(q.explain);
  }
  function renderQuizHTML(mod) {
    var saved = loadQuiz()[mod.id] || {};
    var h = '<section class="quiz" id="quiz-' + mod.id + '">';
    h += '<div class="quiz-head"><span class="q-emoji">📝</span><h2>Ponete a prueba</h2></div>';
    h += '<p class="quiz-intro">Un repaso rápido del módulo. Elegí una opción y vas a ver al toque si acertaste, con una breve explicación.</p>';
    mod.quiz.forEach(function (q, qi) {
      var chosen = saved[qi];
      var answered = chosen !== undefined && chosen !== null;
      h += '<div class="q" data-q="' + qi + '">';
      h += '<div class="q-text"><span class="q-n">' + (qi + 1) + ".</span>" + esc(q.q) + "</div>";
      q.options.forEach(function (opt, oi) {
        var cls = "opt", dis = "";
        if (answered) {
          dis = "disabled";
          if (oi === q.answer) cls += " correct";
          else if (oi === chosen) cls += " wrong";
          else cls += " dim";
        }
        h += '<button class="' + cls + '" ' + dis + ' data-q="' + qi + '" data-o="' + oi + '">';
        h += '<span class="letter">' + letter(oi) + "</span><span>" + esc(opt) + "</span></button>";
      });
      h += '<div class="explain' + (answered ? " show" : "") + '">' + (answered ? explainHTML(q, chosen) : "") + "</div>";
      h += "</div>";
    });
    h += '<div class="quiz-score" id="score-' + mod.id + '"></div>';
    h += "</section>";
    return h;
  }
  function wireQuiz(mod) {
    els.view.querySelectorAll(".quiz .opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var qi = +btn.getAttribute("data-q"), oi = +btn.getAttribute("data-o");
        var q = mod.quiz[qi];
        var map = loadQuiz();
        if (!map[mod.id]) map[mod.id] = {};
        if (map[mod.id][qi] !== undefined) return;
        map[mod.id][qi] = oi; saveQuiz(map);
        var qEl = btn.closest(".q");
        qEl.querySelectorAll(".opt").forEach(function (o) {
          var ooi = +o.getAttribute("data-o");
          o.disabled = true;
          if (ooi === q.answer) o.classList.add("correct");
          else if (ooi === oi) o.classList.add("wrong");
          else o.classList.add("dim");
        });
        var ex = qEl.querySelector(".explain");
        ex.innerHTML = explainHTML(q, oi);
        ex.classList.add("show");
        updateQuizScore(mod);
      });
    });
    updateQuizScore(mod);
  }
  function updateQuizScore(mod) {
    var el = document.getElementById("score-" + mod.id);
    if (!el) return;
    var saved = loadQuiz()[mod.id] || {};
    var answered = Object.keys(saved).length;
    var total = mod.quiz.length, correct = 0;
    mod.quiz.forEach(function (q, qi) { if (saved[qi] === q.answer) correct++; });
    if (answered === 0) { el.innerHTML = '<span class="s-muted">' + total + " preguntas · elegí una opción para empezar</span>"; return; }
    var h = '<span class="s-badge">Llevás ' + correct + " de " + total + " ✓</span>";
    h += answered < total ? '<span class="s-muted">· te faltan ' + (total - answered) + "</span>" : '<span class="s-muted">· ¡completaste el quiz!</span>';
    h += '<button class="btn btn--sm btn--ghost" data-reset-quiz="' + mod.id + '">Reintentar</button>';
    el.innerHTML = h;
    var rb = el.querySelector("[data-reset-quiz]");
    if (rb) rb.addEventListener("click", function () {
      var m = loadQuiz(); delete m[mod.id]; saveQuiz(m);
      renderModule(mod);
      var qz = document.getElementById("quiz-" + mod.id);
      if (qz) qz.scrollIntoView({ block: "start" });
    });
  }

  // ---- toast ----
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  // ---- router ----
  function parseHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    if (!h) return { moduleId: null, lessonId: null };
    var parts = h.split("/");
    return { moduleId: parts[0] || null, lessonId: parts[1] || null };
  }
  function route() {
    closeDrawer();
    var r = parseHash();
    if (!r.moduleId) { renderOverview(); return; }
    var mod = moduleById(r.moduleId);
    if (!mod) { location.hash = "#/"; return; }
    renderModule(mod, r.lessonId);
  }

  // ---- mobile drawer ----
  function openDrawer() { els.toc.classList.add("open"); els.scrim.classList.add("on"); }
  function closeDrawer() { els.toc.classList.remove("open"); els.scrim.classList.remove("on"); }
  if (els.menuBtn) els.menuBtn.addEventListener("click", function () { els.toc.classList.contains("open") ? closeDrawer() : openDrawer(); });
  if (els.scrim) els.scrim.addEventListener("click", closeDrawer);

  window.addEventListener("hashchange", route);
  route();
})();
