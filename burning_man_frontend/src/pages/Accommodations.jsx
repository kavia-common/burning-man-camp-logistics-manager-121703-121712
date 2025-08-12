import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input, Select } from '../components/FormControls';
import { getAccommodations } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Accommodations
 * Manage accommodation signups, types, and power/vehicle needs.
 */
function Accommodations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getAccommodations().then((r) => r.ok && setList(r.data));
  }, []);

  return (
    <div className="card-grid">
      <Card title="New Accommodation">
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Select options={['Shiftpod', 'Tent', 'RV', 'Yurt'].map(x => ({ value: x, label: x }))} defaultValue="Shiftpod" />
          <Input placeholder="Dimensions (e.g., 12x12 ft)" />
          <Input placeholder="Power Needs (e.g., 15A/30A)" />
          <Select options={['None', 'Car', 'Truck', 'RV'].map(x => ({ value: x, label: x }))} defaultValue="None" />
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="btn">Submit Request</button>
        </div>
      </Card>

      <Card title="Your Accommodations">
        <Table
          columns={[
            { title: 'Type', accessor: 'type' },
            { title: 'Dimensions', accessor: 'dimensions' },
            { title: 'Power', accessor: 'power' },
            { title: 'Vehicle', accessor: 'vehicle' },
          ]}
          data={list}
        />
      </Card>
    </div>
  );
}

export default Accommodations;
