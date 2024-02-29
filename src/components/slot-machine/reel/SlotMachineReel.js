import React, { Component } from 'react';
import { stopAtAnimation } from '../../../utils/animation.util';
import { shuffle } from '../../../utils/array.util';
import { IS_FIREFOX } from '../../../constants/browser.constants';

class SlotMachineReel extends Component {
  // CSS classes:
  static C_REEL = 'sm__reel';
  static C_CELL = 'sm__cell';
  static C_CELL_SHADOW = 'sm__cell--has-shadow';
  static C_CELL_BLUR = 'sm__cell--has-blur';
  static C_FIGURE = 'sm__figure';
  static C_IS_STOP = 'is-stop';

  // CSS variables:
  static V_INDEX = '--index';

  // Misc.:
  static STOP_ANIMATION_DURATION_MULTIPLIER = 5;

// Elements:
  root;
  style;

// Config:
  index;
  alpha;
  shadowCount;

  // State:
  angle = 0;
  stopAt = 0;

  constructor(props) {
    super(props);

    this.state = {
      angle: 0,
      stopAt: 0,
    };

    this.setupReel();


  }

  componentDidMount() {
    // Initialize and set up the reel here
    this.setupReel();
  }

  componentWillUnmount() {
    // Clean up or perform any necessary actions when the component is unmounted
  }

  setupReel = () => {
    const { index, alpha, symbols, diameter } = this.props;
    const { C_REEL, C_IS_STOP, V_INDEX } = SlotMachineReel;

    const root = this.rootRef;
    const style = this.styleRef;

    //style.setProperty(V_INDEX, index);

    if (!symbols) {
      return;
    }

    let cellShadowClasses;
    let shadowOpacityWeight;

    if (IS_FIREFOX) {
      cellShadowClasses = [C_REEL, C_IS_STOP, SlotMachineReel.C_CELL, SlotMachineReel.C_CELL_SHADOW];
      shadowOpacityWeight = 0.5;
    } else {
      cellShadowClasses = [C_REEL, C_IS_STOP, SlotMachineReel.C_CELL, SlotMachineReel.C_CELL_SHADOW, SlotMachineReel.C_CELL_BLUR];
      shadowOpacityWeight = 1;
    }

    const shadowCount = Math.max(2, Math.round((diameter - 0.5 - (2 * index)) * Math.PI / symbols.length));
    const beta = 1 / shadowCount;

    shuffle(symbols);

    symbols.forEach((symbol, symbolIndex) => {
      const cellFigure = (
        <div class={SlotMachineReel.C_FIGURE}>
          {symbol}
        </div>
      );

      const cell = (
        <div class={SlotMachineReel.C_CELL} style={{ transform: `rotate(${symbolIndex * alpha}deg)` }}>
          {cellFigure}
        </div>
      );

      root.appendChild(cell);

      for (let shadowIndex = 1; shadowIndex < shadowCount; ++shadowIndex) {
        const shadowCell = (
          <div
            class={cellShadowClasses.join(' ')}
            style={{
              transform: `rotate(${alpha * (symbolIndex + (beta * shadowIndex))}deg)`,
              opacity: shadowOpacityWeight * (1 - (beta * shadowIndex)),
            }}
          >
            {cellFigure}
          </div>
        );
        root.appendChild(shadowCell);
      }
    });
  };

  reset = () => {
    const { rootRef, styleRef } = this;
    const { index } = this.props;

    rootRef.classList.remove(SlotMachineReel.C_IS_STOP);
    styleRef.transform = `rotate(${this.angle = ((360 - this.stopAt) % 360)}deg)`;
    styleRef.animation = '';

    this.stopAt = 0;
  };

  stop = (speed, deltaAlpha) => {
    const { alpha, rootRef, styleRef } = this;
    const { index } = this.props;

    const angle = (360 - this.angle - deltaAlpha) % 360;
    const stopAt = Math.ceil(angle / alpha) * alpha;
    const animationName = `stop-${index}`;
    const animationDuration =
      stopAtAnimation(animationName, (360 - angle) % 360, (360 - stopAt) % 360, alpha, speed) *
      SlotMachineReel.STOP_ANIMATION_DURATION_MULTIPLIER;

    this.stopAt = stopAt;
    styleRef.animation = `${animationName} ${animationDuration}ms ease-out forwards`;
    rootRef.classList.add(SlotMachineReel.C_IS_STOP);

    const cellIndex = Math.ceil(stopAt / alpha) * this.props.shadowCount;
    return (rootRef.children[cellIndex] || rootRef.children[0]).innerText;
  };

  render() {
    return (
      <div ref={ref => (this.rootRef = ref)} className={`${SlotMachineReel.C_REEL} ${SlotMachineReel.C_IS_STOP}`}>

        HELLO I AM THE SLOT MACHINE REEL

        {/* Render other elements if needed */}
      </div>
    );
  }
}

export default SlotMachineReel;
