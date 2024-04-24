var mongoose = require('mongoose');
var CartSchema = mongoose.Schema(
    {
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'toys'
        }
    }
);

const CartModel = mongoose.model("carts", CartSchema);
module.exports = BrandModel;
