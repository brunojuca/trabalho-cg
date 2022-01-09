//23x23
//flagNumber 11
//10 - '3D'
//1 - '2'
// ^ > leitura do checkpoint
//RVNumber 14
//RHNumber 14
const pista4 = [
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D', '1D', '1D', '1D', '1D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '3D', '1D', '1D', '1D', '3D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0', '1D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0', '1D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', 'RV', 'RV',  '0',  '0',  '0', '1D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D', '1D', '1D', '1D', '1D', '1D', '1D', '1D', 'RH', '3D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '3D', '1D', '1D', '1D', '3D', '1D', '1D', '1D', 'RH', '1D', '1D'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0'],
    [  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', 'RV', 'RV',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D', '1D', '1D', 'RH', '1D', '1D', '1D', '1D', 'RH', '1D', '1D', '1D', 'RH', '1D', 'RH', '3D', '1D',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '3D', '1D', '1D', 'RH', '1D', '1D', '1D', '1D', 'RH', '1D', '3D', '1D', 'RH', '1D', 'RH', '1D', '1D',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ 'RV', 'RV',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', 'RV', 'RV',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ 'RV', 'RV',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', 'RV', 'RV',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ 'RV', 'RV',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '3D', '1D', 'RH', '1D', 'RH', '1D',  '2', '1D', '1D', '1D', '3D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '1D', '1D', '1D', 'RH', '1D', 'RH', '1D',  '2', '1D', '1D', '1D', '1D', '1D',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0']
];
// '0' : fora da pista
// '1D' : pista comum
// '2' : ponto de largada/chegada
// '3D' : checkpoint
// 'RV' : rampa vert
// 'RH' : rampa horz
export {pista4};