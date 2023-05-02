// Setting up a centralized test.server.js file like this from which we can export an MSW server for import into any test...
// ... file is a nice pattern. The createServer() function takes a handlerConfig array argument.
import { setupServer } from "msw/lib/node";
import { rest } from 'msw';

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(
        ctx.json(
          config.res(req, res, ctx)
          )
      )
    })
  })

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  })

  beforeEach(() => {
    server.resetHandlers();
  })

  afterAll(() => {
    server.close();
  })
}