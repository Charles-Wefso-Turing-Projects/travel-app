import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler'
import destinations from './test-data/destinations'
import trips from './test-data/trips'

describe('Traveler Class', () => {

  let traveler;

  beforeEach(() => {
    traveler = new Traveler(10);
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  })

  it('should create an User instance', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  })

  it('should be able to get own user data', () => {
    traveler.calcCost()
    traveler.getTrips(10, trips)
    expect(traveler.total).to.eql('');
  })

  // it('should have a default username of traveler plus user id) ', () => {
  //   expect(user.username).to.eql('traveler10');
  // })

})
