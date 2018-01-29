import { schema } from 'normalizr'

const game = new schema.Entity('games', {} ,{idAttribute:'short'})
const games = new schema.Array(game)
export default {
  game,
  games
}
