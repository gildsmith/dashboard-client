
export function useChannelAttachments() {
    async function attachCurrency(channelId, currencyId) {
        const response = await axios.post('/api/channels/' + channelId + '/currencies', {currency: currencyId})
        return response.data
    }

    async function attachLanguage(channelId, languageId) {
        const response = await axios.post('/api/channels/' + channelId + '/languages', {language: languageId})
        return response.data
    }

    async function detachCurrency(channelId, currencyId) {
        const response = await axios.delete('/api/channels/' + channelId + '/currencies/' + currencyId)
        return response.data
    }

    async function detachLanguage(channelId, languageId) {
        const response = await axios.delete('/api/channels/' + channelId + '/languages/' + languageId)
        return response.data
    }

    return {attachCurrency, attachLanguage, detachCurrency, detachLanguage}
}