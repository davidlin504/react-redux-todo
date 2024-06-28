import { gitLabInstance } from './apiManger'
import { git_mockData } from '../project'

export async function playJob(payload) {
  // const id = payload
  // const res = await gitLabInstance.post(`/projects/:id/jobs/${id}/play`)
  // return res.data
  return Promise.resolve({})
}

export async function cancelJob(payload) {
  // const id = payload
  // const res = await gitLabInstance.post(`/projects/92/jobs/${id}/cancel`)
  // return res.data
  return Promise.resolve({})
}

export async function listJobs(payload) {
  // cons project_id = payload
  // const res = await gitLabInstance.get(`/projects/${project_id}/jobs`)
  // return res.data
  return Promise.resolve({data: git_mockData})
}



