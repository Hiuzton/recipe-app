<template>
  <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mx-auto space-y-4">
    <h2 class="text-2xl font-semibold">Contact Me</h2>

    <InputText v-model="name" placeholder="Your name" class="w-full" />
    <InputText v-model="email" type="email" placeholder="Your email" class="w-full" />
    <Textarea v-model="message" placeholder="Your message" autoResize rows="4" class="w-full" />

    <Button
      :label="loading ? 'Sending...' : 'Send Message'"
      :loading="loading"
      :disabled="loading"
      icon="pi pi-send"
      class="w-full"
      @click="sendEmail"
    />

    <Message v-if="success" severity="success">Message sent successfully!</Message>
    <Message v-if="error" severity="error">Failed to send message. Try again.</Message>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const sendEmail = async () => {
  loading.value = true
  success.value = false
  error.value = false

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        subject: 'Kooker Message',
        name: name.value,
        email: email.value,
        message: message.value,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )

    success.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>
