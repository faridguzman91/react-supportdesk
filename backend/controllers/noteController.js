const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc get notes for ticket
// @route  GET /api/tickets/:ticketId/notes
// @access private_access

const getNotes = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  //get and check user

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //get ticket

  const ticket = await Ticket.findById(req.params.ticketId);

  //check user auth match current user

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //get notes by ticket id

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc create ticket note
// @route  POST /api/tickets/:ticketId/notes
// @access private_access

const addNotes = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  //get and check user

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //get ticket

  const tickets = await Ticket.findById(req.params.ticketId);

  //check user auth match current user

  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //create notes by ticket id

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNotes,
};
