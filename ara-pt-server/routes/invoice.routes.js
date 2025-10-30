'use strict';

const { verifyToken } = require('../middleware/auth.middleware');
const { createInvoice, getInvoices, generatePaymentLink } = require('../controllers/invoice.controller');

module.exports = function(app) {
  app.post('/api/invoice', verifyToken, createInvoice);
  app.get('/api/invoices', verifyToken, getInvoices);
  app.get('/api/generate-payment-link', verifyToken, generatePaymentLink);
};
