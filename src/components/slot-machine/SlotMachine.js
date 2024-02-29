import React, { Component } from 'react';
import SlotMachineReel from './reel/SlotMachineReel';
import { SYMBOLS_CLASSIC } from '../../constants/symbols.constants';
import { resetAnimations } from '../../utils/animation.util';
import { setGlobalClickAndTabHandler } from '../../utils/touch.util';
import './slot-machine.css';

class SlotMachine extends Component {

  // CSS classes:
  static C_HAS_ZOOM = 'has-zoom';
  static C_IS_WIN = 'is-win';
  static C_IS_FAIL = 'is-fail';

  // CSS selectors:
  static S_BASE = '.sm__base';
  static S_REELS_CONTAINER = '.sm__reelsContainer';
  static S_DISPLAY = '.sm__display';

  // CSS variables:
  static V_WRAPPER_SIZE = '--wrapperSize';
  static V_REEL_SIZE = '--reelSize';
  static V_DISPLAY_SIZE = '--displaySize';
  static V_DISPLAY_ZOOM = '--displayZoom';
  static V_SHADOW_WEIGHT = '--shadowWeight';

  // Misc.:
  UNITS_CENTER = 3;
  UNITS_MARGIN = 1;
  UNITS_TOTAL = SlotMachine.UNITS_CENTER + SlotMachine.UNITS_MARGIN;
  ZOOM_TRANSITION = 'transform ease-in-out 500ms 250ms';
  ZOOM_TRANSITION_DURATION = 1000;
  BLIP_RATE = 4;
  FIREFOX_SHADOW_WEIGHT = 0.5;
  APP_PADDING = 32;

  // Config:
  blipFading;
  reelCount;
  symbols;
  alpha;
  speed;
 
  // State:
  state = {
    zoomTransitionTimeoutID: null,
    currentCombination: [],
    currentReel: null,
    blipCounter: 0,
    lastUpdate: 0,
    isPaused: false,
    keydownTimeoutID: null,
    keydownLastCalled: 0,
  };

  constructor(props) {
    
    super(props);

    this.state.isPaused = this.state.isPaused;

    this.wrapper = props.wrapper;
    this.handleUseCoin = props.handleUseCoin;
    this.handleGetPrice = props.handleGetPrice;
    this.reelCount = 3;
    this.symbols = SYMBOLS_CLASSIC;
    this.speed = -0.552; // TODO: Make enum and match sounds too.

        
    if (this.isPaused) {
          this.pause();
      } else {
          this.resume();
      }

      
    this.init(this.wrapper, this.handleUseCoin, this.handleGetPrice, this.reelCount, this.symbols, this.speed);
   
 
  }

  init (wrapper, handleUseCoin, handleGetPrice, reelCount, symbols, speed) {

    this.wrapper = this;
    this.handleUseCoin = handleUseCoin;
    this.handleGetPrice = handleGetPrice;
    this.reelCount = reelCount;
    this.symbols = symbols;
    this.speed = speed;
    this.blipFading = 1 / reelCount;

    const alpha = 360 / symbols.length;
    const shuffledSymbols = [...symbols];
    const diameter = (2 * reelCount) + SlotMachine.UNITS_CENTER;

    //console.log (this.wrapper);
    const reelsContainer = document.querySelector('.reelsContainer');

    const reels = []; 


    for (let reelIndex = 0; reelIndex < reelCount; ++reelIndex) {
        
      const reel = new SlotMachineReel(reelIndex, alpha, shuffledSymbols, diameter);
      reels.push(reel);
       
    }

    console.log (reels); 
  
    // Additional reel at the end that acts as a "cover" in case we set a background color on them and we only want
    // to see a ring even in the inner-most one, instead of a filled circle:
    //reelsContainer.appendChild(new SlotMachineReel(reelCount).root);
  }


  start() { }

  stop() {  }

  tick() { }

  zoomIn() {    this.zoom();  }

  zoomOut() {    this.zoom(true);  }

  zoom(out = false) {    /*   clearTimeout(this.state.zoomTransitionTimeoutID);   

    const { root } = this;

    // root.style.transition = SlotMachine.ZOOM_TRANSITION;
    root.classList[out ? 'remove' : 'add'](SlotMachine.C_HAS_ZOOM);

    // We do this as transition end will bubble up and fire a lot of times, not only for this transition:
    this.state.zoomTransitionTimeoutID = setTimeout(() => {
      // root.style.transition = '';
    }, SlotMachine.ZOOM_TRANSITION_DURATION);*/
  }

