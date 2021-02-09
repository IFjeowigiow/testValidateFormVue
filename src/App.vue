<template>
  <div class="container">
    <form-header/>
    <registration-form/>
  </div>
</template>

<script>
import FormHeader from './components/Header'
import RegistrationForm from './components/RegistrationForm'

export default {
  name: 'App',
  components: {
    FormHeader,
    RegistrationForm
  }
}
</script>

<style lang="sass">
</style>
