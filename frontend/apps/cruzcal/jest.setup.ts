import 'whatwg-fetch';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { server } from './mocks/server'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers();
  // Atoms keep local storage, so remove to prevent cross-test effects
  localStorage.clear();
})

afterAll(() => {
  server.close()
})
