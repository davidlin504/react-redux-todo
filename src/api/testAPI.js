import { publicInstance } from './apiManger'

export async function getTests() {
  try {
    const res = await publicInstance.get(
      '/tests',
    )
    return res.data
  } catch (err) {
    console.err(err)
    Promise.reject(err)
  }
}

export async function postTests(payload) {
  // const res = await publicInstance.post('/', payload)
  // return res.data
  return {data: {}}
}

export async function login(payload) {
  const res = await publicInstance.post('/login', payload)
  return res.data
}
