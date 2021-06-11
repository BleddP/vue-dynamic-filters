import Vue from 'vue';
import App from './ProductConfigurator.vue';

export default function ProductConfigurator() {
    new Vue({
        render: h => h(App)
    }).$mount('#product-configurator-app');
}
