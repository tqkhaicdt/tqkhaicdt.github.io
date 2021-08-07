import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from "gatsby"

require(`katex/dist/katex.min.css`)

const Template = ({ data: { markdownRemark }, pageContext}) => {
    const {next, prev} = pageContext
    console.log(pageContext)
    const title = markdownRemark.frontmatter.title
    const html = markdownRemark.html
    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: html}} />

            {next && 
                <Link to={next.frontmatter.path}>
                    Next
                </Link>
            }
            {prev && 
                <Link to={prev.frontmatter.path}>
                    Previous
                </Link>
            }
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