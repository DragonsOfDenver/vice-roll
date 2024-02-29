import React, { Component } from 'react';
 
class Header extends Component {

    render() {

      return (

        <header className="header__base">
                <div className="header__content">

                    <a className="header__logoLink" href="#">
                            <img className="header__logoImage" src="vice-roll-logo.png" aria-hidden="true" />
                            <span className="header__logoText" id="title">Vice Roll Casino</span>
                    </a>
                    <h1 className="header__title">
                        
                    </h1>
            
                    <ul className="header__state">
                        <li className="header__prop" title="Coins">
                            <span className="header__icon" role="img" aria-label="Coins">💲</span>
                            <span className="header__value" id="coins">00000</span>
                        </li>
                        <li className="header__prop" title="Jackpot">
                            <span className="header__icon" role="img" aria-label="Jackpot">💎</span>
                            <span className="header__value" id="jackpot">00000</span>
                        </li>
                        <li className="header__prop" title="Spins">
                            <span className="header__icon" role="img" aria-label="Spins">🎲</span>
                            <span className="header__value" id="spins">00000</span>
                        </li>
                    </ul>
                </div>
            </header>

      
      );
    }
  }

export default Header;
  
