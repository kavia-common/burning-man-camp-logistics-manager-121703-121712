import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input } from '../components/FormControls';
import { getJobs } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Jobs
 * Admins can create jobs. Burners can sign up for shifts and receive targeted messaging.
 */
function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((r) => r.ok && setJobs(r.data));
  }, []);

  return (
    <div className="card-grid">
      <Card title="Create Job (Admin)">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10 }}>
          <Input placeholder="Job title" />
          <Input placeholder="Needed" type="number" />
          <button className="btn">Create</button>
        </div>
      </Card>
      <Card title="Jobs">
        <Table
          columns={[
            { title: 'Title', accessor: 'title' },
            { title: 'Needed', accessor: 'needed' },
            { title: 'Signed Up', accessor: 'signedUp' },
            { title: 'Actions', render: () => <button className="btn">Sign Up</button> },
          ]}
          data={jobs}
        />
      </Card>
    </div>
  );
}

export default Jobs;
