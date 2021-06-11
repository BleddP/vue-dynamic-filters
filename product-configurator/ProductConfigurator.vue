<template>
  <div class="product-configurator-app">
    <div class="products">
      <div class="products__filters__category--desktop-disappear">
        <MobileCategories :categories="categoryOptions" @fetchCategory="fetchCategory"></MobileCategories>
      </div>
      <div class="accordion products__tablet-desktop-disappear">
        <div class="accordion-item">
          <div>
            <button
              @click="openAccordion"
              value="filter-button"
              class="btn btn--2 filter-button js-toggle-button"
            >
              <svg class="icon filter-button--icon" aria-hidden="true" foucsable="false">
                <use href="spritemap.svg#filter" />
              </svg>
              Filter
            </button>
          </div>
          <div class="accordion-item__wrapper">
            <div class="accordion-item__content">
              <div class="products__filters--border">
                <Filters :filterOptions="filterOptions" @filterProducts="filterProducts"></Filters>
                <div class="products__filters__close">
                  <span class="js-toggle-button">Sluiten</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="products__grid">
      <div class="products__mobile-disappear">
        <Filters :filterOptions="filterOptions" @filterProducts="filterProducts"></Filters>
      </div>
      <div>
        <Categories @fetchCategory="fetchCategory" :categories="categoryOptions"></Categories>
        <div v-if="loading" class="products__loading-products">
          <span>Producten aan het laden</span>
          <Loader></Loader>
        </div>
        <div v-else>
          <ProductOverview :productsArray="productsArray"></ProductOverview>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Import Components
import Categories from "./components/Categories.vue";
import MobileCategories from "./components/MobileCategories.vue";
import Filters from "./components/Filters.vue";
import ProductOverview from "./components/ProductOverview.vue";
import Accordion from "../../libs/init.accordion";
import Loader from "../Loader.vue";

// Import libs
import axios from "axios";

export default {
  name: "ProductConfigurator",
  components: {
    Categories,
    MobileCategories,
    Filters,
    ProductOverview,
    Loader
  },
  data() {
    return {
      products: [],
      productsArray: [],
      filterOptions: [],
      currentFilters: [],
      categoryOptions: [
        "spuitgietmachines",
        "robots",
        "randapparatuur",
        "matrijzen",
        "spare parts",
        "appendage",
        "toebehoren"
      ],
      loading: true
    };
  },
  methods: {
    fetchCategory(value) {
      this.loading = true;
      const endpoint = `data/${value}.json`;
      axios
        .get(endpoint)
        .then(res => {
          // Set the filter array
          this.filterOptions = res.data.response.filters;
          this.currentFilters = [];

          // Set the products array
          const products = res.data.response.products;
          this.products = products;
          this.productsArray = products;
        })
        .catch(err => {
          this.filterOptions = [];
          this.currentFilters = [];
          this.products = [];
          this.productsArray = [];
          console.log({ err });
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    filterProducts(newFilter) {
      const alreadyFiltered = this.currentFilters.find(
        currentFilter => currentFilter.key === newFilter.key
      );
      if (alreadyFiltered) {
        this.currentFilters = this.currentFilters.filter(
          currentFilter => currentFilter.key !== alreadyFiltered.key
        );
      }
      this.currentFilters.push(newFilter);
    },
    openAccordion() {
      Accordion();
    }
  },
  watch: {
    currentFilters() {
      this.loading = true;
      setTimeout(() => {
        this.productsArray = applyAllFilters(
          this.products,
          this.currentFilters
        );
        this.loading = false;
      }, 500);
    }
  },
  created() {
    const endpoint = "data/spuitgietmachines.json";
    axios
      .get(endpoint)
      .then(res => {
        // Set the filter array
        this.filterOptions = res.data.response.filters;
        this.currentFilters = [];

        // Set the products array
        const products = res.data.response.products;
        this.products = products;
        this.productsArray = products;
      })
      .catch(err => {
        console.log({ err });
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }
};

const removeDuplicates = input => {
  return Array.from(new Set(input));
};

const applyAllFilters = (products, allFilters) => {
  //// ------ If no filters are applied at all, return all products
  if (allFilters.length < 1) return products;

  const allProductOptions = allFilters.map(filter => {
    /// ------------- If the filter is a checkbox, that means that the array can be filtered on multiple values within the array of checkbox options
    /// ------------- We have to loop through all potential key value pairs to see which key we're searching for and which values match the selected options
    if (filter.filterType === "checkbox") {
      const data = products.map(product => {
        let findProduct = {};
        if (filter.value.length < 1) return product;
        for (const [objectKey, objectValue] of Object.entries(product)) {
          if (filter.key === objectKey) {
            const test = filter.value.find(filterValue => {
              if (filterValue === objectValue) {
                findProduct = product;
              }
            });
          }
        }
        if (findProduct.id) {
          return findProduct;
        }
      });

      const results = data.filter(item => item !== undefined);
      // console.log(filter.key, results);
      return results;
    }

    /// ------------- If the filter is a radio button, that means we can only match one value.
    /// ------------- We still have to loop through all key value pairs, to see which key we want to filter
    if (filter.filterType === "radio") {
      const data = products.map(product => {
        for (const [objectKey, objectValue] of Object.entries(product)) {
          if (filter.value === objectValue) {
            return product;
          }
        }
      });
      const results = data.filter(item => item !== undefined);
      // console.log(filter.key, results);

      return results;
    }

    /// ------------- If the filter is a dropdown/select, that means we can only match one value.
    /// ------------- We still have to loop through all key value pairs, to see which key we want to filter
    if (filter.filterType === "dropdown") {
      const data = products.map(product => {
        for (const [objectKey, objectValue] of Object.entries(product)) {
          if (filter.value === objectValue) {
            return product;
          }
        }
      });
      const results = data.filter(item => item !== undefined);
      // console.log(filter.key, results);

      return results;
    }

    /// ------------- If the filter is a range, we have to check what the min and max values are in the array
    /// ------------- We still have to loop through all key value pairs, to see which key we want to filter
    /// ------------- We must then loop through all min/max values to see which one is >= min and <= max
    if (filter.filterType === "range") {
      const data = products.map(product => {
        const { min, max } = filter.value;

        // If the min value is 0, and no max value has been set, return all products
        if (min < 1 && min === max) return product;

        for (const [objectKey, objectValue] of Object.entries(product)) {
          if (filter.key === objectKey) {
            if (min <= objectValue && max >= objectValue) {
              return product;
            }
          }
        }
      });
      const results = data.filter(item => item !== undefined);
      // console.log(filter.key, results);

      return results;
    }
  });

  //// -------- The above function returns x number of arrays for x number of filters applied.
  //// -------- Each array only filters the entire product array for its own key/value pairs
  //// -------- To combine filters together, we have to loop through the different arrays and find the object which is present in each filter (which means this product satisfies the equality request for all filters that have been selected)
  let matchingValuesInAllFilteredArrays = allProductOptions;
  if (allProductOptions.length > 1) {
    matchingValuesInAllFilteredArrays = allProductOptions
      .shift()
      .filter(function(v) {
        return allProductOptions.every(function(a) {
          return a.indexOf(v) !== -1;
        });
      });
  } else {
    matchingValuesInAllFilteredArrays = allProductOptions.flat();
  }

  return matchingValuesInAllFilteredArrays;
};
</script>
