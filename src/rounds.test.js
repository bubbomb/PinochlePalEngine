import {
  AllPlayers,
  FourPlayerRounds,
  FourPlayerTeams,
  Team1,
  Team2
} from './sampleGameData'
import { App } from './index.js'

describe('round function tests', () => {
  test('get rounds empty', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    expect(pinochlePal.GetRounds()).toEqual([])
  })

  test('get rounds', () => {
    const pinochlePal = App(AllPlayers, {
      teams: FourPlayerTeams,
      rounds: FourPlayerRounds
    })
    expect(pinochlePal.GetRounds()).toEqual(FourPlayerRounds)
  })

  test('start new round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    pinochlePal.StartNewRound()
    const expectedRound = {
      bid: {},
      melds: {},
      tricks: {},
      calculatedTotal: {}
    }
    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('start new round with rounds that already exist', () => {
    const pinochlePal = App(AllPlayers, {
      teams: FourPlayerTeams,
      rounds: FourPlayerRounds
    })
    pinochlePal.StartNewRound()

    expect(pinochlePal.GetRounds()).toHaveLength(3)
  })

  test('get current round', () => {
    const pinochlePal = App(AllPlayers, {
      teams: FourPlayerTeams,
      rounds: FourPlayerRounds
    })
    expect(pinochlePal.GetCurrentRound()).toEqual(
      FourPlayerRounds[FourPlayerRounds.length - 1]
    )
  })

  test('add bid to round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    const player = AllPlayers[0]
    pinochlePal.AddBidToCurrentRound(player.id, 200)
    const expectedRound = {
      bid: {
        amount: 200,
        player: player.id,
        team: Team1.id
      }
    }
    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add meld to round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    pinochlePal.AddMeldToCurrentRound(Team1.id, 250)
    const expectedRound = {
      melds: {
        [Team1.id]: 250
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add melds to round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    pinochlePal.AddMeldToCurrentRound(Team1.id, 250)
    pinochlePal.AddMeldToCurrentRound(Team2.id, 350)
    const expectedRound = {
      melds: {
        [Team1.id]: 250,
        [Team2.id]: 350
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add trick to round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    pinochlePal.AddTrickToCurrentRound(Team1.id, 50)
    const expectedRound = {
      tricks: {
        [Team1.id]: 50,
        [Team2.id]: 200
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add conflicting tricks to round', () => {
    const pinochlePal = App(AllPlayers, { teams: FourPlayerTeams })
    pinochlePal.AddTrickToCurrentRound(Team1.id, 50)
    pinochlePal.AddTrickToCurrentRound(Team2.id, 180)
    const expectedRound = {
      tricks: {
        [Team1.id]: 70,
        [Team2.id]: 180
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })
})
