<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  @import '@/assets/stylesheets/variables.scss';
  button {
    width: 100%;
    background: $green;
    border-radius: 3px;
    box-shadow: 0 4px 10px rgba(118, 212, 45, 0.3);
    padding: 18px 0;
    text-transform: uppercase;
    font-weight: bold;
    p {
      margin: 0;
    }
  }
</style>