  resize() {

   
    const { wrapper, root, reelCount, display } = this;
    const { offsetWidth, offsetHeight } = wrapper;
    const wrapperSize = Math.min(offsetWidth, offsetHeight) - SlotMachine.APP_PADDING;
    const reelSize = (wrapperSize / (2 * reelCount + SlotMachine.UNITS_TOTAL)) | 0;


    if (wrapperSize <= 0 || reelSize <= 0 || root.offsetWidth / display.offsetWidth <= 0) {
      requestAnimationFrame(() => this.resize());

      return;
    }

 
    // style.setProperty(SlotMachine.V_WRAPPER_SIZE, `${wrapperSize}px`);
    // style.setProperty(SlotMachine.V_REEL_SIZE, `${reelSize}px`);
    // style.setProperty(SlotMachine.V_DISPLAY_SIZE, `${reelSize * reelCount}px`);
    // style.setProperty(SlotMachine.V_DISPLAY_ZOOM, `${root.offsetWidth / display.offsetWidth}`);
  }

  stopReel(reelIndex) {    /*
    const { speed } = this;
    const deltaAlpha = (performance.now() - this.state.lastUpdate) * speed;

    this.currentCombination.push(this.reels[reelIndex].stop(speed, deltaAlpha));
*/
    // SMSoundService.stop();
    // SMVibrationService.stop();
  }

  checkPrize() {    /*
    const { currentCombination, reelCount, symbols } = this.state;
    const occurrencesCount = {};

    let maxOccurrences = 0;
    let lastSymbol = '';
    let maxSymbol = '';
    let maxPrize = 0;

    for (let i = 0; i < reelCount; ++i) {
      const symbol = currentCombination[i];
      const occurrences = occurrencesCount[symbol] = lastSymbol === symbol ? occurrencesCount[symbol] + 1 : 1;

      lastSymbol = symbol;

      if (occurrences > maxOccurrences) {
        maxOccurrences = occurrences;

        const index = symbols.indexOf(symbol);
        const maxIndex = symbols.indexOf(maxSymbol); // TODO: Calculate every time?

        if (index > maxIndex) {
          maxSymbol = symbol;
          maxPrize = index + 1;
        }
      }
    }

    // TODO: Use a constant for this `2`:
    return maxOccurrences > 2 ? (maxOccurrences * (maxPrize / symbols.length)) / reelCount : null;

    */
  }

  handleResize() {    requestAnimationFrame(() => this.resize());  }

  handleKeyDown(e) {    //window.clearTimeout(this.state.keydownTimeoutID);

    //const { key } = e;

    // TODO: This should not be here:
    // if (key === 'Esc') {
    //     document.activeElement.blur();

    //     return;
    // }

    // if (this.state.isPaused || document.activeElement !== document || ![' ', 'Enter'].includes(key)) return;

    // const elapsed = Date.now() - this.state.keydownLastCalled;

    // if (elapsed >= 1000) {
    //   this.handleClick();
    // } else {
    //   this.state.keydownTimeoutID = window.setTimeout(this.handleClick.bind(this), 1000 - elapsed);
    // }
  }

  handleKeyUp(e) {   /* if (![' ', 'Enter'].includes(e.key)) return; 
    window.clearTimeout(this.state.keydownTimeoutID);

    this.state.keydownLastCalled = 0;*/
  }

  handleClick(e = null) { /*
    window.clearTimeout(this.state.keydownTimeoutID);

    this.state.keydownLastCalled = Date.now();

    // Keyboard events (above) will call this without passing down `e`:

    if (e) {
      const { target } = e;
      const targetTagName = target.tagName;
      const parentTagName = target.parentElement.tagName;

      if (/^A|BUTTON$/.test(targetTagName) || /^A|BUTTON$/.test(parentTagName)) {
        // TODO: This is only needed for links.

        document.activeElement.blur();

        return;
      }

      // TODO: Should be e.button instead?
      if (e.which === 3) return;
    }

    const { currentReel } = this.state;

    if (currentReel === null) {
      this.start();
    } else {
      ++this.state.currentReel;

      this.stopReel(currentReel);

      if (currentReel === this.reels.length - 1) {
        this.stop();
      }
    }*/
  }

  pause() {    /*
    setGlobalClickAndTabHandler(null);

    this.state.isPaused = true;*/
  }

  resume() {    /*setGlobalClickAndTabHandler(this.handleClick);

    this.state.isPaused = false;

    if (this.state.currentReel !== null) requestAnimationFrame(() => this.tick());*/
  }

  // ... Other lifecycle methods ...

  render() {

    return (
      <main className="app__main" id="main">
       
        <section className="sm__base">

          <SlotMachineReel />

          <div className="reelsContainer"></div>
          <div className="sm__display"></div>      

        </section>
      </main>
    );
  }
}

export default SlotMachine;
