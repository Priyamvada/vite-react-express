'use strict';

const { Invoice, User } = require('../models');
const { Op } = require('sequelize');

/**
 * POST /invoices
 * Create a new invoice
 */
exports.createInvoice = async (req, res) => {
  try {
    const {
      customer_email,
      customer_fullname,
      invoice_date,
      due_date,
      amount,
      currency,
    } = req.body;

    const createdById = req.userId;

    // Validate required fields
    if (
      !customer_email ||
      !customer_fullname ||
      !invoice_date ||
      !due_date ||
      !amount ||
      !createdById
    ) {
      return res.status(400).json({
        error:
          'Missing required fields. Please include customer_email, customer_fullname, invoice_date, due_date, and amount.',
      });
    }

    // Validate creator user exists
    const created_by_user = await User.findByPk(createdById);
    if (!created_by_user) {
      return res.status(404).json({ error: 'Creator user not found. Try logging out and logging back in to create the invoice.' });
    }

    // Create invoice
    const invoice = await Invoice.create({
      customer_email,
      customer_fullname,
      invoice_date,
      due_date,
      amount,
      currency,
      created_by_id: createdById,
    });

    return res.status(201).json({
      message: 'Invoice created successfully.',
      invoice,
    });
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * GET /invoices
 * Fetch all invoices or filter by created_by
 * e.g. /invoices?created_by=1
 */
exports.getInvoices = async (req, res) => {
  try {
    const { created_by } = req.query;

    if (created_by) {
      // Check if the user exists
      const user = await User.findByPk(created_by);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Fetch invoices for that user
      const invoices = await Invoice.findAll({
        where: { created_by },
        order: [['invoice_date', 'DESC']],
      });

      return res.status(200).json({ invoices });
    }

    // Otherwise return all invoices
    const invoices = await Invoice.findAll({
      order: [['invoice_date', 'DESC']],
    });

    res.status(200).json({ invoices });
  } catch (err) {
    console.error('Error fetching invoices:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getInvoicesByCustomerEmail = async (req, res) => {
  try {
    const { customer_email } = req.query;

    if (!customer_email) {
      return res.status(400).json({ error: 'customer_email query parameter is required.' });
    }

    // Fetch invoices for that customer email
    const invoices = await Invoice.findAll({
      where: {
        customer_email,
        payment_link: {
          [Op.not]: null,
        },
        paid_amount: 0.0,
      },
      order: [['invoice_date', 'DESC']],
    });
    
    return res.status(200).json({ invoices });
  } catch (err) {
    console.error('Error fetching invoices by customer email:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.generatePaymentLink = async (req, res) => {
  try {
    const { invoiceId } = req.query;

    // Find the invoice by ID
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found.' });
    }

    // Generate a payment link (this is a placeholder implementation)
    const paymentLink = `https://payment-portal.example.com/pay/${invoiceId}`;

    // Update the invoice with the payment link
    invoice.payment_link = paymentLink;
    await invoice.save();

    res.status(200).json({
      message: 'Payment link generated successfully.',
      payment_link: paymentLink,
    });
  } catch (err) {
    console.error('Error generating payment link:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};