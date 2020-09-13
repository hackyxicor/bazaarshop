import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path d="M467.952 427.383l-25.3-245.673c-1.045-10.187-9.627-17.93-19.867-17.93h-332.9c-10.213 0-18.789 7.717-19.861 17.877L44.044 427.45c-2.144 21.452 5.007 43.011 19.614 59.156C78.266 502.739 98.986 512 120.511 512h271.653c21.425 0 41.952-9.075 56.293-24.914 14.542-16.026 21.646-37.758 19.495-59.703zm-49.076 32.878c-6.898 7.603-16.385 11.791-26.712 11.791H120.518c-10.26 0-20.187-4.468-27.238-12.257-7.051-7.79-10.506-18.13-9.494-28.257l24.075-227.803h296.9l23.449 227.657c1.066 10.806-2.257 21.059-9.334 28.869z" />
      <Path d="M259.663 0c-63.144 0-114.518 51.373-114.518 114.518v69.243h39.948v-69.243c0-41.12 33.45-74.57 74.57-74.57 41.12 0 74.576 33.45 74.576 74.57v69.243h39.941v-69.243C374.181 51.373 322.808 0 259.663 0z" />
    </Svg>
  )
}

export default SvgComponent