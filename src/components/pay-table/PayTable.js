import React, { useEffect, useState } from 'react';

const PayTable = ({ symbols }) => {
    const C_BASE = 'pt__base';
    const C_ACTIVE = 'pt__base--activeC';
    const C_COLUMN = 'pt__c';
    const S_ROOT = '.pt__base';
    const S_HEADER = '.pt__header';
    const S_INITIALLY_ACTIVE_COLUMN = '.pt__header .pt__c2';

    const [payMatrix, setPayMatrix] = useState({});
    const [activeColumn, setActiveColumn] = useState(null);

    useEffect(() => {
        const total = symbols.length;

        const handleColumnClicked = ({ target }) => {
            const column = parseInt(target.className.replace(C_COLUMN, ''), 10) || 0;

            if (column <= 1 || target === activeColumn) return;

            setActiveColumn(target);
            document.querySelector(S_ROOT).className = `${C_BASE} ${C_ACTIVE}${column}`;
            document.activeElement.blur();
        };

        const headerHTML = `
            <li class="pt__header">
                <div class="pt__rowContent">
                    <span class="pt__c1"></span>
                    <button class="pt__c2 pt__tab"><span class="pt__tabText">× 3</span></button>
                    <button class="pt__c3 pt__tab"><span class="pt__tabText">× 4</span></button>
                    <button class="pt__c4 pt__tab"><span class="pt__tabText">× 5</span></button>
                </div>
            </li>
        `;

        document.querySelector(S_ROOT).innerHTML = headerHTML + symbols.map((symbol, i) => {
            const figureWeight = (i + 1) / total * 100;
            const pay3 = figureWeight * 0.6;
            const pay4 = figureWeight * 0.8;
            const pay5 = figureWeight;

            setPayMatrix((prevPayMatrix) => ({
                ...prevPayMatrix,
                [symbol]: [pay3, pay4, pay5],
            }));

            return (
                <li key={i} className="pt__row">
                    <div className="pt__rowContent">
                        <span className="pt__c1">{symbol}</span>
                        <span className="pt__c2">{pay3.toFixed(2)} %</span>
                        <span className="pt__c3">{pay4.toFixed(2)} %</span>
                        <span className="pt__c4">{pay5.toFixed(2)} %</span>
                    </div>
                </li>
            );
        });

        const initiallyActiveColumn = document.querySelector(S_INITIALLY_ACTIVE_COLUMN);
        setActiveColumn(initiallyActiveColumn);
        document.querySelector(S_HEADER).addEventListener('click', handleColumnClicked);

        // Cleanup function to remove event listener on component unmount
        return () => {
            document.querySelector(S_HEADER).removeEventListener('click', handleColumnClicked);
        };
    }, [symbols, activeColumn]);

    return null; // You can replace this with your desired JSX structure
};

export default PayTable;
