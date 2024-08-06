import axios from 'axios'

export function useUpdateChannelRelations() {

    async function attachCurrency(channelId, currencyId) {
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