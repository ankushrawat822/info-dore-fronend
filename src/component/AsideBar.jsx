import React, { useState } from 'react'

const AsideBar = ({ section, setSection }) => {
    const [selected, setSelected] = useState('1');

    return (
        <div className='bg-blue-50 w-fit h-fit m-3 rounded-md flex flex-col cursor-pointer border border-gray-400 shadow-lg'>
            <div className={`${selected == '1' && ' bg-blue-100 '} px-20 py-3 rounded-md`} onClick={() => { setSection('vehicle'); setSelected('1'); }}>Vehicle</div>
            <div className={`${selected == '2' && ' bg-blue-100 '} px-20 py-3 rounded-md`} onClick={() => { setSection('building'); setSelected('2'); }}>Building</div>
            <div className={`${selected == '3' && ' bg-blue-100 '} px-20 py-3 rounded-md`} onClick={() => { setSection('building'); setSelected('3'); }}>Parks</div>
            <div className={`${selected == '4' && ' bg-blue-100 '} px-20 py-3 rounded-md`} onClick={() => { setSection('building'); setSelected('4'); }}>Bridges</div>
        </div >
    )
}

export default AsideBar 