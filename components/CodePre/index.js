import { useEffect, useRef } from 'react'
import Clipboard from 'clipboard'
import styled from 'styled-components'
const StylePre = styled.pre`
  position: relative;
`
const Copy = styled.img`
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 1rem;
  // reset
  max-width: initial;
  cursor: pointer;
`
function CodePre({ children, code, ...props }) {
  const ref = useRef()
  const clipboard = useRef()
  useEffect(() => {
    if (ref.current) {
      clipboard.current = new Clipboard(ref.current)
    }
  }, [])
  return (
    <StylePre {...props}>
      <Copy ref={ref} src="/copy.svg" data-clipboard-text={code} />
      {children}
    </StylePre>
  )
}
export default CodePre
