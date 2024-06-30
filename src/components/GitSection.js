import React, { useEffect, useState, useCallback } from 'react';
import '../styles/table.scss'
import '../styles/app.scss'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { playJobThunk, cancelJobThunk, listJobsThunk } from '../thunks/gitThunk'

const GitSection = () => {
  const jobs = useSelector((state) => state.git.jobs || []);
  const [ isloading, setIsLoading ] = useState(true)

  const dispatch = useDispatch();

  const listJobsCallback = useCallback(
    () => {
      setIsLoading(true)
      dispatch(listJobsThunk())
      .unwrap()
      .finally(() => setIsLoading(false))
  })

  const playJobCallback = useCallback(
    (data) => {
      setIsLoading(true)
      dispatch(playJobThunk(data))
      .unwrap()
      .finally(() => setIsLoading(false))
  })

  const cancelJobCallback = useCallback(
    (data) => {
      setIsLoading(true)
      dispatch(cancelJobThunk(data))
      .unwrap()
      .finally(() => setIsLoading(false))
  })

  // useEffect(() => {
  //   listJobsCallback();
  // }, [jobs]);
  const latest3_jobs = jobs.slice(0, 3)
  return (
    <div className='git-section'>
      <div className='action'>
        <Button variant="contained" onClick={() => listJobsCallback()}>refresh git</Button>
        <Button variant="contained">push</Button>
      </div>
      {isloading ? (
        <div className='git-loading'><Icon>cached</Icon><span>Loading</span></div>
        ) : (
        <table className='ci-table'>
          <tr>
            <th>Status</th>
            <th>Job</th>
            <th>Action</th>
            <th>Name</th>
          </tr>
          {latest3_jobs.map((job) =>
            <tr key={job.id}>
              <td><a target="_blank" class="ci-status ci-manual has-tooltip" title="" data-html="true"
                      href="https://gitlabvm.asusautomation.com/stanley/spx_taas_v1.19/-/jobs/16340"
                      data-original-title="Manual">
                      <svg class="s16" data-testid="status_manual-icon">
                      <use xlinkHref="/icons.svg#status_manual"></use></svg>
                  {job.status}
                  </a>
              </td>
              <td>
                <span>#{job.id}</span>
                <div class="icon-container">
                  <svg class="s16 sprite" data-testid="fork-icon">
                  <use xlinkHref="icons.svg#fork"></use></svg>
                </div>
                <span>{job.ref}</span>
                <div class="label-container">
                    <span class="badge badge-primary">
                        stanley_runner
                        </span>
                </div>
              </td>
              <td>
              {job.ci_status ? (
                <div onClick={() => playJobCallback(job.id)}>
                  <Icon>play_arrow</Icon>
                </div>
              ) : (
                <div onClick={() => cancelJobCallback(job.id)}>
                  <Icon>cancel</Icon>
                </div>
              )}
              </td>
              <td>{job.name}</td>
            </tr>
          )}
        </table>
      )}
    </div>
  )
}

export default GitSection