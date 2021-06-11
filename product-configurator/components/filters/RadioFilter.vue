<template>
  <div>
    <h3>{{ data.filterLabel }}</h3>
    <ul>
      <li v-for="item in data.options" :key="item">
        <input
          @change="selectValue"
          type="radio"
          v-model="selectedValue"
          :id="item"
          :value="item"
          :name="item"
        />
        <label class="products__label products__capitalize" :for="item">{{
          item
        }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RadioFilter',
  props: {
    data: Object,
    filterRadio: Function,
  },
  data() {
    return {
      selectedValue: '',
    };
  },
  methods: {
    selectValue() {
      this.$emit(
        'filterRadio',
        this.data.filterType,
        this.data.filterValue,
        this.selectedValue
      );
    },
  },
};
</script>
