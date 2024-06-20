export function useAttachCurrency() {
    async function submit(channelId, currencyId) {
        const response = await axios.post('/api/channels/channel/' + channelId + '/currency/' + currencyId)
        return response.data
    }

    return {submit}
}