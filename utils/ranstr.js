
const ranstr = ( len ) => {
    var len = len || 8,
        arr = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split(''),
        i = -1,
        chunk = '';
    
    while( i++ < len - 1 ){
        chunk += arr[ ~~( Math.random() * arr.length ) ];
    }
    
    return chunk;
}

module.exports = ranstr;
