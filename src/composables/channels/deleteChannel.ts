export function useDeleteChannel() {
    async function submit(id) {
        const response = await axios.delete('/api/channels/' + id)
        return response.data
    }

    return {submit}
}