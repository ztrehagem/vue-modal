import Vue from 'vue'
import VueModal, { Options, createMediator } from '../lib'

const mediator = createMediator()

Vue.use<Options>(VueModal, { mediator })

export default mediator
