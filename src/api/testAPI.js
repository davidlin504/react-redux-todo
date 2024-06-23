import { publicInstance } from './apiManger'

export async function testAPI() {
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

export async function login(payload) {
  const res = await publicInstance.post('/login', payload)
  return res.data
}
