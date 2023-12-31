import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    sender: {
        type: String,
        length: 100
    },
    receiver: {
        type: String,
        length: 100
    },
    ether: {
        type: Number,
    },
    executeAt: {
        type: String,
        length: 25
    },
    isExecutable: {
        type: Boolean
    },
    isExecuted: {
        type: Boolean
    }
}
)
let Transaction = mongoose.model('transactionrecords', TransactionSchema);
export default Transaction;