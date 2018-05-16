import Vue from 'vue'
import Router from 'vue-router'
import PassTest from '@/components/PassTest'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/test/:testId/pass',
            component: PassTest,
            props: true
        }
    ]
})