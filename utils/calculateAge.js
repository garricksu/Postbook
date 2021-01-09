var moment = require('moment')
// Calculate age based of birthay in date format
const calculateAge = (birthday) => {
  const ageResult = moment(birthday).fromNow().split(' ')
  const age = ageResult[0]
  return age
}

module.exports = calculateAge
