import BaseRenderer from './base'

export default class HTMLRenderer extends BaseRenderer {
  headerRenderer(content) {
    const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    const tag = headerTags[content.attrs.level - 1]
    const tagOpenBlock = `<${tag}>`
    const tagCloseBlock = `</${tag}>`
    const textContent = content.content[0].text
    return tagOpenBlock + textContent + tagCloseBlock
  }

  paragraphRenderer(content) {
    if (!content?.content) return

    const innerContent = content?.content.map((item) => {
      if (item.marks) {
        let openTags = ''
        let closeTags = ''

        const updateTags = (tag, attrs) => {
          openTags += `<${tag} ${attrs}>`
          closeTags += `</${tag}>`
        }

        item.marks.map((mark) => {
          if (mark.type === 'link') {
            const attrs = `href="${mark.attrs}" rel="${mark.rel}" target="${mark.target}"`
            updateTags('a', attrs)
            return
          }
          if (mark.type === 'bold') return updateTags('b')
          if (mark.type === 'italic') return updateTags('i')
          if (mark.type === 'underline') return updateTags('u')
        })

        return openTags + item.text + closeTags
      }

      return item.text
    })

    return innerContent.join('')
  }

  imageRenderer(content) {
    return `<img src="./${content.attrs.dataKey.split('/').pop()}"  height="${content.attrs.height}" />\n`
  }

  attachmentsRenderer(content) {
    return `<a href="./${content.attrs.dataKey.split('/').pop()}"> ${content.attrs.title} </a> \n`
  }
}
