import React from 'react'
import TableData from './components/TableData'
import DialogButton from './components/DialogButton'

const App = () => {
  return (
    <div className='flex flex-col px-[5%] py-[3%]'>
      <div className='flex justify-end'>
        <DialogButton  />
      </div>
      <TableData />
    </div>
  )
}

export default App