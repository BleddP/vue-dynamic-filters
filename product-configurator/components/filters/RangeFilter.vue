<template>
  <div>
    <h3>{{ data.filterLabel }}</h3>

    <ul class="products__filters__range__grid">
      <li>
        <span>Van</span>
        <div class="custom-placeholder" :data-placeholder="data.placeholder">
          <input
            class="placeholder"
            type="number"
            :min="0"
            @blur="selectMin($event.target.value)"
            v-model.number="min"
            :id="data.options.minLabel"
            :name="data.options.minLabel"
          />
        </div>
      </li>
      <li>
        <span>Tot</span>
        <div class="custom-placeholder" :data-placeholder="data.placeholder">
          <input
            class="placeholder"
            type="number"
            :min="1"
            v-model.number="max"
            @blur="selectMax($event.target.value)"
            :id="data.options.maxLabel"
            :name="data.options.maxLabel"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RangeFilter",
  props: {
    data: Object,
    filterRange: Function
  },
  data() {
    return {
      min: 0,
      max: 0
    };
  },
  methods: {
    selectMin(min) {
      if (!min) {
        this.min = 0;
      }
      if (this.min > this.max) {
        this.max = parseInt(min);
      }
      this.$emit("filterRange", this.data.filterType, this.data.filterValue, {
        min: this.min,
        max: this.max
      });
    },
    selectMax(max) {
      if (!max) {
        this.max = 0;
      }
      this.$emit("filterRange", this.data.filterType, this.data.filterValue, {
        min: this.min,
        max: this.max
      });
    }
  }
};
</script>
