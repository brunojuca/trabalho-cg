//7x7
//flagNumber 4
//3 - '3'
//1 - '2'
// ^ > leitura do checkpoint
//RNumber 12
const pista1 = [
    ['1A', '1A', 'RH', '3A', 'RH', '1A', '1A'],
    ['1A', '1A', 'RH', '1A', 'RH', '1A', '1A'],
    ['1A', '1A',  '0',  '0',  '0', 'RV', 'RV'],
    ['3A', '1A',  '0',  '0',  '0', '1A', '3A'],
    ['RV', 'RV',  '0',  '0',  '0', 'RV', 'RV'],
    ['1A', '1A', 'RH',  '2', '1A', '1A', '1A'],
    ['1A', '1A', 'RH',  '2', '1A', '1A', '1A']
];
// 0 : fora da pista
// 1 : pista comum
// 2 : ponto de largada/chegada
// 3 : checkpoint
export {pista1};