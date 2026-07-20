/* Curso de IA — app logic (vanilla JS, no dependencies)
   Reads window.CURSO from content.js. Progress persisted in localStorage. */
(function () {
  "use strict";

  var CURSO = window.CURSO;
  var STORE = (CURSO && CURSO.store) || "cursoia"; // per-course localStorage namespace
  var DONE_KEY = STORE + ":done";
  var TOTAL_KEY = STORE + ":total";

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
    html += '<a class="ov' + (activeModuleId === "glosario" ? " active" : "") + '" href="#/glosario">📖 Glosario</a>';
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
    var titleEsc = esc(CURSO.title);
    var titleHTML = CURSO.brand ? titleEsc.replace(esc(CURSO.brand), "<b>" + esc(CURSO.brand) + "</b>") : titleEsc.replace(/^IA/, "<b>IA</b>");
    h += '<div class="ov-hero"><h1>' + titleHTML + "</h1>";
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
    els.view.querySelectorAll(".lesson-body").forEach(annotateGlossary);

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
  var QUIZ_KEY = STORE + ":quiz";
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

  // ---- glossary cross-linking (hover tooltips) ----
  var GLOSS = { entries: [], matchers: [] };
  function buildGlossary() {
    GLOSS.entries = Array.isArray(CURSO.glossary) ? CURSO.glossary : [];
    GLOSS.matchers = [];
    GLOSS.entries.forEach(function (e, i) {
      var aliases = (e.aliases && e.aliases.length) ? e.aliases.slice() : [];
      if (e.term) aliases.push(e.term.toLowerCase());
      aliases.forEach(function (a) {
        a = (a || "").trim();
        if (a && a.length >= 3) GLOSS.matchers.push({ alias: a, len: a.length, idx: i });
      });
    });
    GLOSS.matchers.sort(function (a, b) { return b.len - a.len; });
  }
  function glossRegex(alias) {
    var esc2 = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try { return new RegExp("(?<![\\p{L}\\p{N}])(" + esc2 + ")(?![\\p{L}\\p{N}])", "iu"); }
    catch (e) { return new RegExp("\\b(" + esc2 + ")\\b", "i"); }
  }
  var GLOSS_SKIP = { A: 1, CODE: 1, PRE: 1, SUMMARY: 1, H2: 1, H3: 1, H4: 1, BUTTON: 1 };
  var GLOSS_MAX_PER_LESSON = 16;
  function annotateGlossary(root) {
    if (!GLOSS.matchers.length) return;
    var used = {}, count = 0;
    var matchers = GLOSS.matchers.map(function (m) { return { idx: m.idx, re: glossRegex(m.alias) }; });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== root) {
          if (GLOSS_SKIP[p.nodeName] || (p.classList && p.classList.contains("gloss"))) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var targets = [], node;
    while ((node = walker.nextNode())) targets.push(node);
    targets.forEach(function (textNode) {
      if (count >= GLOSS_MAX_PER_LESSON) return;
      var text = textNode.nodeValue, segments = [], cursor = 0, guard = 0, any = false;
      while (cursor < text.length && guard++ < 400 && count < GLOSS_MAX_PER_LESSON) {
        var rest = text.slice(cursor), best = null;
        for (var i = 0; i < matchers.length; i++) {
          if (used[matchers[i].idx]) continue;
          var m = matchers[i].re.exec(rest);
          if (m && (best === null || m.index < best.index)) best = { index: m.index, word: m[1], idx: matchers[i].idx };
        }
        if (!best) { segments.push(text.slice(cursor)); break; }
        used[best.idx] = true; count++; any = true;
        if (best.index > 0) segments.push(text.slice(cursor, cursor + best.index));
        segments.push({ word: text.slice(cursor + best.index, cursor + best.index + best.word.length), idx: best.idx });
        cursor = cursor + best.index + best.word.length;
        if (cursor < text.length && count >= GLOSS_MAX_PER_LESSON) segments.push(text.slice(cursor));
      }
      if (!any) return;
      var frag = document.createDocumentFragment();
      segments.forEach(function (seg) {
        if (typeof seg === "string") { if (seg) frag.appendChild(document.createTextNode(seg)); }
        else {
          var span = document.createElement("span");
          span.className = "gloss"; span.tabIndex = 0; span.setAttribute("data-g", String(seg.idx));
          span.textContent = seg.word; frag.appendChild(span);
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }
  var glossPop;
  function ensureGlossPop() { if (glossPop) return glossPop; glossPop = document.createElement("div"); glossPop.id = "gloss-pop"; glossPop.setAttribute("role", "tooltip"); document.body.appendChild(glossPop); return glossPop; }
  var activeGloss = null;
  function positionGlossPop(el) {
    var p = glossPop; if (!p) return;
    var r = el.getBoundingClientRect(), pr = p.getBoundingClientRect();
    var left = Math.min(Math.max(8, r.left), window.innerWidth - pr.width - 8);
    var top = r.top - pr.height - 8;
    if (top < 8) top = r.bottom + 8;
    p.style.left = left + "px"; p.style.top = top + "px";
  }
  function showGlossPop(el) {
    var e = GLOSS.entries[+el.getAttribute("data-g")]; if (!e) return;
    var p = ensureGlossPop();
    p.innerHTML = "";
    var t = document.createElement("span"); t.className = "gp-term"; t.textContent = e.term;
    var d = document.createElement("span"); d.className = "gp-def"; d.textContent = e.def;
    p.appendChild(t); p.appendChild(d);
    p.classList.add("show");
    activeGloss = el;
    positionGlossPop(el);
  }
  function hideGlossPop() { activeGloss = null; if (glossPop) glossPop.classList.remove("show"); }
  function onGlossScroll() { if (activeGloss && document.activeElement === activeGloss) positionGlossPop(activeGloss); else hideGlossPop(); }

  // ---- global search ----
  var SEARCH = [];
  function buildSearchIndex() {
    SEARCH = [];
    CURSO.modules.forEach(function (mod) {
      (mod.lessons || []).forEach(function (l) {
        SEARCH.push({ modId: mod.id, modNum: mod.num, modIcon: mod.icon, lessonId: l.id, lessonTitle: l.title, text: (l.html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() });
      });
    });
  }
  function normalize(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function searchQuery(q) {
    var nq = normalize(q).trim(); if (nq.length < 2) return [];
    var terms = nq.split(/\s+/), res = [];
    SEARCH.forEach(function (it) {
      var ht = normalize(it.lessonTitle), hx = normalize(it.text), score = 0, allIn = true;
      terms.forEach(function (t) {
        if (ht.indexOf(t) >= 0) score += 5;
        else if (hx.indexOf(t) >= 0) score += 1;
        else allIn = false;
      });
      if (allIn && score > 0) {
        var pos = hx.indexOf(terms[0]);
        var snip = pos >= 0 ? it.text.slice(Math.max(0, pos - 40), pos + 70) : it.text.slice(0, 100);
        res.push({ it: it, score: score, snip: snip.trim(), q: terms });
      }
    });
    res.sort(function (a, b) { return b.score - a.score; });
    return res.slice(0, 25);
  }
  function hlt(text, terms) {
    var out = esc(text);
    terms.forEach(function (t) { if (t.length < 2) return; try { out = out.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>"); } catch (e) {} });
    return out;
  }
  var searchEls, selIdx = -1;
  function buildSearchUI() {
    var ov = document.createElement("div"); ov.className = "search-ov"; ov.id = "searchOv";
    ov.innerHTML = '<div class="search-panel" role="dialog" aria-label="Buscar en el curso"><div class="search-top"><span class="s-ic">🔍</span><input type="search" id="searchInput" placeholder="Buscar en el curso..." autocomplete="off" spellcheck="false" /><kbd>Esc</kbd></div><div class="search-results" id="searchResults"></div></div>';
    document.body.appendChild(ov);
    searchEls = { ov: ov, input: ov.querySelector("#searchInput"), results: ov.querySelector("#searchResults") };
    ov.addEventListener("click", function (e) { if (e.target === ov) closeSearch(); });
    var t;
    searchEls.input.addEventListener("input", function () { clearTimeout(t); t = setTimeout(runSearch, 110); });
    searchEls.input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
      else if (e.key === "ArrowDown") { e.preventDefault(); moveSel(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSel(-1); }
      else if (e.key === "Enter") { var a = searchEls.results.querySelector(".sr.sel a") || searchEls.results.querySelector(".sr a"); if (a) a.click(); }
    });
  }
  function openSearch() { if (!searchEls) buildSearchUI(); searchEls.ov.classList.add("show"); searchEls.input.value = ""; searchEls.results.innerHTML = ""; selIdx = -1; setTimeout(function () { searchEls.input.focus(); }, 0); }
  function closeSearch() { if (searchEls) searchEls.ov.classList.remove("show"); }
  function moveSel(d) { var items = searchEls.results.querySelectorAll(".sr"); if (!items.length) return; selIdx = (selIdx + d + items.length) % items.length; items.forEach(function (el, i) { el.classList.toggle("sel", i === selIdx); }); items[selIdx].scrollIntoView({ block: "nearest" }); }
  function runSearch() {
    var q = searchEls.input.value; selIdx = -1;
    if (!q.trim()) { searchEls.results.innerHTML = ""; return; }
    var res = searchQuery(q);
    if (!res.length) { searchEls.results.innerHTML = '<div class="sr-empty">Sin resultados para "' + esc(q) + '"</div>'; return; }
    searchEls.results.innerHTML = res.map(function (r) {
      var it = r.it;
      return '<div class="sr"><a href="#/' + it.modId + "/" + it.lessonId + '" data-close="1"><div class="sr-mod">' + it.modIcon + " Módulo " + it.modNum + '</div><div class="sr-title">' + hlt(it.lessonTitle, r.q) + '</div><div class="sr-snip">' + hlt(r.snip, r.q) + "…</div></a></div>";
    }).join("");
    searchEls.results.querySelectorAll("a[data-close]").forEach(function (a) { a.addEventListener("click", closeSearch); });
  }

  // ---- glossary view ----
  function renderGlossary() {
    closeDrawer();
    var g = GLOSS.entries.slice().sort(function (a, b) { return a.term.localeCompare(b.term, "es"); });
    var h = '<div class="view-inner gloss-view">';
    h += '<header class="mh"><div class="eyebrow">Referencia</div><h1><span class="e">📖</span>Glosario</h1><p class="sub">Todos los términos del curso, explicados en criollo. En las lecciones, cualquier término subrayado muestra su definición al pasar el mouse (o al tocarlo).</p></header>';
    h += '<div class="gloss-filter"><input type="search" id="glossFilter" placeholder="Filtrar términos..." autocomplete="off" spellcheck="false" /></div>';
    h += '<div class="gloss-list" id="glossList">';
    h += g.map(function (e) { return '<div class="gloss-item"><h3>' + esc(e.term) + "</h3><p>" + esc(e.def) + "</p></div>"; }).join("");
    h += "</div></div>";
    els.view.innerHTML = h;
    renderTOC("glosario", null);
    updateTop("Glosario");
    document.title = "Glosario — " + CURSO.title;
    var f = document.getElementById("glossFilter");
    if (f) f.addEventListener("input", function () {
      var q = normalize(f.value);
      document.querySelectorAll("#glossList .gloss-item").forEach(function (it) { it.style.display = normalize(it.textContent).indexOf(q) >= 0 ? "" : "none"; });
    });
    window.scrollTo(0, 0);
  }

  function initSearchAndGloss() {
    var btn = document.getElementById("searchBtn");
    if (btn) btn.addEventListener("click", openSearch);
    document.addEventListener("keydown", function (e) { if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); openSearch(); } });
    document.addEventListener("mouseover", function (e) { var g = e.target && e.target.closest && e.target.closest(".gloss"); if (g) showGlossPop(g); });
    document.addEventListener("mouseout", function (e) { var g = e.target && e.target.closest && e.target.closest(".gloss"); if (g) hideGlossPop(); });
    document.addEventListener("focusin", function (e) { var g = e.target && e.target.closest && e.target.closest(".gloss"); if (g) showGlossPop(g); });
    document.addEventListener("focusout", function (e) { var g = e.target && e.target.closest && e.target.closest(".gloss"); if (g) hideGlossPop(); });
    window.addEventListener("scroll", onGlossScroll, true);
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
    if (r.moduleId === "glosario") { renderGlossary(); return; }
    var mod = moduleById(r.moduleId);
    if (!mod) { location.hash = "#/"; return; }
    renderModule(mod, r.lessonId);
  }

  // ---- mobile drawer ----
  function openDrawer() { els.toc.classList.add("open"); els.scrim.classList.add("on"); }
  function closeDrawer() { els.toc.classList.remove("open"); els.scrim.classList.remove("on"); }
  if (els.menuBtn) els.menuBtn.addEventListener("click", function () { els.toc.classList.contains("open") ? closeDrawer() : openDrawer(); });
  if (els.scrim) els.scrim.addEventListener("click", closeDrawer);

  buildGlossary();
  buildSearchIndex();
  initSearchAndGloss();

  window.addEventListener("hashchange", route);
  route();
})();
