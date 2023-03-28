import { App } from './index.js'

describe('4 player game tests', () => {
  let players = [
    { id: 1, name: 'Carol' },
    { id: 2, name: 'Derek' },
    { id: 3, name: 'Spencer' },
    { id: 4, name: 'Kristi' }
  ]

  test('get teams empty', () => {
    const pinochlePal = App(players)
    expect(pinochlePal.GetTeams()).toEqual([])
  })

  test('get teams', () => {
    const currentGame = {
      teams: [
        { name: 'team1', members: [1, 2] },
        { name: 'team2', members: [3, 4] }
      ]
    }
    const pinochlePal = App(players, currentGame)
    const teams = pinochlePal.GetTeams()
    const expectedTeams = [
      {
        name: 'team1',
        members: [
          { id: 1, name: 'Carol' },
          { id: 2, name: 'Derek' }
        ]
      },
      {
        name: 'team2',
        members: [
          { id: 3, name: 'Spencer' },
          { id: 4, name: 'Kristi' }
        ]
      }
    ]
    expect(teams).toEqual(expectedTeams)
  })
})
