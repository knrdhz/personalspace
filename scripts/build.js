const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const marked = require('marked')
const frontMatter = require('front-matter')
const glob = require('glob')
const config = require('../site.config')
const RSS = require('rss')

const srcPath = './src'
const distPath = config.build.outputPath

const feed = new RSS({
    title: '/knrdhz - blog',
    description: "I'm a self-taught web developer who likes to share knowledge with the others",
    language: 'en',
    site_url: 'https://knrdhz.me',
    feed_url: 'https://knrdhz.me/rss.xml'
})

// clear destination folder
fse.emptyDirSync(distPath)

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`)

// read pages
const files = glob.sync('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` })

// keep article list
let headlines = ''
// keep empty array to populate with rss-friendly items
let rssItems = []

console.log('*** B U I L D   S T A R T E D *** \n\n\n')
// reverse order to put the newest articles on top
let yearMarker = false
files
    .slice()
    .reverse()
    .forEach((file, i) => {
        const fileData = path.parse(file)
        if (fileData.ext == '.md') {
            const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8')
            const pageData = frontMatter(data)
            const attributes = pageData.attributes
            const title = attributes.title
            const category = attributes.category
            const date = new Date(attributes.date)
            const options = { day: '2-digit', month: '2-digit' }

            if (title == 'About' || title == 'Contact') {
                return
            }

            let link = file.slice(0, file.lastIndexOf('/'))

            if (date.getFullYear() == 2019 && yearMarker !== '2019') {
                yearMarker = '2019'
                let yearHeadline = `<h2>${yearMarker}</h2>\n`
                headlines += yearHeadline
            } else if (date.getFullYear() == 2020 && yearMarker !== '2020') {
                yearMarker = '2020'
                let yearHeadline = `<h2>${yearMarker}</h2>\n`
                headlines += yearHeadline
            }

            let headline =
                `<h3><a href="${link}"> ${title} ` + '</a> <span id="headlineDate">' + date.toLocaleDateString('en-GB', options) + '</span></h3>\n'
            headlines += headline
        }
    })

files.forEach((file, i) => {
    const fileData = path.parse(file)
    const destPath = path.join(distPath, fileData.dir)

    // create destination directory
    fse.mkdirsSync(destPath)

    // read page file
    const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8')

    // render page
    const pageData = frontMatter(data)
    const templateConfig = Object.assign({}, config, {
        page: pageData.attributes
    })
    let pageContent
    // generate page content according to file type
    switch (fileData.ext) {
        case '.md':
            pageContent = marked(pageData.body)
            console.log('Generating ' + pageData.attributes.title)
            break
        case '.ejs':
            pageContent = pageData.body
            break
        default:
            pageContent = pageData.body
    }

    /* Date is only present on the articles - the About and Contact pages won't be taken into account */

    if (pageData.attributes.date) {
        let rssArticle = {}
        rssArticle.title = pageData.attributes.title
        rssArticle.date = pageData.attributes.date
        rssArticle.url = 'https://knrdhz.me/' + file.slice(0, file.lastIndexOf('/'))
        rssArticle.author = 'Konrad Hyzy'
        rssArticle.description = pageContent.substring(3, 70) + '...'
        rssItems.push(rssArticle)
    }

    // render layout with page contents
    const layout = pageData.attributes.layout || 'default'
    const layoutFileName = `${srcPath}/layouts/${layout}.ejs`
    const layoutData = fse.readFileSync(layoutFileName, 'utf-8')

    // format articleDate
    const date = new Date(pageData.attributes.date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const articleDate = date.toLocaleDateString('en-US', options)

    // get post category

    const articleTags = pageData.attributes.tags
    let formattedArticleTags = ''
    if (articleTags) {
        articleTags.forEach((tag, i) => {
            formattedArticleTags = formattedArticleTags + `<div class="tag">${tag}</div>`
        })
    }

    const completePage = ejs.render(
        layoutData,
        Object.assign({}, templateConfig, {
            body: pageContent,
            common: pageContent,
            headlines: headlines,
            filename: layoutFileName,
            articleTitle: pageData.attributes.title + ' ' + config.site.title,
            headlineTitle: pageData.attributes.title,
            articleDate: articleDate,
            tags: formattedArticleTags
        })
    )

    // save the html file
    fse.writeFileSync(`${destPath}/index.html`, completePage)
})

console.log('\n\n\n*** B U I L D   D O N E ***')

rssItems.forEach((item, i) => {
    feed.item({
        title: item.title,
        date: item.date,
        url: item.url,
        author: item.author,
        description: item.description
    })
})

const xml = feed.xml({ indent: true })
fse.writeFileSync(`${distPath}/rss.xml`, xml)
