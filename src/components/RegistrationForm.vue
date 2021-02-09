<template>
  <form  class="form">
    <div class="form-item">
      <label for="name" class="form-item__label">Имя</label>
      <input
        type="text"
        id="name"
        placeholder="Введите Ваше имя"
        v-model.trim="$v.name.$model"
        class="form-item__input"
        @change="$v.name.$touch()"
      >
      <p
        class="form-item__error"
        v-if="$v.name.$dirty && !$v.name.minLength"
      > Name must have ar least {{ $v.name.$params.minLength.min
        }}!</p>
    </div>
    <div class="form-item">
      <label for="email" class="form-item__label">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Введите ваш email"
        v-model="email"
        class="form-item__input"
        @change="$v.email.$touch()"
      >
      <p
        class="form-item__error"
        v-if="$v.name.$dirty && !$v.email.email && $v.email.$error"
      >Введено не корректное значение</p>
    </div>
    <div class="form-item">
      <label for="phone" class="form-item__label">Номер телефона</label>
      <input
        type="text"
        id="phone"
        placeholder="Введите номер телефона"
        v-model="phone"
        class="form-item__input"
        @change="$v.phone.$touch()"
      >
      <p
        class="form-item__error"
        v-if="$v.phone.$dirty && !$v.phone.numeric"
      > Email is not correct!</p>
    </div>
    <v-select
      :options="langs"
      @select="select"
      :selected="selected"
      placeholder="Язык"
    />
    <button
      class="button"
    >Зарегистрироваться</button>
  </form>
</template>

<script>
import { required, minLength, maxLength, email, numeric } from 'vuelidate/lib/validators'
import vSelect from './Select'
export default {
  name: 'Form',
  components: {
    vSelect
  },
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      langs: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
      ],
      selected: ''
    }
  },
  validations () {
    return {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric,
        maxLength: maxLength(11),
        minLength: minLength(11)
      }
    }
  },
  methods: {
    select (option) {
      this.selected = option.name
    }
  }
}
</script>
<style scoped lang="sass">

</style>
