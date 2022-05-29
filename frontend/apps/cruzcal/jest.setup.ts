import 'whatwg-fetch';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { server } from './mocks/server'

beforeAll(() => {
  server.listen();
})

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
})

afterEach(() => {
  server.resetHandlers();
  // Atoms keep local storage, so remove to prevent cross-test effects
  localStorage.clear();
})

afterAll(() => {
  server.close()
})
