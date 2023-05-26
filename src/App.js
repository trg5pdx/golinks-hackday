import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>Search for a GitHub organization</h1>
      <div>
        <div>
          <form>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization
              </label>
              <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  id="githubOrgSearch"
                  aria-describedby="githubOrgSearch"
                  placeholder="Search for a GitHub Organization"
                />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
