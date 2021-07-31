const path = require('path')

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve('src/templates/BlogPost.js')
    const result = await graphql(`
        query MyQuery {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            tags
                            path
                            date
                        }
                    }
                }
            }
        }      
    `)

    result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
            path: `${edge.node.frontmatter.path}`,
            component: blogPostTemplate,
            context: {
                title: edge.node.title
            }
        })
    })
}