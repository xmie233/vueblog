export default {
    reducedArticles: (state) => {
        const articles = state.articles.map(article => {
            let newArticle = {}
            newArticle = article
            newArticle.content = article.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
            return newArticle
        })
        return articles
    },
    allTags: (state) => {
        state.tags.unshift('全部')
        return state.tags
    },
}