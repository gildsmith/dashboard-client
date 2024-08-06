import axios from 'axios'

export function useCreateChannel() {

    async function submit(name) {
        return await axios.post('/api/channels', {name: name})
    }

    return {submit}
}