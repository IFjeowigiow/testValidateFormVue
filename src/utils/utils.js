import { helpers } from 'vuelidate/lib/validators'

export const checkPhone = helpers.regex('checkPhone', /^((8|\+7)[- ]?)(\(?\d{3}\)?[- ]?)\d{3}[- ]?\d{2}[- ]?\d{2}$/)

export const checkName = helpers.regex('checkPhone', /^([а-яА-Я][- ]?){3,}$/)
