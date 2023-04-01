import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import messages from './langs' //多语言对象

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages, // set locale messages
})

locale.i18n((key, value) => { i18n.t(key, value) })

export default i18n;