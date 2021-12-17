//7x7
//flagNumber 4
//3 - '3'
//1 - '2'
// ^ > leitura do checkpoint
const pista1 = [
    ['1A', '1A', '1A', '1A', '1A', '1A', '1A'],
    ['1A', '1A', '1A',    3, '1A', '1A', '1A'],
    ['1A', '1A',    0,    0,    0, '1A', '1A'],
    ['1A',    3,    0,    0,    0,    3, '1A'],
    ['1A', '1A',    0,    0,    0, '1A', '1A'],
    ['1A', '1A', '1A',    2, '1A', '1A', '1A'],
    ['1A', '1A', '1A',    2, '1A', '1A', '1A']
];
// 0 : fora da pista
// 1 : pista comum
// 2 : ponto de largada/chegada
// 3 : checkpoint
export {pista1};