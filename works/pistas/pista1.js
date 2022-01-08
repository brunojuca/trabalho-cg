//7x7
//flagNumber 4
//3 - '3A'
//1 - '2'
// ^ > leitura do checkpoint
//RVNumber 6
//RHNumber 6
const pista1 = [
    ['1A', '1A', 'RH', '3A', 'RH', '1A', '1A'],
    ['1A', '1A', 'RH', '1A', 'RH', '1A', '1A'],
    ['1A', '1A',  '0',  '0',  '0', 'RV', 'RV'],
    ['3A', '1A',  '0',  '0',  '0', '1A', '3A'],
    ['RV', 'RV',  '0',  '0',  '0', 'RV', 'RV'],
    ['1A', '1A', 'RH',  '2', '1A', '1A', '1A'],
    ['1A', '1A', 'RH',  '2', '1A', '1A', '1A']
];
// '0' : fora da pista
// '1A' : pista comum
// 2 : ponto de largada/chegada
// '3A' : checkpoint
// 'RV' : rampa vert
// 'RH' : rampa horz
export {pista1};