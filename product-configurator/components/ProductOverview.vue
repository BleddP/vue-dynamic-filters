<template>
    <div>
        <div class="product-results">
            <div v-if="productsArray.length < 1">
                <h4>Geen producten gevonden.</h4>
            </div>

            <div v-else>
                <h4>We hebben {{productsArray.length}} producten voor je gevonden.</h4>
                <div class="product-card__grid">
                    <div v-for="product in productsArray" :key="product.id">
                        <ProductCard :product="product"></ProductCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import Loader from '../../Loader.vue';

export default {
    name: 'ProductOverview',
    components: {
        ProductCard
    },
    data() {
        return {};
    },
    props: {
        productsArray: Array,
        useCategory: String
    },
    methods: {
        selectCategory(value) {
            this.$emit('categoryFilter', value);
        }
    },
    created() {}
};
</script>

<style scoped>
.product-results {
    margin-top: 25px;
}

.capitalize {
    text-transform: capitalize;
}
</style>
