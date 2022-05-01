import { atom } from 'jotai'
import { atomWithQuery } from 'jotai/query'

import { selectedTermAtom } from '../selected-term/selected-term'
import { TermInfo } from '../terms/terms'

const coursesAtom = atomWithQuery((get) => ({
  queryKey: ['courses', get(selectedTermAtom)],
  queryFn: async ({ queryKey: [, ti] }) => {
    const res = await fetch(`https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${(ti as TermInfo).code}.json`)
    return res.json()
  },
}))

export default coursesAtom;
