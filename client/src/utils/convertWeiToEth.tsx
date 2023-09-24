/* 
  Task 7: function for converting WEI to ETH
  decided to use bignumber.js library for accuracy and simplicity
*/
import BigNumber from 'bignumber.js';

const convertWeiToEth = (wei: string): string =>  {
    if (!wei || wei === '0') return '0';
    // convert wei to a big number object using the BigNumber library
    const weiBN = new BigNumber(wei);
    // define the conversion factor of 10^18 as a big number object
    const factor = new BigNumber(10).pow(18);
    // divide wei by the factor and return the result as a long string
    // formating to a 18 digits
    let eth = weiBN.div(factor).toFormat(18);

    if  (eth.includes('.')) {
      // remove trailing zeros
      while (eth.slice(-1) === '0') {
        eth = eth.slice(0, -1)
      }

      // remove trailing dot
      if (eth.slice(-1) === '.') eth = eth.slice(0, -1)
    }
    return eth;
  }

  export default convertWeiToEth;
  