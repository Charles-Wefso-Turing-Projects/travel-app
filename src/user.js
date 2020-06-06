import data from './fetch';

class User {
  constructor(id){
    id !== undefined ? this.id = id : this.id = 1
    this.username = 'traveler' + id
    this.password = 'travel2020'
    this.today = new Date();
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    this.destinations = []
  }

  async getData() {
    this.destinatationData = await data.getDestinationsData()
  }

  getDestinations() {
    let entries = Object.entries(this.destinatationData)
    return entries.forEach(entry => {
      this.destinations.push(entry[1])
    })
  }

  getDestinationsIDs() {
    let locales =  this.trips.forEach(trip => {
      let id = trip.destinationID
      let thisTrip = trip
      this.setDestinationNames(id, thisTrip)
      this.setCost(id, thisTrip)
    })
    return locales
  }

  setDestinationNames(id, thisTrip) {
    let setNames = this.destinations.forEach(destination => {
      if (destination.id === id) {
        thisTrip.locale = destination.destination
      }
    })
    return setNames
  }

  setCost(id, thisTrip) {
    let cost = this.destinations.forEach(destination => {
      if (destination.id === id) {
        thisTrip.cost = ((destination.estimatedLodgingCostPerDay + destination.estimatedFlightCostPerPerson) * thisTrip.travelers)
      }
    })
    return cost
  }



}

export default User