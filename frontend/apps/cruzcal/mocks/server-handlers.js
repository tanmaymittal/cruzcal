import {rest} from 'msw'
import { server } from '../config';
import { terms, subjects, courses } from './data';

const handlers = [
  rest.get(`${server}/api/auth/check`, async (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get(`${server}/api/user`, async (req, res, ctx) => {
    return res(ctx.json({displayName: 'Test'}))
  }),
  rest.get(`${server}/api/terms`, async (req, res, ctx) => {
    return res(ctx.json(terms))
  }),
  rest.get(`${server}/api/subjects`, async (req, res, ctx) => {
    return res(ctx.json(subjects))
  }),
  rest.get(`${server}/api/courses`, async (req, res, ctx) => {
    return res(ctx.json(courses))
  }),
]

export {handlers};
