import React, { useEffect, useState } from 'react'
import TableData from './components/TableData'
import DialogButton from './components/DialogButton'
import { getUsers } from './services/api';

const App = () => {
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    let res = await getUsers();
    setUserData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col px-[5%] py-[3%]'>
      <div className='flex justify-end'>
        <DialogButton getData={getData} />
      </div>
      <TableData userData={userData} setUserData={setUserData} getData={getData} />
    </div>
  )
}

export default App