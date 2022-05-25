import {rest} from 'msw'
import { server } from '../config';

const handlers = [
  rest.get(`${server}/api/user`, async (req, res, ctx) => {
    return res(ctx.json({displayName: 'Test'}))
  }),
  rest.get(`${server}/api/subjects`, async (req, res, ctx) => {
    return res(ctx.json([]))
  }),
  rest.get(`${server}/api/courses`, async (req, res, ctx) => {
    return res(ctx.json([]))
  }),
]

export {handlers};