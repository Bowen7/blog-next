import { useEffect, useRef, useState } from 'react'
import Clipboard from 'clipboard'
import styled from 'styled-components'
const copySrc = '/icons/copy.svg'
const doneSrc = '/icons/done.svg'
const PreWrapper = styled.div`
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
  const [svgSrc, setSvgSrc] = useState(copySrc)
  const ref = useRef()
  const clipboard = useRef()
  const lock = useRef(false)
  useEffect(() => {
    if (ref.current) {
      clipboard.current = new Clipboard(ref.current)
      clipboard.current.on('success', () => {
        if (!lock.current) {
          lock.current = true
          setSvgSrc(doneSrc)

          setTimeout(() => {
            setSvgSrc(svgSrc)
            lock.current = false
          }, 1500)
        }
      })
    }
  }, [])
  return (
    <PreWrapper>
      <pre {...props}>
        <Copy ref={ref} src={svgSrc} data-clipboard-text={code} />
        {children}
      </pre>
    </PreWrapper>
  )
}
export default CodePre
