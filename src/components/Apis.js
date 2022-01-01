import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    mode: 'no-cors',
    headers: {'Access-Control-Allow-Origin':'*', 'content-type':'text/json'},
})

export const insertTree = (id, payload) => api.post(`/api/${id}`, payload)
export const getAllTrees = () => api.get('/api/all')
export const updateTreeById = (id, payload) => api.put(`/api/${id}`, payload)
export const deleteTreeById = id => api.delete(`/api/${id}`)
export const getTreeById = id => api.get(`/api/${id}`)

const Apis = {
    insertTree,
    getAllTrees,
    updateTreeById,
    deleteTreeById,
    getTreeById,
}

export default Apis
