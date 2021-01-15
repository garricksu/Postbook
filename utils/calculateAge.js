var moment = require('moment')
// Calculate age based of birthay in date format
const calculateAge = (birthday) => {
  const age = moment().diff(moment(birthday), 'years')
  return age
}

module.exports = calculateAge
