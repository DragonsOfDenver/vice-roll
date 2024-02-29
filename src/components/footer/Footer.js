import React, { Component } from 'react';
 
class Footer extends Component {

    render() {
      return (

    <footer className="footer__base">
        <ul className="footer__content">

            <li className="footer__optionSpacer"></li>

            <li className="footer__option">
                <button className="footer__button footer__modalButton" title="Pay Table" id="togglePayTable" aria-label="Pay Table">
                    <span className="footer__buttonIcon" aria-hidden="true">🏆</span>
                </button>
            </li>

            <li className="footer__option">
                <button className="footer__button footer__modalButton" title="Instructions" id="toggleInstructions" aria-label="Instructions">
                    <span className="footer__buttonIcon" aria-hidden="true">ℹ️</span>
                </button>
            </li>

            <li className="footer__option">
                <button className="footer__button footer__toggleButton" id="toggleSound">
                    <span className="footer__buttonIcon" aria-hidden="true">🔊</span>
                </button>
            </li>

            <li className="footer__option">
                <button className="footer__button footer__toggleButton" id="toggleVibration">
                    <span className="footer__buttonIcon" aria-hidden="true">🍆</span>
                </button>
            </li>
        </ul>
    </footer>

      
      );
    }
  }

export default Footer;
  
