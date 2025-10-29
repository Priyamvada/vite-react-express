'use strict';

const { verifyToken } = require('../middleware/auth.middleware');
const { createInvoice, getInvoices } = require('../controllers/invoice.controller');

module.exports = function(app) {
  app.post('/api/invoice', verifyToken, createInvoice);
  app.get('/api/invoices', verifyToken, getInvoices);
};
