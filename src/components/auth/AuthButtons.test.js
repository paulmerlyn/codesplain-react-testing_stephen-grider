import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

describe("When user is not signed in", () => {
  // createServer()  --> GET api/user  --> { user: null }
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

  test("When user is not signed in, sign in and sign up are visible", () => {

  })

  test("When user is not signed in, sign out is not visible", () => {
    
  })

})

describe("When user is signed in", () => {
  // createServer()  --> GET api/user  --> { user: null }
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

  test("When user is not signed in, sign in and sign up are visible", () => {

  })

  test("When user is not signed in, sign out is not visible", () => {
    
  })

})