'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoPrice = ({ pairs }) => {
    const [askPrice, setAskPrice] = useState(null);
    const [bidPrice, setBidPrice] = useState(null);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await axios.get('https://api.kraken.com/0/public/Ticker?pair='+pairs.url);
                setAskPrice(response.data.result[pairs.endpoint].a[0]);
                setBidPrice(response.data.result[pairs.endpoint].b[0]);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchPrice();
    }, []);

    return (
        <div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="pr-4">Bid</th>
                        <th>Ask</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="pr-4">{bidPrice ? `${bidPrice}` : 'Loading...'}</td>
                        <td>{askPrice ? `${askPrice}` : 'Loading...'}</td>
                    </tr>
                </tbody>
            </table>

        </div >
    );
};

// const BitcoinPrice = () => {
//     const [askPrice, setAskPrice] = useState(null);
//     const [bidPrice, setBidPrice] = useState(null);

//     useEffect(() => {
//         const fetchPrice = async () => {
//             try {
//                 const response = await axios.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
//                 setAskPrice(response.data.result.XXBTZUSD.a[0]);
//                 setBidPrice(response.data.result.XXBTZUSD.b[0]);
//             } catch (error) {
//                 console.error('Error fetching data: ', error);
//             }
//         };

//         fetchPrice();
//     }, []);

//     return (
//         <div>

//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="pr-4">Bid</th>
//                         <th>Ask</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td className="pr-4">{bidPrice ? `${bidPrice}` : 'Loading...'}</td>
//                         <td>{askPrice ? `${askPrice}` : 'Loading...'}</td>
//                     </tr>
//                 </tbody>
//             </table>

//         </div >
//     );
// };

// const EthereumPrice = () => {
//     const [askPrice, setAskPrice] = useState(null);
//     const [bidPrice, setBidPrice] = useState(null);

//     useEffect(() => {
//         const fetchPrice = async () => {
//             try {
//                 const response = await axios.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSDC');
//                 setAskPrice(response.data.result.ETHUSDC.a[0]);
//                 setBidPrice(response.data.result.ETHUSDC.b[0]);
//             } catch (error) {
//                 console.error('Error fetching data: ', error);
//             }
//         };

//         fetchPrice();
//     }, []);

//     return (
//         <div>

//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="pr-4">Bid</th>
//                         <th>Ask</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td className="pr-4">{bidPrice ? `${bidPrice}` : 'Loading...'}</td>
//                         <td>{askPrice ? `${askPrice}` : 'Loading...'}</td>
//                     </tr>
//                 </tbody>
//             </table>

//         </div >
//     );
// };


// export { BitcoinPrice };
// export { EthereumPrice };

export default CryptoPrice;
