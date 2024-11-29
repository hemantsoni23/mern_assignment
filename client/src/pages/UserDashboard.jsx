import { useState } from 'react';
import ContactTable from '../components/ContactTable';
import CreateContactButton from '../components/CreateContactButton';

const UserDashboard = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRefreshTable = () => {
    setRefreshTable((prev) => !prev);
  };

  return (
    <div>
      <CreateContactButton onRefreshTable={handleRefreshTable} />
      <ContactTable refreshTable={refreshTable} />
    </div>
  );
};

export default UserDashboard;

