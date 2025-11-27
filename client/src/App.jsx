import { useState } from 'react';
import { useSubmittalSearch } from './useSubmittalSearch';

function SubmittalCard({ submittal }) {
  return (
    <div className="submittal-card" role="article">
      <div className="submittal-header">
        <span className="submittal-category">{submittal.productCategory}</span>
        <span className="submittal-status">{submittal.status}</span>
      </div>
      
      <h3 className="submittal-name">{submittal.productName}</h3>
      <p className="submittal-manufacturer">
        {submittal.manufacturer} — {submittal.modelNumber}
      </p>
      <p className="submittal-description">{submittal.description}</p>
      
      <div className="submittal-details">
        <div className="detail-item">
          <span className="detail-label">CSI Section</span>
          <span className="detail-value">{submittal.csiSection}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Approved</span>
          <span className="detail-value">
            {new Date(submittal.approvalDate).toLocaleDateString()}
          </span>
        </div>
        <div className="detail-item full-width">
          <span className="detail-label">Location</span>
          <span className="detail-value">{submittal.location}</span>
        </div>
      </div>
    </div>
  );
}

function SearchResults({ results, hasSearched, isLoading, query }) {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Searching for submittals...</p>
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        <h3>No submittals found</h3>
        <p>Try searching with different terms like "toilet", "sink", "light", or "ceiling"</p>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <span className="results-count">
          Found {results.length} approved submittal{results.length !== 1 ? 's' : ''}
          {query && ` for "${query}"`}
        </span>
      </div>
      <div className="submittal-grid">
        {results.map((submittal) => (
          <SubmittalCard key={submittal.id} submittal={submittal} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { results, isLoading, error, hasSearched, search } = useSubmittalSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    search(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📋 SubmittalBook</h1>
        <p>Quickly find approved submittals for your construction project</p>
      </header>

      <main className="main-content">
        <section className="search-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="search-label">
              What product are you looking for?
            </label>
            <div className="search-input-wrapper">
              <input
                id="search-input"
                type="text"
                className="search-input"
                value={query}
                onChange={handleInputChange}
                placeholder='e.g., "What toilet are we installing?" or just "toilet"'
                autoComplete="off"
                autoFocus
              />
              <button
                type="submit"
                className="search-button"
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            <p className="search-hint">
              Try searching for: toilet, sink, light, ceiling tile, paint, door, lock, or HVAC
            </p>
          </form>
        </section>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <SearchResults
          results={results}
          hasSearched={hasSearched}
          isLoading={isLoading}
          query={searchQuery}
        />
      </main>

      <footer className="footer">
        <p>SubmittalBook — Making construction documentation accessible</p>
      </footer>
    </div>
  );
}

export default App;
