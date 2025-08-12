import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input, Select } from '../components/FormControls';
import { CREWS, EXPERIENCE_LEVELS } from '../constants';
import { getDirectory } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Directory
 * Member directory with filtering by crew and experience.
 */
function Directory() {
  const [members, setMembers] = useState([]);
  const [crew, setCrew] = useState('');
  const [exp, setExp] = useState('');

  useEffect(() => {
    getDirectory({ crew, experience: exp }).then((r) => r.ok && setMembers(r.data));
  }, [crew, exp]);

  return (
    <div className="card-grid">
      <Card title="Filters">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Input placeholder="Search name…" onChange={() => {}} />
          <Select value={crew} onChange={(e) => setCrew(e.target.value)} options={[{ value: '', label: 'All Crews' }, ...CREWS.map(c => ({ value: c, label: c }))]} />
          <Select value={exp} onChange={(e) => setExp(e.target.value)} options={[{ value: '', label: 'All Experience' }, ...EXPERIENCE_LEVELS.map(x => ({ value: x, label: x }))]} />
        </div>
      </Card>
      <Card title="Members">
        <Table
          columns={[
            { title: 'Name', accessor: 'name' },
            { title: 'Crew', accessor: 'crew' },
            { title: 'Experience', accessor: 'experience' },
          ]}
          data={members}
        />
      </Card>
    </div>
  );
}

export default Directory;
