/*
    Author: chenxianming
    Example: 
    
    var json = {
        "testNum": 5,
        "testString": "tester",
        "testBool": true,
        "testArray": [1, 2, 3, 4],
        "testObj": {
            "num": 5,
            "string": "tester",
            "bool": true,
            "obj": {
                "a": "123",
                "b": "456",
                "c": {
                    "d": "111",
                    "e": 123,
                    "aa": [1, 2, 3, 4]
                }
            },
            "obj2": {
                "g": 1,
                "gg": '1111'
            },
            "array": [1, 2, 3, 4]
        }
    };
    
    // map each children value and index position
    jsonParser(json, function (val, idx) {
        console.log( 'index', idx ); // ["testObj"]["obj"]["c"]["aa"][3]
        console.log( 'value', val ); // value 4
    });
    
    
    // set value to each children key
    jsonParser(json, function (val, idx) {
        eval( "json"+idx + " = '"+ idx +"'" );
    });
    
    console.log( JSON.stringify( json ) );
    
*/

function objectType(object) {
    return (typeof object == 'object') ? (Array.isArray(object) ? 'array' : 'object') : 'other';
}

function length(object){
    var arr = Object.keys( object ),
        idx = 0;
    
    for( var i = 0; i < arr.length; i++ ){
        ( objectType( object[ arr[ i ] ] ) != 'other' ) && idx++;
    }
    
    return idx;
}

var index = '',
    lLast = '',
    last = '';

function jsonParser(parent, fn) {
    var type = objectType(parent);

    switch (type) {
        case 'object':
            {
                last = index;
                
                ( length( parent ) > 1 ) && ( lLast = index );
                
                for (var k in parent) {
                    index = ( length( parent ) > 1 ) ? ( lLast + '["' + k + '"]' ) : ( last + '["' + k + '"]' );
                    jsonParser(parent[k], fn);
                }
            }
            break;
            
        case 'array':
            {
                
                last = index;
                
                ( length( parent ) > 1 ) && ( lLast = index );
                
                for (var i = 0; i < parent.length; i++) {
                    index = ( length( parent ) > 1 ) ? ( lLast + '[' + i + ']' ) : last + '[' + i + ']';
                    jsonParser(parent[i], fn);
                }
            }
            break;
            
        default:
            {
                fn(parent, index);
            }
            break;
    }
}

module.exports = jsonParser;