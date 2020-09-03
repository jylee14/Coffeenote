/**
 * custom hook to simplify the creation/usage of text state for forms
 */

import { useState } from 'react'

export function useInputField(initial = '', type = typeof initial) {
  const [value, setValue] = useState(initial)
  const onChange = e => setValue(e.target.value)
  return {
    type,
    value,
    onChange
  }
}