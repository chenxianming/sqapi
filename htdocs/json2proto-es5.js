/*
@credit konsumer
@es5 syntax converted by chenxianming
Example:
    const Json2proto = require("./json2proto"); 
    let json = {
      "testNum": 5,
      "testString": "tester",
      "testBool": true,
      "testArray": [1,2,3,4],
      "testObj": {
        "testNum": 5,
        "testString": "tester",
        "testBool": true,
        "testArray": [1,2,3,4]
      }
    };
    let TypeName = 'Message';
    let test = new Json2proto( {
        json: json,
        typeName: TypeName
    } );
    console.log( test.proto );
*/

function camelize(str, low_first_letter) {
    var str_path = str.split('/');
    var i = 0;
    var j = str_path.length;
    var str_arr, init_x, k, l, first;

    for (; i < j; i++) {
        str_arr = str_path[i].split('_');
        k = 0;
        l = str_arr.length;

        for (; k < l; k++) {
            if (k !== 0) {
                str_arr[k] = str_arr[k].toLowerCase();
            }

            first = str_arr[k].charAt(0);
            first = low_first_letter && i === 0 && k === 0 ?
                first.toLowerCase() : first.toUpperCase();
            str_arr[k] = first + str_arr[k].substring(1);
        }

        str_path[i] = str_arr.join('');
    }

    return str_path.join('::');
}

function classify(str) {
    return camelize(str);
}

const isFloat = n => n === +n && n !== (n | 0)

const getType = (val) => {
    let t = typeof val
    if (t === 'object' && Array.isArray(val)) {
        return 'array'
    }
    if (t === 'number') {
        if (isFloat(val)) {
            return 'float'
        } else {
            return 'int32'
        }
    }
    if (t === 'boolean') {
        return 'bool'
    }
    return t
}

function Json2proto(options) {
    this.json = options.json || {};
    this.typeName = options.typeName || 'Message';
    this.messages = {};

    return {
        proto: this.convert()
    };
}

Json2proto.prototype = {
    getMessageName: function (name) {
        var n = classify(name);
        if (this.messages[n]) {
            n += '_' + Math.random().toString(36).substring(7).toUpperCase();
        }
        return n
    },
    handleMessage: function (obj, name) {
        if (!obj) return

        var self = this,
            keys = Object.keys(obj);

        self.messages[name] = [];

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i],
                t = getType(obj[key]);

            switch (t) {
                case 'array':
                    var rt = getType(obj[key][0]);
                    if (rt === 'object') {
                        self.handleMessage(obj[key][0], iname);
                        self.messages[name].push('repeated ' + iname + ' ' + key + ' = ' + (i + 1) + ';');
                    } else {
                        self.messages[name].push('repeated ' + rt + ' ' + key + ' = ' + (i + 1) + ';');
                    }

                case 'object':
                    var iname = self.getMessageName(key);
                    self.messages[name] = self.handleMessage(obj[key], iname);
                    self.messages[name].push(iname + ' ' + key + ' = ' + (i + 1) + ';');

                default:
                    self.messages[name].push(t + ' ' + key + ' = ' + (i + 1) + ';');
            }

        }
        
        return self.messages[name];
    },
    convert: function () {

        var chunk = 'syntax = "proto3";\n',
            self = this;
        
        self.handleMessage(self.json, this.typeName);
        
        var keys = Object.keys(self.messages);
        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            chunk += `\nmessage ${key} {\n`;
            chunk += '  ' + self.messages[key].join('\n  ');
            chunk += '\n}\n';
        }
        
        return chunk;
    }
}
