import User from './user';

class Agent extends User {
  constructor(id) {
    super(id);
    this.username = 'agency'
  }
}

module.exports = Agent