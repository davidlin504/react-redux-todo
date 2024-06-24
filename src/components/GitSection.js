import React, { useEffect, useState } from 'react';
import '../styles/table.scss'
import Icon from '@material-ui/core/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { playJob } from '../reducers/gitSlice'

const GitSection = () => {
  const data = useSelector((state) => state.git.jobs || []);

  const dispatch = useDispatch();

  const handlePlayJob = (id) => {
    dispatch(playJob({ id }));
  };

  return (
    <div>
      <table>
        <tr>
          <th>Status</th>
          <th>Job</th>
          <th>Name</th>
        </tr>
        {data.map((job) =>
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
            {job.ci_status ? (
              // <a title="Play" class="btn btn-build" rel="nofollow" data-method="post" href="/stanley/spx_taas_v1.19/-/jobs/16363/play?return_to=https%3A%2F%2Fgitlabvm.asusautomation.com%2Fstanley%2Fspx_taas_v1.19%2F-%2Fjobs">
              // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 11" class="icon-play"><path fill-rule="evenodd" d="m9.283 6.47l-7.564 4.254c-.949.534-1.719.266-1.719-.576v-9.292c0-.852.756-1.117 1.719-.576l7.564 4.254c.949.534.963 1.392 0 1.934"></path></svg>
              // </a>
              <div onClick={() => handlePlayJob(job.id)}>
                <Icon>PlayArrow</Icon>
              </div>
            ) : (
              // <a title="Cancel"
              //   class="btn btn-build"
              //   rel="nofollow" data-method="post" href="/stanley/spx_taas_v1.19/-/jobs/16545/cancel?continue%5Bto%5D=%2Fstanley%2Fspx_taas_v1.19%2F-%2Fjobs">
              //   {/* <svg class="s16" data-testid="close-icon"><use xlinkHref="/icons.svg#close"></use></svg> */}
              // </a>
              <div onClick={() => handlePlayJob(job.id)}>
                <Icon>HighlightOff</Icon>
              </div>
            )}
            </td>
            <td>{job.name}</td>
            <td>Taas</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default GitSection