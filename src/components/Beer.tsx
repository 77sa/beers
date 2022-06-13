import {useState} from 'react';
import Ingredients from './Ingredients';
import {BeerProp} from '../types';

const Beer = (props: BeerProp) => {
  const [showDetails, toggleShowDetails] = useState(false);
  const [showIngredients, toggleShowIngredients] = useState(false);
  return (
    <div key={props.id} className="card mb-10 p-2">
      <h4
        className="card-title beername"
        onClick={() => toggleShowDetails(!showDetails)}
        data-testid="title"
      >
        {props.name}
      </h4>
      {showDetails && (
        <>
          <div className="d-flex mb-3">
            <img
              className="beerimage"
              src={props.image_url}
              alt={props.name}
              data-testid="img"
            />
            <div className="d-flex flex-column ms-3">
              <p data-testid="desc">{props.description}</p>
              <p data-testid="abv">ABV: {props.abv}</p>
              <p data-testid="vol">
                Volume: {props.volume.value + ' ' + props.volume.unit}
              </p>
              <h5>Food pairings:</h5>
              <ul>
                {props.food_pairing.map((pairing) => (
                  <li key={pairing}>{pairing}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm mb-1"
            onClick={() => toggleShowIngredients(!showIngredients)}
            data-testid="toggle-ingredients"
          >
            {showIngredients ? 'Hide ingredients' : 'Show ingredients'}
          </button>
          {showIngredients && (
            <Ingredients
              yeast={props.ingredients.yeast}
              hops={props.ingredients.hops}
              malt={props.ingredients.malt}
              brewers_tips={props.brewers_tips}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Beer;
