import React from 'react'
import { Checkbox, CheckboxGroup } from 'rsuite';

function ClassificationsChecks({setCFValues, CFValues, cpcd=[], ipcd=[],us=[], jpfi=[], ecla=[], extraClass}) {
  return (
    <div className={`checkboxList ${extraClass ? 'ms-2': 'ms-5'}`}>
        <CheckboxGroup
        inline
        name="checkboxList"
        value={CFValues}
        onChange={value => {
            setCFValues(value.sort());
        }}
        >
            {ipcd.length > 0 && <Checkbox className='me-1' value="A">IPC <span>({ipcd.length})</span></Checkbox>}
            {cpcd.length > 0 && <Checkbox className='me-1' value="B">CPC <span>({cpcd.length})</span></Checkbox>}
            {us.length > 0 && <Checkbox className='me-1' value="C">US <span>({us.length})</span></Checkbox>}
            {jpfi.length > 0 && <Checkbox className='me-1' value="D">JPFI <span>({jpfi.length})</span></Checkbox>}
            {ecla.length > 0 && <Checkbox className='me-1' value="E">ECLA <span>({ecla.length})</span></Checkbox>}
        </CheckboxGroup>
    </div>
  )
}

export default ClassificationsChecks
