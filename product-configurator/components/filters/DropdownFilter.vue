<template>
  <div>
    <h3>{{ data.filterLabel }}</h3>
    <select v-model="selectedValue">
      <option value="" selected disabled>Selecteer je optie </option
      ><option v-for="item in data.options" :key="item" :value="item">{{
        item
      }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropdownFilter',
  props: {
    data: Object,
    filterDropdown: Function,
  },
  data() {
    return {
      selectedValue: '',
    };
  },

  watch: {
    selectedValue: function() {
      this.$emit(
        'filterDropdown',
        this.data.filterType,
        this.data.filterValue,
        this.selectedValue
      );
    },
  },
};
</script>
