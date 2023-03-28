import { App } from './index.js'

describe('team function tests', () => {
  let players = [
    { id: 1, name: 'Carol' },
    { id: 2, name: 'Derek' },
    { id: 3, name: 'Spencer' },
    { id: 4, name: 'Kristi' }
  ]
  let currentGame = {
    teams: [
      { id: 1, name: 'team1', members: [1, 2] },
      { id: 2, name: 'team2', members: [3, 4] }
    ]
  }

  test('get teams empty', () => {
    const pinochlePal = App(players)
    expect(pinochlePal.GetTeams()).toEqual([])
  })

  test('get teams', () => {
    const pinochlePal = App(players, currentGame)
    const teams = pinochlePal.GetTeams()
    const expectedTeams = [
      {
        id: 1,
        name: 'team1',
        members: [
          { id: 1, name: 'Carol' },
          { id: 2, name: 'Derek' }
        ]
      },
      {
        id: 2,
        name: 'team2',
        members: [
          { id: 3, name: 'Spencer' },
          { id: 4, name: 'Kristi' }
        ]
      }
    ]
    expect(teams).toEqual(expectedTeams)
  })

  test('get team for player', () => {
    const pinochlePal = App(players, currentGame)
    const teamId1 = pinochlePal.GetTeamIdFromPlayerId(2)
    const teamId2 = pinochlePal.GetTeamIdFromPlayerId(3)
    expect(teamId2).toBe(2)
    expect(teamId1).toBe(1)
  })
})
