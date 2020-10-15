import React from 'react'

import Autocomplete from 'react-autocomplete'

const CustomAutocomplete = ({ label, filteredItems, value, onChange }) => {
  const style = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '10px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '25%', // TODO: don't cheat, let it flow to the bottom
  }
  
  return (
    <div className="autocomplete">
      <label>{label}</label>
      <Autocomplete
        id='autocomplete'
        getItemValue={(item) => item.label}
        items={filteredItems}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>)}
        menuStyle={style}
        value={value}
        onChange={(_, value) => onChange(value)}
        onSelect={(value) => onChange(value)}
      />
    </div>
  )
}

export default CustomAutocomplete
