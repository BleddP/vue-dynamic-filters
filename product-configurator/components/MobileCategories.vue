<template>
  <div>
    <h3>Categorie</h3>
    <div class="swiper-container swiper-products--category-button-swiper">
      <div class="swiper-wrapper">
        <button
          v-for="(category, index) in categories"
          :key="index"
          :class="[
            useCategory === category
              ? categoryButtons.activeClass
              : categoryButtons.inActive,
          ]"
          class="swiper-slide products__filters__category--swiper filter-btn--1 products__capitalize"
          :value="category"
          :id="category"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileCategories',
  props: {
    categories: Array,
  },
  data() {
    return {
      useCategory: this.categories[0],
      categoryButtons: {
        activeClass:
          'swiper-slide products__filters__category--swiper filter-btn--active products__capitalize',
        inActive:
          'swiper-slide products__filters__category--swiper filter-btn--1 products__capitalize',
      },
    };
  },
  methods: {
    selectCategory(value) {
      this.useCategory = value;
      this.$emit('fetchCategory', value);
    },
  },
};
</script>
