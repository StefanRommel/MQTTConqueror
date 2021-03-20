import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tree from 'primevue/tree'
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Divider from 'primevue/divider'
import Card from 'primevue/card'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Editor from 'primevue/editor'
import ScrollPanel from 'primevue/scrollpanel'
import Textarea from 'primevue/textarea'
import Menubar from 'primevue/menubar'
import OverlayPanel from 'primevue/overlaypanel'
import Password from 'primevue/password'

import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import 'primeflex/primeflex.css'

import './theme.css'
// Best dark: import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
// import 'primevue/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'
// import 'primevue/resources/themes/md-light-indigo/theme.css'
// import 'primevue/resources/themes/md-light-deeppurple/theme.css'
// import 'primevue/resources/themes/md-dark-indigo/theme.css'
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
//import 'primevue/resources/themes/mdc-light-indigo/theme.css'
// import 'primevue/resources/themes/mdc-light-deeppurple/theme.css'
// import 'primevue/resources/themes/mdc-dark-indigo/theme.css'
// import 'primevue/resources/themes/mdc-dark-deeppurple/theme.css'
// import 'primevue/resources/themes/fluent-light/theme.css'
//import 'primevue/resources/themes/saga-blue/theme.css'
// import 'primevue/resources/themes/saga-green/theme.css'
// import 'primevue/resources/themes/saga-orange/theme.css'
// import 'primevue/resources/themes/saga-purple/theme.css'
// import 'primevue/resources/themes/vela-blue/theme.css'
// import 'primevue/resources/themes/vela-green/theme.css'
//import 'primevue/resources/themes/vela-orange/theme.css'
// import 'primevue/resources/themes/vela-purple/theme.css'
// import 'primevue/resources/themes/arya-blue/theme.css'
// import 'primevue/resources/themes/arya-green/theme.css'
// import 'primevue/resources/themes/arya-orange/theme.css'
// import 'primevue/resources/themes/arya-purple/theme.css'
// import 'primevue/resources/themes/nova/theme.css'
// import 'primevue/resources/themes/nova-alt/theme.css'
// import 'primevue/resources/themes/nova-accent/theme.css'
// import 'primevue/resources/themes/nova-vue/theme.css'
// import 'primevue/resources/themes/luna-amber/theme.css'
// import 'primevue/resources/themes/luna-blue/theme.css'
// import 'primevue/resources/themes/luna-green/theme.css'
// import 'primevue/resources/themes/luna-pink/theme.css'
// import 'primevue/resources/themes/rhea/theme.css'

import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/github-gist.css'
// import 'highlight.js/styles/dracula.css'

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'// import the styles

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)
app.use(VueHighlightJS)

app.component('InputText', InputText)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('TreeTable', TreeTable)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Tree', Tree)
app.component('Divider', Divider)
app.component('Card', Card)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Editor', Editor)
app.component('ScrollPanel', ScrollPanel)
app.component('PrismEditor', PrismEditor)
app.component('Textarea', Textarea)
app.component('Menubar', Menubar)
app.component('OverlayPanel', OverlayPanel)
app.component('Password', Password)

app.mount('#app')
