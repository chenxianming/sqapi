const protobuf = require("protobufjs");
const Json2proto = require("./json2proto");


class EncodeProto {
    constructor(props) {
        this.json = props.json;
        this.typeName = props.typeName || 'Message';
        this.original = props.original;

        try {
            this.proto = this.json2proto().proto;
            this.root = protobuf.parse(this.proto).root;
        } catch (e) {
            return {
                errMsg: 'invalid json format'
            }
        }

        this.proto = this.root.lookupType(this.typeName);
        this.buf = this.proto.encode(this.json).finish();

        return {
            protoBuf: this.buf.toJSON().data
        }
    }

    json2proto() {
        return new Json2proto({
            json: this.json,
            typeName: this.typeName
        });
    }
}

module.exports = EncodeProto;