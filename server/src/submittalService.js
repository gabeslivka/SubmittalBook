const { submittals } = require('./data');

/**
 * Search for submittals matching the given query.
 * Performs case-insensitive search across multiple fields including:
 * - Product name
 * - Product category
 * - Description
 * - Keywords
 * - Location
 * - Manufacturer
 * - Model number
 * 
 * @param {string} query - Search query from user
 * @param {object} options - Search options
 * @param {string} options.status - Filter by status (e.g., 'approved')
 * @returns {Array} Matching submittals sorted by relevance
 */
function searchSubmittals(query, options = {}) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  const statusFilter = options.status || 'approved';

  // Calculate relevance score for each submittal
  const scoredResults = submittals
    .filter(submittal => submittal.status === statusFilter)
    .map(submittal => {
      let score = 0;
      const searchableFields = [
        { field: submittal.productName.toLowerCase(), weight: 10 },
        { field: submittal.productCategory.toLowerCase(), weight: 8 },
        { field: submittal.description.toLowerCase(), weight: 5 },
        { field: submittal.keywords.join(' ').toLowerCase(), weight: 7 },
        { field: submittal.location.toLowerCase(), weight: 3 },
        { field: submittal.manufacturer.toLowerCase(), weight: 4 },
        { field: submittal.modelNumber.toLowerCase(), weight: 4 },
        { field: submittal.sectionTitle.toLowerCase(), weight: 3 }
      ];

      for (const term of searchTerms) {
        for (const { field, weight } of searchableFields) {
          if (field.includes(term)) {
            score += weight;
            // Bonus for exact word match
            if (field.split(/\s+/).includes(term)) {
              score += weight * 0.5;
            }
          }
        }
      }

      return { submittal, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.submittal);

  return scoredResults;
}

/**
 * Get a submittal by its ID.
 * @param {string} id - Submittal ID
 * @returns {object|null} The submittal or null if not found
 */
function getSubmittalById(id) {
  return submittals.find(s => s.id === id) || null;
}

/**
 * Get all submittals.
 * @param {object} options - Filter options
 * @param {string} options.status - Filter by status
 * @returns {Array} All submittals matching the filter
 */
function getAllSubmittals(options = {}) {
  if (options.status) {
    return submittals.filter(s => s.status === options.status);
  }
  return submittals;
}

module.exports = {
  searchSubmittals,
  getSubmittalById,
  getAllSubmittals
};
