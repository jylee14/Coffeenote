/**
 * custom hook to simplify the creation/usage of text state for forms
 */

import { useState } from 'react'

export function useInputField(initial = '', type = typeof initial, required=true) {
  const [value, setValue] = useState(initial)
  const onChange = e => setValue(e.target.value)
  const reset = () => setValue(initial)

  return {
    type,
    value,
    onChange,
    reset,
    required
  }
}