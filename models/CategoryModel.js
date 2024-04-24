var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema(
    {
        name: {
            type: String
        }
    }
)

var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;
