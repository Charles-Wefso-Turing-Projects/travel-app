import data from './fetch';
import User from './user';
import Agent from './agent';
import Traveler from './traveler';

let travelersData
let tripsData
let destinationsData
let loginData
let traveler, agent


const nameBox = document.querySelector('.username');
const passwordBox = document.querySelector('.password')

class DomUpdates {
  constructor() {
  }

  makeProfile() {
    let userinput = nameBox.value
    let passwordinput = passwordBox.value
    loginData = {username : userinput, password : passwordinput}
    if (loginData.username.toLowerCase().includes('agency') && loginData.password === 'travel2020') {
      this.makeAgency()
    } else if (loginData.username.toLowerCase().includes('traveler') && loginData.password === 'travel2020') {
      this.makeTraveler()
    } else {
      alert('Invalid Login')
    }
  }
  
  makeAgency(){
    agent = new Agent()
    agent.getData()
  }
  
  makeTraveler() {
    var id = loginData.username.match(/(\d+)/);
    id = parseInt(id[0])
    traveler = new Traveler(id)
    this.setTravelerData(id)
  }
  
  async setTravelerData(id) {
    await traveler.getData(id)
    await traveler.getTrips(id, tripsData)
    traveler.showTravelerPage(traveler.id)
  }

}

export default DomUpdates