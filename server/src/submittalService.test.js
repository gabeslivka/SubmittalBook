const { describe, it } = require('node:test');
const assert = require('node:assert');
const { searchSubmittals, getSubmittalById, getAllSubmittals } = require('./submittalService');

describe('submittalService', () => {
  describe('searchSubmittals', () => {
    it('should find submittals by product name', () => {
      const results = searchSubmittals('toilet');
      assert.ok(results.length > 0, 'Should find at least one result');
      assert.ok(
        results.some(r => r.productName.toLowerCase().includes('toilet')),
        'Results should include toilet-related products'
      );
    });

    it('should find submittals by keywords', () => {
      const results = searchSubmittals('bathroom');
      assert.ok(results.length > 0, 'Should find results for "bathroom"');
    });

    it('should find submittals by manufacturer', () => {
      const results = searchSubmittals('Kohler');
      assert.ok(results.length > 0, 'Should find Kohler products');
      assert.ok(
        results.every(r => r.manufacturer.toLowerCase().includes('kohler')),
        'All results should be from Kohler'
      );
    });

    it('should return empty array for invalid query', () => {
      assert.deepStrictEqual(searchSubmittals(''), []);
      assert.deepStrictEqual(searchSubmittals(null), []);
      assert.deepStrictEqual(searchSubmittals(undefined), []);
    });

    it('should return empty array for no matches', () => {
      const results = searchSubmittals('xyznonexistent');
      assert.strictEqual(results.length, 0);
    });

    it('should be case-insensitive', () => {
      const upperResults = searchSubmittals('TOILET');
      const lowerResults = searchSubmittals('toilet');
      const mixedResults = searchSubmittals('ToIlEt');
      
      assert.strictEqual(upperResults.length, lowerResults.length);
      assert.strictEqual(lowerResults.length, mixedResults.length);
    });

    it('should handle multi-word queries', () => {
      const results = searchSubmittals('ceiling tile');
      assert.ok(results.length > 0, 'Should find ceiling tile submittals');
    });

    it('should find lighting fixtures', () => {
      const results = searchSubmittals('light');
      assert.ok(results.length >= 2, 'Should find multiple lighting submittals');
    });
  });

  describe('getSubmittalById', () => {
    it('should return submittal by ID', () => {
      const submittal = getSubmittalById('sub-001');
      assert.ok(submittal, 'Should find submittal with ID sub-001');
      assert.strictEqual(submittal.id, 'sub-001');
    });

    it('should return null for non-existent ID', () => {
      const result = getSubmittalById('non-existent');
      assert.strictEqual(result, null);
    });
  });

  describe('getAllSubmittals', () => {
    it('should return all submittals', () => {
      const results = getAllSubmittals();
      assert.ok(results.length > 0, 'Should return submittals');
    });

    it('should filter by status', () => {
      const approved = getAllSubmittals({ status: 'approved' });
      assert.ok(approved.every(s => s.status === 'approved'));
    });
  });
});
