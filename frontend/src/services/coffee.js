import axios from "axios"

const baseUrl = "/api/coffee"

function tokenize(token) {
  return {
    headers: {
      "Authorization": `bearer ${token}`
    }
  }
}

const getCoffeeNotes = async token => {
  const res = await axios.get(
    baseUrl,
    tokenize(token)
  )
  return res.data
}

const create = async (token, coffee) => {
  const res = await axios.post(
    baseUrl,
    coffee,
    tokenize(token)
  )
  return res.data
}

const deleteCoffeeNote = async (token, id) => {
  const res = await axios.delete(
    `${baseUrl}/${id}`,
    tokenize(token)
  )
  return res.data
}

export default { 
  getCoffeeNotes,
  create,
  deleteCoffeeNote
}