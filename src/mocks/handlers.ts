import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/businesses', () => {
    return HttpResponse.json([{ id: 1, name: "Test Business" }]);
  }),
];