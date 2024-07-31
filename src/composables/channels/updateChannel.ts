export function useUpdateChannel() {

    async function submit(id, data) {
        return await axios.patch('/api/channels/' + id, data)
    }

    async function enableMaintenance(id) {
        return await submit(id, {maintenance: true})
    }

    async function disableMaintenance(id) {
        return await submit(id, {maintenance: false})
    }

    return {submit, enableMaintenance, disableMaintenance}
}