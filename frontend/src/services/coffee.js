import axios from "axios"

const baseUrl = "/api/coffee"

const getCoffeeNotes = async token => {
  const res = await axios.get(
    baseUrl,
    {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }
  )
  return res.data
}

const create = async (token, coffee) => {
  const res = await axios.post(
    baseUrl,
    coffee,
    {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }
  )
  return res.data
}

export default { 
  getCoffeeNotes,
  create
}