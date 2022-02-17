import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Moisés'},
    {id: 2, name: 'Neto'},
    {id: 3, name: 'Geo'}
  ]

  return response.json(users);
}