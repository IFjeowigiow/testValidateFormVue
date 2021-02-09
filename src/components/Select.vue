<template>
 <div class="select form-item">
   <label for="select" class="form-item__label">Язык</label>
   <input
     type="text"
     id="select"
     @click="isOpen = !isOpen"
     class="form-item__input"
     :placeholder="placeholder"
     :class="{'form-item__input_active': isOpen}"
     readonly
     :value="value">
   <svg
     :class="{'dropdown-icon_active': isOpen}"
     class="dropdown-icon"
     width="16"
     height="9"
     viewBox="0 0 16 9"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
   >
     <path d="M8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418
     16.0976 1.31658 15.7071 1.70711L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711L0.292893
     1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311
     1.70711 0.292893L8 6.58579Z" fill="#0880AE"/>
   </svg>

   <transition name="fade">
     <ul class="options" v-if="isOpen">
       <li class="options__item"
           v-for="option in options"
           :key="option.value"
           @click="selectOption(option)"
       >
         <span>{{option.name}}</span>
       </li>
     </ul>
   </transition>
 </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    selectOption (option) {
      this.$emit('select', option)
      this.hideSelect()
    },
    hideSelect () {
      const target = event.target
      if (target.closest('.select') && !target.closest('.options__item')) {
        return
      }
      this.isOpen = false
    }
  },
  mounted () {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style lang="sass">
.options
  position: absolute
  bottom: 22px
  z-index: 10
  transform: translateY(100%)
  left: 0
  margin: 0
  padding: 12px 0
  border-radius: 6px
  width: 100%
  list-style: none
  border: 1px solid #DBE2EA
  background-color: #ffffff
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0px 20px 20px rgba(44, 39, 56, 0.04)
  &__item
    margin: 0
    padding: 13px 15px 11px
    transition: 0.22s ease-in
    cursor: pointer
    color: #756F86
    font-size: 1.6em
    &:hover
      background-color: #EBF4F8
.select
  position: relative
  .form-item
    &__input
      &_active
        &::-webkit-input-placeholder
          color: #2C2738
        &::-moz-placeholder
          color: #2C2738
        &:-moz-placeholder
          color: #2C2738
        &:-ms-input-placeholder
          color: #2C2738
.dropdown-icon
  position: absolute
  right: 17px
  top: 47%
  transition: 0.22s ease-in
  &_active
    transform: rotate(180deg)
.fade-enter-active
  animation: fade-in 0.22s
.fade-leave-active
  animation: fade-in 0.22s reverse
@keyframes fade-in
  0%
    opacity: 0
  100%
    opacity: 1
</style>
