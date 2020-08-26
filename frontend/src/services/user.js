import axios from 'axios'

const baseUrl = '/api/user'

const create = async ({ username, password }) => {
  const res = await axios.post(baseUrl, {
    username,
    password
  })
  return res.data
}

const getUser = async ({ id }) => {
  const res = await axios.get(`baseUrl/${id}`)
  return res.data
}

export default {
  create,
  getUser
}