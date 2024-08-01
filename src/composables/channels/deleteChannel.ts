export function useDeleteChannel() {
    async function submit(id) {
        return await axios.delete('/api/channels/' + id)
    }

    return {submit}
}