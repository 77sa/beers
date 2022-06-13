import {useEffect, useState} from 'react';
import Beer from './components/Beer';
import NavButton from './components/NavButton';
import SearchBar from './components/SearchBar';
import {BeerProp} from './types';
import './App.css';

function App() {
  let [beers, setBeers] = useState<BeerProp[]>([]);
  let [page, setPage] = useState(1);
  let [search, setSearch] = useState('');

  const getBeers = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    if (res.ok) {
      setBeers(json);
    }
  };

  useEffect(() => {
    let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=15${
      search && '&beer_name=' + search
    }`;

    getBeers(url).catch(console.error);
  }, [page, search]);

  return (
    <div>
      <header className="text-center">
        <h1>Beers</h1>
      </header>
      <div className="container d-grid gap-2 w-50">
        <SearchBar onSearch={setSearch} />
        {beers.map((beer) => (
          <Beer
            id={beer.id}
            name={beer.name}
            description={beer.description}
            abv={beer.abv}
            volume={beer.volume}
            ingredients={beer.ingredients}
            image_url={beer.image_url}
            brewers_tips={beer.brewers_tips}
            food_pairing={beer.food_pairing}
          />
        ))}
        <div className="d-flex justify-content-center gap-2 mb-2">
          <NavButton text="prev" setPage={setPage} disabled={page === 1} />
          <p data-testid="page">{page}</p>
          <NavButton text="next" setPage={setPage} disabled={beers.length < 15} />
        </div>
      </div>
    </div>
  );
}

export default App;
