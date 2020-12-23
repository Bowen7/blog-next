import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '@geist-ui/react/esm/slider'
import Button from '@geist-ui/react/esm/button'
import Radio from '@geist-ui/react/esm/radio'
import { genSrcAndDest, mergeChannels } from './utils'
import { blurMap, blurOptions } from './constants'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`
const SliderWrapper = styled.div`
  width: 480px;
  margin-bottom: 1rem;
`
const StyledButton = styled(Button)`
  margin-top: 1rem;
`
function Blur() {
  const [sigma, setSigma] = useState(5)
  const [time, setTime] = useState()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('gaussian')
  const srcRef = useRef()
  const destRef = useRef()
  const area = [0, 0, 480, 240]
  useEffect(() => {
    const srcCtx = srcRef.current.getContext('2d')
    const img = new Image()
    img.src = '/demos/blur.jpg'
    img.onload = () => {
      srcCtx.drawImage(img, ...area)
    }
  }, [])
  useEffect(() => {
    if (!loading) {
      return
    }
    const srcCtx = srcRef.current.getContext('2d')
    const destCtx = destRef.current.getContext('2d')
    const imageData = srcCtx.getImageData(...area)
    const { width, height } = imageData
    const { src: srcRgba, dest: destRgba } = genSrcAndDest(imageData.data)
    const start = performance.now()
    for (let i = 0; i < 3; i++) {
      blurMap[type].caller(srcRgba[i], destRgba[i], width, height, sigma)
    }
    const time = performance.now() - start
    const destData = mergeChannels(destRgba)
    imageData.data.set(destData)
    destCtx.putImageData(imageData, 0, 0)
    setTime(time)
    setLoading(false)
  }, [loading])
  const handleSigmaChange = (value) => {
    if (value === sigma) {
      return
    }
    setSigma(value)
  }
  const handleTypeChange = (value) => {
    setType(value)
  }
  const handleClick = () => {
    setLoading(true)
  }
  return (
    <Wrapper>
      <canvas ref={srcRef} width={480} height={240}></canvas>
      <canvas ref={destRef} width={480} height={240}></canvas>
      {time && <p>耗时: {time}ms</p>}
      <SliderWrapper>
        <p>{blurMap[type].sigma ? 'Sigma' : 'Radius'}: {sigma}</p>
        <Slider step={1} min={1} max={20} showMarkers value={sigma} onChange={handleSigmaChange} />
      </SliderWrapper>
      <Radio.Group value={type} onChange={handleTypeChange}>
        {blurOptions.map(({ value, text }) => (<Radio value={value} key={value}>{text}</Radio>))}
      </Radio.Group>
      <StyledButton auto loading={loading} onClick={handleClick}>生成</StyledButton>
    </Wrapper>
  )
}
export default Blur
