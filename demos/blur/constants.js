import gaussianBlur from './gaussian'
import { simpleBoxBlur, boxBlur } from './box'
import { hMotionBlur, vMotionBlur } from './motion'
import fastBlur from './fast'
export const blurMap = {
  gaussian: {
    caller: gaussianBlur,
    sigma: true
  },
  simpleBox: {
    caller: simpleBoxBlur,
    sigma: false
  },
  box: {
    caller: boxBlur,
    sigma: true
  },
  hMotion: {
    caller: hMotionBlur,
    sigma: false
  },
  vMotion: {
    caller: vMotionBlur,
    sigma: false
  },
  fast: {
    caller: fastBlur,
    sigma: true
  }
}
export const blurOptions = [
  {
    text: '高斯模糊',
    value: 'gaussian'
  },
  {
    text: '简单盒子模糊',
    value: 'simpleBox'
  },
  {
    text: '应用高斯核的盒子模糊',
    value: 'box'
  },
  {
    text: '水平模糊',
    value: 'hMotion'
  },
  {
    text: '垂直模糊',
    value: 'vMotion'
  },
  {
    text: '高速模糊',
    value: 'fast'
  }
]
