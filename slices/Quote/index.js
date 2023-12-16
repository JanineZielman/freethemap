import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.QuoteSlice} QuoteSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<QuoteSlice>} QuoteProps
 * @param { QuoteProps }
 */
const Quote = ({ slice }) => (
  <div className={`content-block quote ${slice.primary.size}`}>
    <PrismicRichText field={slice.primary.quote}/>
  </div>
)

export default Quote