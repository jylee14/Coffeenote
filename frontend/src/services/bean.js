import axios from 'axios'

const baseUrl = '/api/bean'

function tokenize(token) {
  return {
    headers: {
      'Authorization': `bearer ${token}`
    }
  }
}

const getAll = async token => {
  const res = await axios.get(baseUrl, tokenize(token))
  return res.data
}

const deleteBean = async (id, token) => {
  const res = await axios.delete(`${baseUrl}/${id}`, tokenize(token))
  return res.data
}

export default { getAll, deleteBean }