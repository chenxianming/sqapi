/*
@credit konsumer
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

const classify = require('inflection').classify;

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

class Json2proto {
    constructor(props) {

        this.json = props.json || {};
        this.typeName = props.typeName || 'Message';
        this.messages = {};

        return {
            proto: this.convert()
        };
    }

    getMessageName(name) {
        let n = classify(name)
        if (this.messages[n]) {
            n += `_${Math.random().toString(36).substring(7).toUpperCase()}`
        }
        return n
    }

    handleMessage(obj, name) {
        if (!obj) return

        let self = this;

        self.messages[name] = Object.keys(obj).map((key, i) => {
            const t = getType(obj[key])
            switch (t) {
                case 'array':
                    const rt = getType(obj[key][0])
                    if (rt === 'object') {
                        const iname = self.getMessageName(key)
                        self.handleMessage(obj[key][0], iname)
                        return `repeated ${iname} ${key} = ${i + 1};`
                    } else {
                        return `repeated ${rt} ${key} = ${i + 1};`
                    }
                case 'object':
                    const iname = self.getMessageName(key)
                    self.messages[name] = self.handleMessage(obj[key], iname)
                    return `${iname} ${key} = ${i + 1};`
                default:
                    return `${t} ${key} = ${i + 1};`
            }
        })

        return self.messages[name]
    }

    convert() {
        let chunk = 'syntax = "proto3";\n',
            self = this;

        self.handleMessage(self.json, this.typeName);

        Object.keys(self.messages).forEach(key => {
            chunk += `\nmessage ${key} {\n`;
            chunk += '  ' + self.messages[key].join('\n  ');
            chunk += '\n}\n';
        });

        return chunk;
    }
}

module.exports = Json2proto;