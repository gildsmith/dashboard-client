export function useAttachLanguage() {
    async function submit(channelId, languageId) {
        const response = await axios.post('/api/channels/channel/' + channelId + '/language/' + languageId)
        return response.data
    }

    return {submit}
}