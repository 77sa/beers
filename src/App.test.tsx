import {fireEvent, render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import App from './App';
import Beer from './components/Beer';
import Ingredients from './components/Ingredients';
import SearchBar from './components/SearchBar';

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders header', () => {
  render(<App />, container);
  const element = screen.getByText(/Beers/i);
  expect(element).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />, container);
  const searchBar = screen.getByTestId('search-bar');
  expect(searchBar).toBeInTheDocument();
});

test('should search', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />, container);
  const searchBar = screen.getByTestId('search-bar');

  fireEvent.change(searchBar, {target: {value: 'test'}});
  expect(onSearch).toHaveBeenCalledWith('test');
});

test('should go to the next page and back', async () => {
  render(<App />, container);

  const page = screen.getByTestId('page');
  const nextPage = screen.getByTestId('next');
  const prevPage = screen.getByTestId('prev');

  expect(page.textContent).toEqual('1');

  // Next button is disabled since no data fetched:
  act(() => {
    nextPage.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(page.textContent).toEqual('1');
  // expect(page.textContent).toEqual('2');

  act(() => {
    prevPage.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(page.textContent).toEqual('1');
});

test('renders beer', () => {
  render(
    <Beer
      id={2}
      name={'Trashy Blonde'}
      description={`A titillating, neurotic, peroxide punk of a Pale Ale. 
        Combining attitude, style, substance, and a little bit 
        of low self esteem for good measure; what would your mother 
        say? The seductive lure of the sassy passion fruit hop proves 
        too much to resist. All that is even before we get onto the 
        fact that there are no additives, preservatives, 
        pasteurization or strings attached. All wrapped up with the 
        customary BrewDog bite and imaginative twist.`}
      abv={4.1}
      volume={{
        value: 20,
        unit: 'litres',
      }}
      ingredients={{
        malt: [
          {
            name: 'Maris Otter Extra Pale',
            amount: {
              value: 3.25,
              unit: 'kilograms',
            },
          },
        ],
        hops: [
          {
            name: 'Amarillo',
            amount: {
              value: 13.8,
              unit: 'grams',
            },
            add: 'start',
            attribute: 'bitter',
          },
        ],
        yeast: 'Wyeast 1056 - American Ale™',
      }}
      image_url={'https://images.punkapi.com/v2/2.png'}
      brewers_tips={`Be careful not to collect too much wort from the mash. 
      Once the sugars are all washed out there are some very unpleasant 
      grainy tasting compounds that can be extracted into the wort.`}
      food_pairing={['Fresh crab with lemon']}
    />,
    container
  );

  const title = screen.getByTestId('title');
  expect(title.textContent).toEqual('Trashy Blonde');

  act(() => {
    title.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const img = screen.getByTestId('img');
  expect(img.getAttribute('src')).toEqual('https://images.punkapi.com/v2/2.png');

  const desc = screen.getByTestId('desc');
  expect(desc.textContent).toEqual(
    `A titillating, neurotic, peroxide punk of a Pale Ale. 
        Combining attitude, style, substance, and a little bit 
        of low self esteem for good measure; what would your mother 
        say? The seductive lure of the sassy passion fruit hop proves 
        too much to resist. All that is even before we get onto the 
        fact that there are no additives, preservatives, 
        pasteurization or strings attached. All wrapped up with the 
        customary BrewDog bite and imaginative twist.`
  );

  const abv = screen.getByTestId('abv');
  expect(abv.textContent).toEqual('ABV: 4.1');

  const vol = screen.getByTestId('vol');
  expect(vol.textContent).toEqual('Volume: 20 litres');

  const pairing = screen.getByText('Fresh crab with lemon');
  expect(pairing).toBeInTheDocument();

  const toggleIngredients = screen.getByTestId('toggle-ingredients');
  expect(toggleIngredients.textContent).toEqual('Show ingredients');

  act(() => {
    toggleIngredients.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(toggleIngredients.textContent).toEqual('Hide ingredients');

  const maltTable = screen.getByTestId('ingredients');
  expect(maltTable).toBeInTheDocument();
});

test('renders ingredients', () => {
  render(
    <Ingredients
      yeast="Wyeast 1056 - American Ale™"
      hops={[
        {
          name: 'Amarillo',
          amount: {
            value: 13.8,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
      ]}
      malt={[
        {
          name: 'Maris Otter Extra Pale',
          amount: {
            value: 3.25,
            unit: 'kilograms',
          },
        },
      ]}
      brewers_tips={`Be careful not to collect too much wort from the mash. 
      Once the sugars are all washed out there are some very unpleasant 
      grainy tasting compounds that can be extracted into the wort.`}
    />,
    container
  );

  const malt = screen.getByText('Maris Otter Extra Pale');
  expect(malt).toBeInTheDocument();

  const hops = screen.getByText('Amarillo');
  expect(hops).toBeInTheDocument();

  const yeast = screen.getByTestId('yeast');
  expect(yeast.textContent).toEqual('Yeast: Wyeast 1056 - American Ale™');

  const tips = screen.getByTestId('tips');
  expect(tips.textContent).toEqual(
    `Be careful not to collect too much wort from the mash. 
      Once the sugars are all washed out there are some very unpleasant 
      grainy tasting compounds that can be extracted into the wort.`
  );
});
