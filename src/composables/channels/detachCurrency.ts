export function useDetachCurrency() {
    async function submit(channelId, currencyId) {
        const response = await axios.delete('/api/channels/channel/' + channelId + '/currency/' + currencyId)
        return response.data
    }

    return {submit}
}