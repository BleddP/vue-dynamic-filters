<template>
  <div>
    <h3>{{ data.filterLabel }}</h3>
    <ul>
      <li v-for="(item, index) in data.options" :key="index">
        <input
          v-model="values"
          type="checkbox"
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
  name: 'CheckBoxFilter',
  data() {
    return {
      internalValues: [],
    };
  },
  props: {
    data: Object,
  },
  computed: {
    values: {
      get() {
        return this.internalValues;
      },
      set(newVal) {
        this.internalValues = newVal;
        this.$emit(
          'filterCheckBox',
          this.data.filterType,
          this.data.filterValue,
          [...newVal]
        );
      },
    },
  },
};
</script>
