<script setup lang="ts">
import { Credential } from '~/components/interfaces/credential.interface';
import { Holder } from '~/usecase/holder';

const credential = ref('');
const name = ref('Taro');
const gender = ref('Female');
const country = ref('Japan');
const credentialName = ref('PermanentResidentCard');

const holder = new Holder();

const emit = defineEmits(['credential-fetched']);

const fetchCredential = async () => {
  const vc = await holder.fetchCredential(credentialName.value);
  if (!vc) {
    return;
  }
  credential.value = JSON.stringify(vc, null, 4);
  name.value =
    (vc as any).credentialSubject.givenName +
    ' ' +
    (vc as any).credentialSubject.familyName;
  gender.value = (vc as any).credentialSubject.gender;
  country.value = (vc as any).credentialSubject.birthCountry;

  const result: Credential = {
    credentialName: credentialName.value,
    credentialJsonLd: credential.value,
    name: name.value,
    gender: gender.value,
    country: country.value,
  };
  emit('credential-fetched', result);
};
</script>
<template>
  <h2
    class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight"
  >
    Step1. Fetch Verifiable Credential
  </h2>
  <div class="w-full max-w-lg flex flex-col">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-credential-name"
        >
          Credential Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-credential-name"
          type="text"
          placeholder="Enter Credential Name"
          v-model="credentialName"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="fetchCredential"
        >
          Fetch
        </button>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6" v-if="credential">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-decrypted-data"
        >
          Fetched Data
        </label>
        <auto-height-textarea
          v-model="credential"
          id="grid-decrypted-data"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          readonly
        />
      </div>
    </div>
  </div>
</template>
