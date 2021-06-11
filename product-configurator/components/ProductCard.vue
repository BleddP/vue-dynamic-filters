<template>
    <div class="product-card">
        <div class="product-card__item">
            <div>
                <img
                    v-bind:src="'http://via.placeholder.com/546x322'"
                    :alt="product.productName"
                    class="product-card__img"
                />
            </div>
            <div class="products__grid--space-between">
                <h4>{{ product.productName }}</h4>
                <h4 class="scoped-product-price">€ {{ product.price.toLocaleString() }},-</h4>
            </div>
            <p v-if="product.available">Direct Leverbaar</p>
            <p v-else>Op Aanvraag</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: Object
    }
};
</script>

<style scoped>
.scoped-product-price {
    font-weight: 400;
}

p {
    color: #9d9e9d;
}
</style>
