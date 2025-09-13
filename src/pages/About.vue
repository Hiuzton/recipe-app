<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-12 text-gray-800">
    <!-- Header -->
    <section class="text-center">
      <h1 class="text-4xl font-bold mb-2">About KooKer</h1>
      <p class="text-lg text-gray-600">
        Discover, organize, and cook delicious recipes from around the world.
      </p>
    </section>

    <!-- Concept -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">The Concept</h2>
      <p class="text-gray-700 leading-relaxed">
        KooKer is a modern and responsive web app designed to help users explore diverse meals,
        filter by category and area, search by keywords, and even use a built-in cooking timer. It's
        built using Vue 3, Pinia, PrimeVue, and TailwindCSS. Whether you're a home cook or just
        starting out, KooKer brings curated meals to your fingertips with a clean and intuitive UI.
      </p>
    </section>

    <!-- FAQ -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <ul class="space-y-6">
        <li>
          <h3 class="font-medium">Q: Are the recipes free?</h3>
          <p class="text-gray-700">
            Yes, all recipes come from a public API and are completely free to browse and use.
          </p>
        </li>
        <li>
          <h3 class="font-medium">Q: Can I save recipes?</h3>
          <p class="text-gray-700">
            In the current version, saving recipes is not implemented yet, but it's planned for a
            future release.
          </p>
        </li>
        <li>
          <h3 class="font-medium">Q: How is filtering working?</h3>
          <p class="text-gray-700">
            You can filter recipes by category and area, with live search and mobile-friendly
            toggles.
          </p>
        </li>
        <li>
          <h3 class="font-medium">Q: How can I contribute?</h3>
          <p class="text-gray-700">
            You can use the form below to contact us or optionally support the project with a
            donation.
          </p>
        </li>
      </ul>
    </section>

    <!-- Contact / Donation -->
    <section class="bg-white/80 p-6 rounded-2xl shadow-lg space-y-4">
      <h2 class="text-2xl font-semibold mb-2">Contact & Support</h2>
      <p class="text-gray-600 mb-4">
        Questions? Feedback? Want to support this project? Drop us a message below.
      </p>

      <ContactForm />

      <!-- Optional Donation -->
      <!-- Buy Me a Coffee Button -->
      <div class="flex justify-center mt-6">
        <a
          href="https://buymeacoffee.com/hutsanandrei"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          ☕ Buy Me a Coffee
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import ContactForm from '@/components/ContactForm.vue'
</script>
