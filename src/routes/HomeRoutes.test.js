import { render, screen } from '@testing-library/react';
import HomeRoute from './HomeRoute';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

// Set up an MSW handler to intercept a particular request (e.g. GET /api/repositories) 
// But in the future, as an alternative to integrating an MSW server into each test file, consider the pattern of import'ing a centralized MSW
// (from ../test/server.js) as used in auth/AuthButtons.test.js
const handlers = [
  rest.get('api/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    console.log(`query intercepted is: ${query}`);

    const language = req.url.searchParams.get('q').split("language:")[1];

    return res(
      ctx.json({
        items: [
          {
            id: 132464395,
            full_name: `${language}_one`,
          },
          {
            id: 29028775,
            full_name: `${language}_two`,
          },
        ]
      })
    )
  })
];

// Now set up our Mock Service Worker server and register the handlers (array)
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
})

test("HomeRoute renders two links for each language", async () => {
  // Render component
  render(<MemoryRouter><HomeRoute /></MemoryRouter>)

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(); // the links won't be visible yet because we haven't waited (i.e. allowed enough of a delay for) the MSW worker to intercept the request and supply mock data

  // Induce a pause for the MSW to perform its interception and to return the mock data
  //await pause();

  // Loop over each language
  // For each language, make sure we see two links (corresponding to the two data items that our mock service worker returns)
  // Assert that the links have the appropriate full name

  const languages = ["rust", "go", "javascript", "typescript", "java", "python"];

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();

  for (let language of languages) {
    const regex = new RegExp(`${language}_`, "i");
    let links = await screen.findAllByRole("link", { name: regex});

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
})

// We could call this pause() function as an alternative to using the async findBy__ as an alternative strategy to ensure the MSW has finished before we do our assertions
const pause = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 1000);
})