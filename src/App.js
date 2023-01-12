import React from 'react';
import Collection from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryID, setCategoryID] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryID ? `category=${categoryID}` : '';

    fetch(`https://63c02731a177ed68abc0e971.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then(json => setCollections(json))
      .catch(err => {
        console.warn(err);
        alert(err)
      })
      .finally(() => setIsLoading(false))
  }, [categoryID, page]);

  return (
    <div className="App">
      <h1>Photo Collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((cat, i) => (
            <li
              key={cat.name}
              className={categoryID === i ? 'active' : ''}
              onClick={() => setCategoryID(i)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
      <input
        className="search-input"
        placeholder="Поиск по названию"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((collection) => collection.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((collection, index) => (
              <Collection
                key={index}
                name={collection.name}
                images={collection.photos}
              />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
