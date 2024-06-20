export function useDetachLanguage() {
    async function submit(channelId, languageId) {
        const response = await axios.delete('/api/channels/channel/' + channelId + '/language/' + languageId)
        return response.data
    }

    return {submit}
}