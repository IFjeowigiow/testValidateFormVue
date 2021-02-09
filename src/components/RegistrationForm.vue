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
      <transition name="fade">
        <p
          class="form-item__error"
          v-if="$v.name.$dirty && $v.name.$error"
        > Введено не корректное значение</p>
      </transition>
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
      <transition name="fade">
        <p
          class="form-item__error"
          v-if="$v.email.$dirty && $v.email.$error"
        >Введено не корректное значение</p>
      </transition>
    </div>
    <div class="form-item">
      <label for="phone" class="form-item__label">Номер телефона</label>
      <input
        type="tel"
        id="phone"
        placeholder="Введите номер телефона"
        v-model="phone"
        class="form-item__input"
        @change="$v.phone.$touch()"
      >
      <transition name="fade">
        <p
          class="form-item__error"
          v-if="$v.phone.$dirty && $v.phone.$error"
        >Введено не корректное значение</p>
      </transition>
    </div>
    <v-select
      :options="langs"
      @select="select"
      :value="selectedLang"
      placeholder="Язык"
    />
    <div>
      <input
        type="checkbox"
        class="checkbox"
        id="agree"
        v-model="acceptThePrivacy"
        @change="$v.acceptThePrivacy.$touch()"
      >
      <label class="label" for="agree">Принимаю <a href="#">&nbsp;условия&nbsp;</a>использования
        <svg class="label__icon" width="16" height="12" viewBox="0 0 16 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M14.6343 0.634339C14.9467 0.32192 15.4533 0.32192 15.7657 0.634339C16.0781
        0.946758 16.0781 1.45329 15.7657 1.76571L6.16569 11.3657C5.85327 11.6781 5.34673
        11.6781 5.03432 11.3657L1.03431 7.36571C0.721895 7.05329 0.721895 6.54676 1.03431
        6.23434C1.34673 5.92192 1.85327 5.92192 2.16569 6.23434L5.6 9.66865L14.6343 0.634339Z" fill="#0880AE"/>
        </svg>
        <transition name="fade">
          <p
            class="form-item__error"
            v-if="$v.acceptThePrivacy.$dirty && !acceptThePrivacy"
          >Необходимо принять условия использования</p>
        </transition>
      </label>
    </div>
    <button
      @click.prevent="onSubmit"
      :disabled="$v.$invalid || !acceptThePrivacy"
      class="button"
    >Зарегистрироваться</button>
  </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import vSelect from './Select'
import { checkPhone, checkName } from '../utils/utils'
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
        { name: 'Русский', value: 1 },
        { name: 'Английский', value: 2 },
        { name: 'Китайский', value: 3 },
        { name: 'Испанский', value: 4 }
      ],
      selectedLang: '',
      acceptThePrivacy: false
    }
  },
  validations () {
    return {
      name: {
        required,
        minLength: minLength(3),
        checkName
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        checkPhone
      },
      acceptThePrivacy: {
        required
      }
    }
  },
  methods: {
    select (option) {
      this.selectedLang = option.name
    },
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid || !this.acceptThePrivacy) {
        const user = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          lang: this.selectedLang
        }
        console.log(user)
        this.name = ''
        this.email = ''
        this.phone = ''
        this.selectedLang = ''
        this.acceptThePrivacy = false
        this.reset()
      }
    },
    reset () {
      this.$v.$reset()
    }
  }
}
</script>
<style scoped lang="sass">

</style>
