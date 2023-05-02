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
    console.log("MSW server is listening");
    server.listen();
  })

  beforeEach(() => {
    console.log("MSW server handlers are reset");
    server.resetHandlers();
  })

  afterAll(() => {
    console.log("MSW server is closed");
    server.close();
  })
}