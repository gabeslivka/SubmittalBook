const express = require('express');
const cors = require('cors');
const { searchSubmittals, getSubmittalById, getAllSubmittals } = require('./submittalService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Search for submittals
 * GET /api/submittals/search?q=<query>
 * 
 * Example: /api/submittals/search?q=toilet
 * Returns submittals matching the search query
 */
app.get('/api/submittals/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Search query is required',
      message: 'Please provide a search query using the "q" parameter'
    });
  }

  // Validate query length to prevent abuse
  const MAX_QUERY_LENGTH = 200;
  if (typeof query !== 'string' || query.length > MAX_QUERY_LENGTH) {
    return res.status(400).json({
      error: 'Invalid search query',
      message: `Search query must be a string with maximum ${MAX_QUERY_LENGTH} characters`
    });
  }

  const results = searchSubmittals(query);
  res.json({
    query,
    count: results.length,
    results
  });
});

/**
 * Get a specific submittal by ID
 * GET /api/submittals/:id
 */
app.get('/api/submittals/:id', (req, res) => {
  const submittal = getSubmittalById(req.params.id);
  
  if (!submittal) {
    return res.status(404).json({ 
      error: 'Submittal not found',
      message: `No submittal found with ID: ${req.params.id}`
    });
  }

  res.json(submittal);
});

/**
 * Get all approved submittals
 * GET /api/submittals
 */
app.get('/api/submittals', (req, res) => {
  const submittals = getAllSubmittals({ status: 'approved' });
  res.json({
    count: submittals.length,
    results: submittals
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SubmittalBook API server running on port ${PORT}`);
    console.log(`Search endpoint: http://localhost:${PORT}/api/submittals/search?q=<query>`);
  });
}

module.exports = app;
