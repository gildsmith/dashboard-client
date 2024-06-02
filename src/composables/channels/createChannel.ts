import {ref} from 'vue'

export function useCreateChannel() {
    const channelName = ref('')

    function submitForm() {
        axios.post('/api/channels', {name: channelName.value}).then((e) => {
            console.log(e)
        }).catch((e) => {
            console.log(e)
        })
    }

    return {channelName, submitForm}
}