/* =====================================================================
   Penlink homepage update — CoAnalyst 360 placeholder animation
   Vanilla JS, no dependencies. Drop into the WP theme as a normal
   <script defer src="..."></script>. Auto-initializes on DOM ready.

   To replace with a real animation later: delete the <div class="plhp-co360__anim-body">
   children and drop in your video / lottie / canvas element. The frame chrome
   (dots, title, status, restart) can stay or be removed.
   ===================================================================== */
(function () {
  'use strict';

  var STATE_SELECTOR = '.plhp-co360__anim-body';
  var FRAME_SELECTOR = '.plhp-co360__anim-frame';

  // ---- Sequence script ----------------------------------------------
  // Each step adds one element to the body. Timings tuned to read at speed.
  var STEPS = [
    {
      kind: 'msg',
      role: 'user',
      delay: 300,
      // Typed character-by-character
      text: 'Investigate communication patterns between subject A and recent burner numbers — link with OSINT mentions.'
    },
    {
      kind: 'msg',
      role: 'agent',
      delay: 900,
      thinking: 'Coordinating agents',
      thinkingDuration: 1300,
      html:
        'I\'ll coordinate <strong>four agents</strong> to handle this end-to-end. Pulling CDRs first, then cross-referencing with Tangles and live intercept data.' +
        '<div class="plhp-tools" data-tools>' +
          '<span class="plhp-tool" data-tool>plx.cdr.search</span>' +
          '<span class="plhp-tool" data-tool>tangles.osint.scan</span>' +
          '<span class="plhp-tool" data-tool>graph.cluster</span>' +
          '<span class="plhp-tool" data-tool>geotime.timeline</span>' +
        '</div>'
    },
    {
      kind: 'msg',
      role: 'agent',
      delay: 1400,
      thinking: 'Cross-referencing sources',
      thinkingDuration: 1500,
      html:
        'Surfaced <strong>14 outbound calls</strong> to four burner numbers in the last 9 days. Three correlate with anomalous tower handoffs near the warehouse district. Two of those numbers appear in encrypted-channel mentions found by Tangles.' +
        '<div class="plhp-insight" data-insight>' +
          '<div class="plhp-chip" data-chip><span class="k">Burner cluster</span><span class="v">4 numbers</span></div>' +
          '<div class="plhp-chip" data-chip><span class="k">High-priority calls</span><span class="v is-accent">3</span></div>' +
          '<div class="plhp-chip" data-chip><span class="k">OSINT cross-hits</span><span class="v">2</span></div>' +
          '<div class="plhp-chip" data-chip><span class="k">Predicted next contact</span><span class="v">~36h</span></div>' +
        '</div>'
    }
  ];

  var LOOP_PAUSE_MS = 6500; // pause after sequence completes before restarting

  // ---- Util ---------------------------------------------------------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ---- Runner -------------------------------------------------------
  function CoAnalystAnim(frame) {
    this.frame = frame;
    this.body = $(STATE_SELECTOR, frame);
    this.running = false;
    this.cancelled = false;
    this.timeouts = [];

    // Add restart control if not present
    if (!$('.plhp-co360__anim-restart', frame)) {
      var btn = el(
        'button',
        'plhp-co360__anim-restart',
        '<span aria-hidden="true">↻</span> Replay'
      );
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Replay CoAnalyst 360 demo');
      btn.addEventListener('click', this.restart.bind(this));
      frame.appendChild(btn);
    }

    // Render the completed state immediately so content is visible on load
    this.renderFinal();

    // After replay is clicked, restart uses the animated path (start/run)
  }

  // Render the fully-completed conversation state with no delays
  CoAnalystAnim.prototype.renderFinal = function () {
    var self = this;
    self.body.innerHTML = '';
    STEPS.forEach(function (step) {
      if (step.kind !== 'msg') return;
      var wrap = el('div', 'plhp-msg plhp-msg--' + step.role);
      var who  = el('div', 'plhp-msg__who', step.role === 'user' ? 'L' : 'C');
      var bod  = el('div', 'plhp-msg__body');
      if (step.role === 'user') {
        bod.textContent = step.text;
      } else {
        bod.innerHTML = step.html;
        $$('[data-tool], [data-chip]', bod).forEach(function (item) {
          item.classList.add('is-in');
        });
      }
      wrap.appendChild(who);
      wrap.appendChild(bod);
      wrap.classList.add('is-in');
      self.body.appendChild(wrap);
    });
  };

  CoAnalystAnim.prototype.cancelAll = function () {
    this.cancelled = true;
    this.timeouts.forEach(function (t) { clearTimeout(t); });
    this.timeouts = [];
  };

  CoAnalystAnim.prototype.restart = function () {
    this.cancelAll();
    this.body.innerHTML = '';
    this.cancelled = false;
    this.running = false;
    this.start();
  };

  CoAnalystAnim.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.cancelled = false;
    this.body.innerHTML = '';
    this.run();
  };

  CoAnalystAnim.prototype.run = function () {
    var self = this;
    var reduced = prefersReducedMotion();

    var p = Promise.resolve();
    STEPS.forEach(function (step) {
      p = p.then(function () {
        if (self.cancelled) return;
        return sleep(reduced ? 100 : step.delay).then(function () {
          if (self.cancelled) return;
          return self.playStep(step, reduced);
        });
      });
    });

    p.then(function () {
      if (self.cancelled) return;
      // Loop after pause
      return sleep(reduced ? 2000 : LOOP_PAUSE_MS).then(function () {
        if (self.cancelled) return;
        self.running = false;
        self.restart();
      });
    });
  };

  CoAnalystAnim.prototype.playStep = function (step, reduced) {
    var self = this;
    if (step.kind !== 'msg') return Promise.resolve();

    var wrap = el('div', 'plhp-msg plhp-msg--' + step.role);
    var who = el('div', 'plhp-msg__who', step.role === 'user' ? 'L' : 'C');
    var bod = el('div', 'plhp-msg__body');
    wrap.appendChild(who);
    wrap.appendChild(bod);
    self.body.appendChild(wrap);

    // Force reflow then add the entry class so transition runs
    /* eslint-disable no-unused-expressions */
    wrap.offsetWidth;
    wrap.classList.add('is-in');

    // USER bubble — type the text character by character
    if (step.role === 'user' && step.text) {
      if (reduced) {
        bod.textContent = step.text;
        return Promise.resolve();
      }
      return self.typeInto(bod, step.text);
    }

    // AGENT bubble — show thinking, then swap to content, then stagger children
    if (step.role === 'agent') {
      if (step.thinking && !reduced) {
        bod.innerHTML =
          '<span class="plhp-thinking"><span>' + step.thinking + '</span>' +
          '<span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
        return sleep(step.thinkingDuration || 1200).then(function () {
          if (self.cancelled) return;
          bod.innerHTML = step.html;
          return self.staggerIn(bod);
        });
      } else {
        bod.innerHTML = step.html;
        return self.staggerIn(bod);
      }
    }

    return Promise.resolve();
  };

  // Type each character with a slight jitter so it reads human
  CoAnalystAnim.prototype.typeInto = function (node, text) {
    var self = this;
    return new Promise(function (resolve) {
      var i = 0;
      function tick() {
        if (self.cancelled) return resolve();
        i++;
        var partial = text.slice(0, i);
        node.innerHTML = self.escape(partial) +
          '<span class="typing-caret" aria-hidden="true"></span>';
        if (i < text.length) {
          var jitter = 14 + Math.random() * 28;
          // longer pause after sentence punctuation
          var prev = text.charAt(i - 1);
          if (prev === '.' || prev === '?' || prev === '!') jitter += 220;
          if (prev === ',' || prev === '—' || prev === ':') jitter += 80;
          var t = setTimeout(tick, jitter);
          self.timeouts.push(t);
        } else {
          // remove caret after a beat
          var t2 = setTimeout(function () {
            if (self.cancelled) return resolve();
            node.innerHTML = self.escape(text);
            resolve();
          }, 380);
          self.timeouts.push(t2);
        }
      }
      tick();
    });
  };

  CoAnalystAnim.prototype.escape = function (s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  // Reveal tool chips / insight chips with a stagger
  CoAnalystAnim.prototype.staggerIn = function (root) {
    var self = this;
    var items = $$('[data-tool], [data-chip]', root);
    if (!items.length) return Promise.resolve();
    return new Promise(function (resolve) {
      items.forEach(function (item, i) {
        var t = setTimeout(function () {
          if (self.cancelled) return;
          item.classList.add('is-in');
          if (i === items.length - 1) resolve();
        }, 90 + i * 110);
        self.timeouts.push(t);
      });
    });
  };

  // ---- Bootstrap ----------------------------------------------------
  function init() {
    $$(FRAME_SELECTOR).forEach(function (frame) {
      if (frame.__plhpAnim) return;
      frame.__plhpAnim = new CoAnalystAnim(frame);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on any dynamic insertion (some WP page builders inject late)
  window.PLHPCoAnalystInit = init;
})();
