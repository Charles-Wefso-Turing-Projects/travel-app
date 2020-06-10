import FetchData from './fetch';
import User from './user';

class Traveler extends User {
  constructor(id) {
    super(id);
  }

  async getData(id) {
    let data = new FetchData()
    this.travelersData = await data.getSpecificTravelerData(id)
    let userTrips = await data.getTripsData()
    this.destinatationData = await data.getDestinationsData()
    this.name = this.travelersData.name
    this.travlerType = this.travelersData.travelerType
    this.trips = userTrips
    this.getTrips(this.id, this.trips)
    this.getDestinations()
    this.getDestinationsIDs()
    this.calcCost()
    this.showTravelerPage()
  }

  getTrips(id, trips) {
    let theseTrips = trips.filter(trip => trip.userID === id) 
    return this.trips = theseTrips
  }

  showTravelerPage() {
    this.dom.showUserSidebar(this.name, this.total)
    this.dom.toggleLogin()
    this.dom.showUserCards(this.trips)
    this.populateDestinationList()
    this.setFormData()
 }

  calcCost() {
    let total = 0
    let costs = this.trips.forEach(trip => {
      total += trip.cost + (trip.cost * .1)
    })
    this.total = total
    return costs
  }

  populateDestinationList() {
    const destinationList = document.querySelector('.destination-select')
    const locales = []
    let destinationNames = this.destinations.forEach(destination => {
      locales.push(destination.destination)
    })
    let sortedLocales = locales.sort()

    return sortedLocales.forEach(locale => {
      destinationList.insertAdjacentHTML('beforeend',
      `<option value="${locale}">${locale}</option>`
      )
    })
  }

  setFormData() {
    var formData = new FormData(document.querySelector('form'))
    this.setFormValues(formData)
    this.submitButton()
    this.costButton()

  }

  costButton() {
    const costButton = document.querySelector('.estimate-cost')
    costButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.estimateNewTripCost()
    });
  }

  submitButton() {
    const submitButton = document.querySelector('.submit-trip')
    submitButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.setNewTripRequest(this.form)
      this.getData(this.id)
      this.dom.showUserCards(this.trips)
    });
  }

  setFormValues(formData) {
    this.form = {}
    this.form.destinationSelection = document.querySelector('.destination-select').value
    this.form.dateSelection = document.querySelector('.date').value
    this.form.durationSelection = document.querySelector('.duration').value
    this.form.numberOfTravelers = document.querySelector('.travelercount').value
  }

  setNewTripRequest(form) {
    this.setFormValues()
    if(!this.form.numberOfTravelers || !this.form.durationSelection || !this.form.dateSelection) {
      alert("Please enter required information.")
    } else {
    
      const setID = () => {
        return this.destinatationData.reduce((id, destination) => {
          if(destination.destination === form.destinationSelection) {
            id = destination.id
          }
          return id
        }, 0)
      }

      const fixDate = () => form.dateSelection.split('-').join('/')

      const tripData = {
        id: Date.now(),
        userID: this.id,
        destinationID: setID(),
        travelers: parseInt(form.numberOfTravelers),
        date: fixDate(),
        duration: parseInt(form.durationSelection), 
        status: 'pending',
        suggestedActivities: []
      }

      const fetch = new FetchData()

      fetch.requestTrip(tripData)
        .then(response => console.log(response))
        .catch(err => console.log(err.message))
    }
  }


  estimateNewTripCost() {
    this.setFormValues()
    if(!this.form.numberOfTravelers || !this.form.durationSelection || !this.form.dateSelection) {
      alert("Please enter required information.")
    } else {
      return this.destinations.map(destination => {
        if (this.form.destinationSelection === destination.destination){
          let lodgingCost = (destination.estimatedLodgingCostPerDay * this.form.numberOfTravelers) * this.form.durationSelection
          let flightCost = (destination.estimatedFlightCostPerPerson * this.form.numberOfTravelers)
          destination.cost = lodgingCost + flightCost
        }
        this.form.cost = destination.cost
        if(this.form.cost !== undefined) {
          this.showCost()
        }
      })
    }
  }

  showCost() {
    const tripCost = document.querySelector('.trip-cost')
    tripCost.innerHTML = `<section class="trip-cost">Estimated Cost: $${this.form.cost}<section>`
  }


//     I will select a date, duration, number of travelers and choose from a list of destinations
// After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.
// Once I submit the trip request, it will show on my dashboard as “pending” so that the travel agency can approve or deny it.
//   
// flight cost =  destination.estimatedFlightCostPerPerson * (number of travelers input)
// lodging cost = destination.estimatedLodgingCostPerDay * (number of duration input)
//

}

export default Traveler