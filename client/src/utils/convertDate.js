import * as Constants from './constants'

export const convertDate = (dateString) => {
  const { months } = Constants
  const dateObj = new Date(dateString)
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  let minutes
  let time

  if (dateObj.getMinutes() < 10) {
    minutes = `0${dateObj.getMinutes()}`
  } else {
    minutes = `${dateObj.getMinutes()}`
  }
  if (hours === 0) {
    time = `12:${minutes}AM`
  } else if (hours > 12) {
    time = `${hours - 12}:${minutes}PM`
  } else {
    time = `${hours}:${minutes}AM`
  }
  return `${month} ${day}, ${year} at ${time}`
}
