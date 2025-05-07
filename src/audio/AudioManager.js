// src/utils/AudioManager.js
import { Howl } from "howler";

class AudioManager {
  constructor() {
    this.bgms = {};
    this.sfx = {};
    this.currentKey = null;
    this.currentId = null;
    this.bgmVolume = 0.25;
    this.sfxVolume = 0.25;
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

  /* ――― master controls ――― */
  setBgmVolume(v) {
    this.bgmVolume = v;
    localStorage.setItem("bgmVolume", v);
    Object.values(this.bgms).forEach((h) => h.volume(this.bgmMuted ? 0 : v));
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
    localStorage.setItem("sfxVolume", v);
    Object.values(this.sfx).forEach((h) => h.volume(this.sfxMuted ? 0 : v));
  }

  toggleBgmMute() {
    this.bgmMuted = !this.bgmMuted;
    localStorage.setItem("bgmMuted", this.bgmMuted);
    Object.values(this.bgms).forEach((h) => h.mute(this.bgmMuted));
  }

  toggleSfxMute() {
    this.sfxMuted = !this.sfxMuted;
    localStorage.setItem("sfxMuted", this.sfxMuted);
    Object.values(this.sfx).forEach((h) => h.mute(this.sfxMuted));
  }
}

export default new AudioManager();
