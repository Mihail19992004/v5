const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String}

})

module.exports = model('News', schema)