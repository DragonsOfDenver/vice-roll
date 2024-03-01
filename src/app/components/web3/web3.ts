import { getBalance } from '@wagmi/core';
import { config } from './config.ts';

const balance = getBalance(config, {
    address: '0xB50267a2205AeAD657853679F385329a61d005D5',
});

balance.finally(() => {

    console.log("finally balance");
    console.log(balance);

});
