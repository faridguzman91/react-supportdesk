const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    product: {
      type: String,
      required: [true, "please select product"],
      //default choice
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']

    },
    description: {
      type: String,
      required: [true, "please enter description/issue"],
    },
    status: {
      type: String,
      required: true,
      //defaults
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
