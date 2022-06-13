import {IngredientsProp} from '../types';

const Ingredients = (props: IngredientsProp) => {
  return (
    <div data-testid="ingredients">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Malt</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.malt.map((malt) => (
            <tr key={malt.name}>
              <th scope="row">{malt.name}</th>
              <td>{malt.amount.value + ' ' + malt.amount.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hops</th>
            <th scope="col">Amount</th>
            <th scope="col">Attribute</th>
            <th scope="col">Add</th>
          </tr>
        </thead>
        <tbody>
          {props.hops.map((hops) => (
            <tr key={hops.name}>
              <th scope="row">{hops.name}</th>
              <td>{hops.amount.value + ' ' + hops.amount.unit}</td>
              <td>{hops.attribute}</td>
              <td>{hops.add}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5 data-testid="yeast">Yeast: {props.yeast}</h5>
      <p data-testid="tips">{props.brewers_tips}</p>
    </div>
  );
};

export default Ingredients;
