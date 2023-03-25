import { App } from './index.js'

describe('player tests', () => {
  let carol = {
    id: 1,
    name: 'Carol'
  }

  let derek = {
    id: 2,
    name: 'Derek'
  }

  let spencer = {
    id: 3,
    name: 'Spencer'
  }

  test('get players empty', () => {
    expect(App().GetPlayers()).toStrictEqual([])
  })

  test('get players', () => {
    const players = [carol]
    const pinochlePal = App(players)

    expect(pinochlePal.GetPlayers()).toEqual(players)
  })
  test('get 2 players', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('set players', () => {
    const players = [carol, derek]
    const pinochlePal = App()

    pinochlePal.SetPlayers(players)
    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('overwrite players', () => {
    const players = [carol, derek]
    const pinochlePal = App([spencer])

    pinochlePal.SetPlayers(players)
    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('add player', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    pinochlePal.AddPlayer(spencer)
    let expectedPlayers = [...players, spencer]
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(3)
    expect(playersToCheck).toEqual(expect.arrayContaining(expectedPlayers))
  })

  test('add player without id', () => {
    const pinochlePal = App()
    let noIdPlayer = {
      name: 'No Idea'
    }
    expect(() => {
      pinochlePal.AddPlayer(noIdPlayer)
    }).toThrow()
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(0)
  })

  test('add player without name', () => {
    const pinochlePal = App()
    let noIdPlayer = {
      id: 0
    }
    expect(() => {
      pinochlePal.AddPlayer(noIdPlayer)
    }).toThrow()
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(0)
  })

  test('add player with id already used', () => {
    const players = [carol]
    const pinochlePal = App(players)
    let playerWithSameId = {
      id: 1,
      name: 'Kristi'
    }
    expect(() => {
      pinochlePal.AddPlayer(playerWithSameId)
    }).toThrow()
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(1)
  })

  test('add player with name already used', () => {
    const players = [carol]
    const pinochlePal = App(players)
    let playerWithSameId = {
      id: 2,
      name: 'Carol'
    }
    expect(() => {
      pinochlePal.AddPlayer(playerWithSameId)
    }).toThrow()
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(1)
  })

  test('remove player by id', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    pinochlePal.RemovePlayerById(derek.id)
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(1)
    expect(playersToCheck).toEqual(expect.arrayContaining([carol]))
  })

  test('remove player, but id doesnt exist', () => {
    const players = [carol]
    const pinochlePal = App(players)

    pinochlePal.RemovePlayerById(0)
    const playersToCheck = pinochlePal.GetPlayers()
    expect(playersToCheck).toHaveLength(1)
    expect(playersToCheck).toEqual(expect.arrayContaining([carol]))
  })

  test('get player by id', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    let playerRetrieved = pinochlePal.GetPlayerById(derek.id)
    expect(playerRetrieved).toEqual(derek)
  })

  test('get player by id, but id doesnt exist', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    let playerRetrieved = pinochlePal.GetPlayerById(0)
    expect(playerRetrieved).toEqual(undefined)
  })

  test('update player', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    const update = { name: 'Carol D.', foo: 'bar' }
    pinochlePal.UpdatePlayer(carol.id, update)
    const newCarol = pinochlePal.GetPlayerById(carol.id)

    const expectedNewCarol = {
      ...carol,
      ...update
    }
    expect(newCarol).toEqual(expectedNewCarol)
  })

  test('update player id throws error', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    const update = { id: 0, name: 'Carol D.', foo: 'bar' }
    expect(() => {
      pinochlePal.UpdatePlayer(carol.id, update)
    }).toThrow()
  })

  test('update player, name must be unique', () => {
    const players = [carol, derek]
    const pinochlePal = App(players)

    const update = { name: 'Derek' }
    expect(() => {
      pinochlePal.UpdatePlayer(carol.id, update)
    }).toThrow()
  })
})
