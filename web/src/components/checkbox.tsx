import React from 'react'

function Checkbox() {
  return (
    <div className="flex gap-2">
      <input type="checkbox"  id="over4000" className="accent-slate-500" />
      <label  htmlFor="over4000">
        Over 4000
      </label>
    </div>
  )
}

export default Checkbox