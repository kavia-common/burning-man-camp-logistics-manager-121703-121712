import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { Input } from '../components/FormControls';
import { getFoodShares } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Food
 * Shared food planning: contribute items, see past & shared lists.
 */
function Food() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getFoodShares().then((r) => r.ok && setList(r.data));
  }, []);

  return (
    <div className="card-grid">
      <Card title="Contribute Item">
        <div style={{ display: 'flex', gap: 10 }}>
          <Input placeholder="Item (e.g., Coffee, 5 lbs)" />
          <button className="btn">Add</button>
        </div>
      </Card>
      <Card title="Shared Items">
        <Table
          columns={[
            { title: 'Item', accessor: 'item' },
            { title: 'Contributor', accessor: 'contributor' },
          ]}
          data={list}
        />
      </Card>
    </div>
  );
}

export default Food;
