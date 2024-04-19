var mongoose = require('mongoose');
var BrandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        logoUrl: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        }
    }
);

const BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;
