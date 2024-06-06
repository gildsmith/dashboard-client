import {ref} from 'vue'

export function useCreateChannel() {
    const channelName = ref('')

    async function submitForm() {
        const response = await axios.post('/api/channels', {name: channelName.value})
        return response.data
    }

    return {channelName, submitForm}
}