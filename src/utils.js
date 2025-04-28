export function getRandomElements(array, n) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr.slice(0, n);
}

// generated using o3, because I'm not good with math
function balancedSplit(N, coeff = [9, 10, 12, 14, 16]) {
  const m = coeff.length;
  const counts = Array(m).fill(0);
  let best = null;
  let bestUsed = -1;
  let bestSpread = Infinity;

  (function dfs(i, rem) {
    if (i === m) {
      if (rem !== 0) return;
      const used = counts.filter((x) => x > 0).length;
      if (used === 0) return;

      const mean = counts.reduce((s, x) => s + x, 0) / m;
      const var_ = counts.reduce((s, x) => s + (x - mean) ** 2, 0);

      if (used > bestUsed || (used === bestUsed && var_ < bestSpread)) {
        best = counts.slice();
        bestUsed = used;
        bestSpread = var_;
      }
      return;
    }
    for (let x = Math.floor(rem / coeff[i]); x >= 0; --x) {
      counts[i] = x;
      dfs(i + 1, rem - x * coeff[i]);
    }
    counts[i] = 0;
  })(0, N);

  return best; // array of counts or null
}

/**
 * ***distributeArray*** – works for every integer N ≥ 1.
 * Returns an array listing each piece-size once per use.
 *
 *   distributeArray(60) → [9, 10, 12, 14, 16]        // perfectly even
 *   distributeArray(31) → [31]                       // fallback
 *   distributeArray(7)  → [7]                        // N < 9 exception
 */
export function distributeArray(N) {
  if (!Number.isInteger(N) || N < 1) throw new Error("N must be ≥ 1");

  if (N < 9) return [N]; // smallest allowed piece = N itself

  const base = [6, 8, 10, 11, 12, 14, 16];
  const split = balancedSplit(N, base);

  if (split) {
    // build the expanded array
    const pieces = [];
    split.forEach((count, i) => {
      for (let j = 0; j < count; ++j) pieces.push(base[i]);
    });
    return pieces;
  }

  // fallback: one big chunk (guaranteed ≥ 9)
  return [N];
}

export function getOrInitializeLocalStorage(key, defaultValue) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}
