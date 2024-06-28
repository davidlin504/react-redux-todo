const mockData = [
  {
    id: 0,
    status: 'manual',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
  },
  {
    id: 16263,
    'status': 'failed',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
  },
  {
    id: 16264,
    'status': 'pending',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
  },
  {
    id: 16265,
    'status': 'canceled',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
  },
  {
    id: 16266,
    'status': 'success',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
  },
];

const git_mockData = [
    {
    'id': 16263,
    'status': 'failed',
    'stage': 'test',
    'name': 'taas_test',
    'ref': 'SPX_v1.19_20240529',
    'tag': false,
    'coverage': null,
    'allow_failure': true,
  }
]

export default mockData;

export { git_mockData }
