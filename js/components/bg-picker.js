/* Background picker — sets the lava lamp's palette and motion on <html>.
   <div class="bg-picker" data-component="bg-picker" data-bg-store>
     <button class="tag tag--button" type="button" data-palette="jewel" aria-pressed="true">…</button>
     <button class="tag tag--button" type="button" data-palette="ember" aria-pressed="false">…</button>
     <button class="tag tag--button" type="button" data-bg-motion="lava" aria-pressed="true">…</button>
     <button class="tag tag--button" type="button" data-bg-motion="wax" aria-pressed="false">…</button>
   </div>

   - A [data-palette] button sets data-palette on <html>; "jewel" removes
     it, since Jewel's own palette is the default.
   - A [data-bg-motion] button sets data-bg-motion on <html>; "lava" removes
     it. "wax" shows the .jewel-wax layer (css/background.css).
   - data-bg-store on the picker saves both choices in localStorage
     (jewel-palette, jewel-bg-motion) and restores them when it mounts.
   - Fires 'jewel:backgroundchange' on <html>, detail { palette, motion },
     so several pickers on a page stay in step.
   - Jewel.background.get() / .set({ palette, motion }) do the same from
     your own code. */

(() => {
  const root = document.documentElement;
  const KEYS = { palette: 'jewel-palette', motion: 'jewel-bg-motion' };
  const DEFAULTS = { palette: 'jewel', motion: 'lava' };
  const ATTRS = { palette: 'palette', motion: 'bgMotion' };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  const background = {
    /** { palette, motion } — what the page is showing right now. */
    get() {
      return {
        palette: root.dataset.palette || DEFAULTS.palette,
        motion: root.dataset.bgMotion || DEFAULTS.motion,
      };
    },
    /** Change either or both. `save: true` also remembers the choice. */
    set(change, { save = false } = {}) {
      for (const key of ['palette', 'motion']) {
        const value = change[key];
        if (!value) continue;
        if (value === DEFAULTS[key]) delete root.dataset[ATTRS[key]];
        else root.dataset[ATTRS[key]] = value;
        if (save) store.set(KEYS[key], value);
      }
      root.dispatchEvent(new CustomEvent('jewel:backgroundchange', { detail: background.get() }));
    },
  };
  Jewel.background = background;

  Jewel.register('bg-picker', (el) => {
    const save = el.hasAttribute('data-bg-store');
    const options = () => el.querySelectorAll('button[data-palette], button[data-bg-motion]');
    // Only restore a saved value this picker actually offers.
    const offers = (attr, value) => [...options()].some((b) => b.getAttribute(attr) === value);

    const sync = () => {
      const now = background.get();
      options().forEach((b) => {
        const on = b.hasAttribute('data-palette')
          ? b.dataset.palette === now.palette
          : b.dataset.bgMotion === now.motion;
        b.setAttribute('aria-pressed', String(on));
      });
    };

    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-palette], button[data-bg-motion]');
      if (!b || !el.contains(b) || b.disabled) return;
      background.set(
        b.hasAttribute('data-palette') ? { palette: b.dataset.palette } : { motion: b.dataset.bgMotion },
        { save },
      );
    });
    root.addEventListener('jewel:backgroundchange', sync);

    if (save) {
      const palette = store.get(KEYS.palette);
      const motion = store.get(KEYS.motion);
      background.set({
        palette: palette && offers('data-palette', palette) ? palette : null,
        motion: motion && offers('data-bg-motion', motion) ? motion : null,
      });
    }
    sync();
  });
})();
