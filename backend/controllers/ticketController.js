const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
// @route  GET /api/tickets
// @access private_access

const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getTickets" });
});

// @desc Create tickets
// @route POST /api/tickets
// @access private_access

const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createTickets" });
});

module.exports = {
  getTickets,
  createTicket,
};