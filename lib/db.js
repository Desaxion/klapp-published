// Detta är databasen :)
import { v4 as uuidv4 } from 'uuid'

// let db = null
// let db = {
//   people: [
//     {
//       name: 'DummyPerson',
//       id: 213415246456
//       presents: [
//            {
//            name: 'myPresent'
//            cost: 9999
// desc
//            presentid =
//          }
//        ]
//     }
//   ]
// }

function saveStorage (db) {
  window.localStorage.setItem('storage', JSON.stringify(db))
}

function loadStorage () {
  const dbString = window.localStorage.getItem('storage')
  let retrevedData = JSON.parse(dbString)

  if (!retrevedData) {
    // Initiate data structure
    retrevedData = { people: [], budget: 0 }
    saveStorage(retrevedData)
  }
  return retrevedData
}

export function getBudget () {
  return loadStorage().budget
}

export function setBudget (input) {
  const tempStorage = loadStorage()
  tempStorage.budget = input
  saveStorage(tempStorage)
}

export function getPeople () {
  return loadStorage().people
}

export function getPresents (id) {
  const targetedPerson = loadStorage().people.filter(person => person.id === id)[0]
  return targetedPerson.presents
}

export function checkPresent (checked, id) {
  const tempStorage = loadStorage()
  tempStorage.people = tempStorage.people.map(person => {
    person.presents = person.presents.map(present => {
      if (present.id === id) {
        present.checked = checked
        console.log('updated')
      }
      return present
    })
    return person
  })
  saveStorage(tempStorage)
}

export function addPerson (personName) {
  const newPerson = {
    name: personName,
    id: uuidv4(),
    presents: []
  }

  const tempStorage = loadStorage()
  tempStorage.people.push(newPerson)
  saveStorage(tempStorage)
}

export function flushDB () {
  window.localStorage.setItem('storage', null)
}

export function addPresent (presentName, presentCost, presentDesc, personid) {
  const newPresent = {
    name: presentName,
    cost: presentCost,
    desc: presentDesc,
    checked: false,
    id: uuidv4()
  }
  // let igenom eran databas efter ert id
  // lägg till present
  const tempStorage = loadStorage()
  const updatedPeopleList = tempStorage.people.map(person => {
    if (person.id === personid) {
      person.presents.push(newPresent)
    }
    return person
  })
  tempStorage.people = updatedPeopleList
  saveStorage(tempStorage)
}

export function getTotalCost (cost) {
  var total = 0
  const tempStorage = loadStorage()
  tempStorage.people.map(person => {
    for (var i = 0; i < person.presents.length; i++) {
      total += parseInt(person.presents[i].cost)
    }
  })
  return total
}

export function removePresent (id) {
  // Ladda in present Array
  const tempStorage = loadStorage()
  tempStorage.people.map(person => {
    person.presents = person.presents.filter(present => present.id !== id)
    return person
  })
  saveStorage(tempStorage)
}

export function removePerson (id) {
  // använd filter!
  // modifiera db filen
  // spara!
  const newDb = loadStorage()
  const updatedPeople = loadStorage().people.filter(person => person.id !== id)
  newDb.people = updatedPeople
  saveStorage(newDb)
}
