import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.TextSlice} TextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextSlice>} TextProps
 * @param { TextProps }
 */
const Text = ({ slice }) => (
  <section className='text-section'>
     <PrismicRichText field={slice.primary.text}/>
  </section>
)

export default Text