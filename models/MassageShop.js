const mongoose = require("mongoose");


const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number']
    },
    opentime: {
        type: String,
        required: [true, 'Please add open time']
    },
    closetime: {
        type: String,
        required: [true, 'Please add close time']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Reverse populate with virtuals
MassageShopSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'massageShop',
    justOne: false
});

// Cascade delete reservations when a massageShop is deleted
MassageShopSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`Reservations being removed from massage shop ${this._id}`);
    await this.model('Reservation').deleteMany({ massageShop: this._id });
    next();
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);
