const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
// @route  GET /api/tickets
// @access private_access

const getTickets = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //get ticket

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Create tickets
// @route POST /api/tickets
// @access private_access

const createTicket = asyncHandler(async (req, res) => {
  //send body data
  //send product & description

  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("please add product and description");
  }

  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  //created msg

  res.status(201).json(ticket);
});

//get user tickets

// @desc Get user tickets
// @route POST /api/tickets/:id
// @access private_access

const getTicket = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //get ticket

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }

  res.status(200).json(ticket);
});

// @desc Delete tickets
// @route DELETE /api/tickets/:id
// @access private_access

const deleteTicket = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //delete ticket

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc Update tickets
// @route PUT /api/tickets/:id
// @access private_access

const updateTicket = asyncHandler(async (req, res) => {
  // get users using ID in jsonwebtokens

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //check ticket

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }

  // await ticket.remove();

  const updateTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};
