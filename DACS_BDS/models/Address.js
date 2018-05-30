const mongoose = require('mongoose');
const post = require('../routing/Post.router')
const SchemaAddress = mongoose.Schema;
//_id
const AddressSchema = new SchemaAddress({
    Tinh:          { type: String, required: true },
    Huyen:         { type: String, required: true },
    Thon_Xa:       { type: String, required: true },
});
const AddressMogo = mongoose.model('Address', AddressSchema);
class Address extends AddressMogo{
}
module.exports = Address;