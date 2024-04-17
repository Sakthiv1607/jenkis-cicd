const { default: mongoose } = require("mongoose");
const Tickets = require("../model/ticket.model");
const { sendMail } = require('../send-mail');


const getAllTickets = async (req, res) => {
    try {
        const tickets = await Tickets.find();
        return res.json({ statusCode: 200, status: 'success', message: '', tickets: tickets });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};

const getUserTickets = async (req, res) => {
    try {
        const tickets = await Tickets.find({ user: req.userId }).populate('user');
        return res.json({ statusCode: 200, status: 'success', message: '', tickets: tickets });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};

const getTicket = async (req, res) => {
    try {
        const ticket = await Tickets.findOne({ _id: req.body.ticketId });
        return res.json({ statusCode: 200, status: 'success', message: '', ticket: ticket });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};


const createTicket = async (req, res) => {
    const { name, department, date, time, issue, comment } = req.body;

    const lastTicket = await Tickets.findOne({}, {}, { sort: { createdDT: -1 } });
    const lastTicketId = lastTicket ? Number(lastTicket.ticketId.substring(lastTicket.ticketId.length - 1, lastTicket.ticketId.length)) + 1 : 1;
    console.log(lastTicketId);
    const ticketId = `CERTA-IT-${lastTicketId}`;
    const ticket = new Tickets({
        ticketId: ticketId,
        name: name,
        department: department,
        date: date,
        time: time,
        issue: issue,
        comment: comment,
        status: 'Pending'
    });

    try {
        await ticket.save();
        // await sendMail(ticketId, req.body)
        const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAAQ7WhKNA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=W_SttGzt_lur1hj9pOus-73L_ufKkxi2oX1IQV5D8hY';

        const data = JSON.stringify({
            'text': `Request from ${req.body.name} - ${req.body.department}`,
        });

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: data,
        }).then((response) => {
        });

        return res.json({ statusCode: 200, status: 'success', message: `Ticket: ${ticketId} created successfully`, ticketId: ticketId });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const ticket = await Tickets.updateOne({ _id: req.body.ticketId }, { status: req.body.status });
        return res.json({ statusCode: 200, status: 'success', message: 'Ticket status updated successfully', ticketId: req.body.ticketId });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};

const updateTicketCompletedBy = async (req, res) => {
    try {
        await Tickets.updateOne({ _id: req.body.ticketId }, { completedBy: req.body.completedBy });
        return res.json({ statusCode: 200, status: 'success', message: 'Ticket completed by updated successfully', ticketId: req.body.ticketId });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};


const updateTicketCompletedTime = async (req, res) => {
    try {
        await Tickets.updateOne({ _id: req.body.ticketId }, { completedTime: req.body.completedTime });
        return res.json({ statusCode: 200, status: 'success', message: 'Ticket completed time updated successfully', ticketId: req.body.ticketId });
    } catch (error) {
        return res.json({ statusCode: 501, status: 'error', message: error.message });
    }
};

module.exports = { getAllTickets, getTicket, createTicket, updateTicketStatus, updateTicketCompletedBy, updateTicketCompletedTime, getUserTickets };