import Vue from 'vue'
import * as filter from './filters'

Object.keys(filter).forEach(v=>Vue.filter(v,filter[v]))
