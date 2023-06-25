<script setup lang="ts">
import { Credential } from '~/components/interfaces/credential.interface';
import { Holder } from '~/usecase/holder';

const credential = ref(null as Credential | null);

const credentialFetched = (_credential: Credential) => {
  credential.value = _credential;
};
</script>

<template>
  <section
    class="flex items-center justify-center flex-col h-full max-w-screen-xl mx-auto"
  >
    <div class="w-full px-4">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight"
      >
        Holder
      </h1>
      <holder-fetch-vc @credential-fetched="credentialFetched" />
      <div v-if="credential">
        <holder-create-presentation :credential="credential" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border: none;
}

.btn:hover {
  filter: brightness(90%);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
}

.fa-plus,
.fa-minus {
  font-size: 1rem;
}

.fa-plus:before {
  content: '\f067';
}

.fa-minus:before {
  content: '\f068';
}
</style>
