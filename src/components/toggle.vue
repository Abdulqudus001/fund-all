<template>
  <div @click="$emit('showNav')" class="toggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/mixins.scss';
  .toggle {
    cursor: pointer;
    display: block;
    @include mdl() {
      display: none;
    }
    div {
      width: 30px;
      height: 5px;
      margin: 3px 0;
      background: #000;
    }
  }
</style>
