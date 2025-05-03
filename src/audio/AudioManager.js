// src/utils/AudioManager.js
import { Howl } from "howler";

class AudioManager {
  constructor() {
    this.bgms = {};
    this.sfx = {};
    this.currentKey = null;
    this.currentId = null;
  }

  // only ever create one Howl per key
  registerBgm(key, src, volume = 1.0) {
    if (this.bgms[key]) return;
    this.bgms[key] = new Howl({ src: [src], loop: true, volume });
  }

  playBgm(key) {
    const track = this.bgms[key];
    if (!track) {
      console.warn(`No BGM registered under “${key}”`);
      return;
    }
    console.log(key);
    console.log(this.currentKey);

    if (key === this.currentKey) {
      return;
    }
    // stop the previous instance
    if (this.currentKey) {
      this.bgms[this.currentKey].stop(this.currentId);
    }

    // start new
    this.currentKey = key;
    this.currentId = track.play();
  }

  stopBgm() {
    if (this.currentKey) {
      this.bgms[this.currentKey].stop(this.currentId);
      this.currentKey = null;
      this.currentId = null;
    }
  }

  registerSfx(key, src, volume = 1.0) {
    if (this.sfx[key]) return;
    this.sfx[key] = new Howl({ src: [src], loop: false, volume });
  }

  playSfx(key) {
    const fx = this.sfx[key];
    if (!fx) {
      console.warn(`No SFX registered under “${key}”`);
      return;
    }
    fx.play();
  }
}

export default new AudioManager();
