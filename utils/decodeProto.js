const protobuf = require("protobufjs");
const Json2proto = require("./json2proto");


class DecodeProto {
    constructor(props) {
        this.json = props.json;
        this.typeName = props.typeName || 'Message';

        try {
            this.proto = this.json2proto().proto;
            this.root = protobuf.parse(this.proto).root;
            this.proto = this.root.lookupType(this.typeName);
        } catch (e) {
            this.errMsg = 'invalid json format';
            return {
                middleware: this.middleware
            }
        }
        
        return {
            middleware: this.middleware.bind(this),
            json: this.json,
            proto: this.proto
        }
    }

    middleware(req, res, next) {
        
        if( this.errMsg ){
            return res.json({
                errMsg: this.errMsg
            });
        }
        
        let protoBuf = req.body['protoBuf'] || req.headers['protoBuf'];
        
        let json = JSON.parse( protoBuf );
        
        let arr = json.map( a => a * 1 );

        let buf = new Uint8Array( arr );
        
        try{
            let obj = this.proto.toObject( this.proto.decode( buf ) );
            req.body.data = obj;
        }catch(e){
            return res.json({
                errMsg: 'invalid protobuf format'
            });
        }
        
        next();
    }

    json2proto() {
        return new Json2proto({
            json: this.json,
            typeName: this.typeName
        });
    }
}

module.exports = DecodeProto;