import React, { useState } from 'react'

const AsideBar = ({ section, setSection }) => {
    const [selected, setSelected] = useState('1');

    return (
        <div className='bg-blue-100 w-fit h-fit m-3  rounded-md flex flex-col cursor-pointer'>
            <div className={`${selected == '1' && ' bg-blue-200 '} px-20 py-3 rounded-md`} onClick={() => { setSection('vehicle'); setSelected('1'); }}>Vehicle</div>
            <div className={`${selected == '2' && ' bg-blue-200 '} px-20 py-3 rounded-md`} onClick={() => { setSection('building'); setSelected('2'); }}> Building</div>
        </div >
    )
}

export default AsideBar