import * as React from 'react'
import { graphql } from 'gatsby'

require(`katex/dist/katex.min.css`)

const Template = ({ data: { markdownRemark }}) => {
    const title = markdownRemark.frontmatter.title
    const html = markdownRemark.html
    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </div>
    )
}

export const query = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path }}) {
            html
            frontmatter {
                title
            }
        }
    }
`


export default Template