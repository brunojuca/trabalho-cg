//7x7
//flagNumber 4
//3 - '3B'
//1 - '2'
// ^ > leitura do checkpoint
//RVNumber 8
//RHNumber 8
const pista2 = [
    ['1B', '1B', 'RH', 'RH', '1B', '1B',  '0',  '0'],
    ['1B', '1B', 'RH', 'RH', '3B', '1B',  '0',  '0'],
    ['RV', 'RV',  '0',  '0', '1B', '1B', '1B', '1B'],
    ['3B', '1B',  '0',  '0', '1B', '1B', '3B', '1B'],
    ['1B', '1B',  '0',  '0',  '0',  '0', 'RV', 'RV'],
    ['RV', 'RV',  '0',  '0',  '0',  '0', 'RV', 'RV'],
    ['1B', '1B', 'RH',  '2', '1B', 'RH', '1B', '1B'],
    ['1B', '1B', 'RH',  '2', '1B', 'RH', '1B', '1B'],
];
// '0' : fora da pista
// '1B' : pista comum
// 2 : ponto de largada/chegada
// '3B' : checkpoint
// 'RV' : rampa vert
// 'RH' : rampa horz
export {pista2};