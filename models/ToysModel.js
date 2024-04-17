var mongoose = require('mongoose');
var ToysSchema = mongoose.Schema(
   {
      name: {
        type : String,
            required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity:{
        type: Number,
        required: true
      }
   }
);

const ToysModel = mongoose.model("toys", ToysSchema);
module.exports = ToysModel;
