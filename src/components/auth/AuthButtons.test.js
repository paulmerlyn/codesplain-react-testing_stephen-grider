/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

const pause = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(), 1000);
  })
}

function renderComponent() {
    render(<MemoryRouter><AuthButtons /></MemoryRouter>)

}
describe("When user is not signed in", () => {
  // createServer()  --> GET api/user  --> { user: null }
  // Set up the Mock Service Worker to intercept our API request and deliver the desired mock response
  createServer(
    [
      {
        path: 'api/user',
        res: () => {
          return { user: null }
        },
      },
    ]
  )

  test("sign in and sign up are visible", async () => {
    renderComponent();

    // Identify a JSX element of interest or manipulate the component
    // eslint-disable-next-line testing-library/no-debugging-utils

    screen.debug();
    //await pause();  // Now that we have the findBy__() call in place (below), be sure to comment out the pause() invocation otherwise the act() warning will remain in the terminal
    screen.debug();

    // eslint-disable-next-line testing-library/no-debugging-utils
    //screen.logTestingPlaygroundURL()

    const links = await screen.findAllByRole('link', { name: /sign in/i });
  })

  test("sign out is not visible", () => {
    renderComponent();
    
  })

})

describe("When user is signed in", () => {
  // createServer()  --> GET api/user  --> { user: null }
  // Set up the Mock Service Worker to intercept our API request and deliver the desired mock response
  createServer(
    [
      {
        path: 'api/user',
        res: () => {
          return { user: { id: 3, email: 'asdf@asdf.com' } }
        },
      },
    ]
  )

  test("sign in and sign up are visible", () => {
    renderComponent();

  })

  test("sign out is not visible", () => {
    renderComponent();
    
  })

})