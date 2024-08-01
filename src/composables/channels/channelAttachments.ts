
export function useChannelAttachments() {
    async function attachCurrency(channelId, currencyId) {
        // TODO IDE doesn't recognise .post
        return await axios.post('/api/channels/' + channelId + '/currencies', {currency: currencyId})
    }

    async function attachLanguage(channelId, languageId) {
        return await axios.post('/api/channels/' + channelId + '/languages', {language: languageId})
    }

    async function detachCurrency(channelId, currencyId) {
        return await axios.delete('/api/channels/' + channelId + '/currencies/' + currencyId)
    }

    async function detachLanguage(channelId, languageId) {
        return await axios.delete('/api/channels/' + channelId + '/languages/' + languageId)
    }

    return {attachCurrency, attachLanguage, detachCurrency, detachLanguage}
}