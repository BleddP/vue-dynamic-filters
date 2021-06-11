<template>
  <div>
    <div class="products__mobile-disappear">
      <h3>Categorieën</h3>
      <div>
        <ul>
          <button
            :class="[
              useCategory === category
                ? categoryButtons.activeClass
                : categoryButtons.inActive,
            ]"
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
            :id="category"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  props: {
    categories: Array,
  },
  data() {
    return {
      useCategory: this.categories[0],
      categoryButtons: {
        activeClass: 'filter-btn--active products__capitalize',
        inActive: 'filter-btn--1 products__capitalize',
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
