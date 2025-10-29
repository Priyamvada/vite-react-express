'use strict';

const { Invoice, User } = require('../models');

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