<template>
  <v-container grid-list-md class="register">
    <div class="card">
      <v-layout wrap>
        <v-flex xs12 sm6 md6 class="card__input">
          <input type="text" name="f_name" id="f_name" placeholder="Enter First Name">
          <label for="f_name">First Name</label>
        </v-flex>
        <v-flex xs12 sm6 md6 class="card__input">
          <input type="text" name="l_name" id="l_name" placeholder="Enter Last Name">
          <label for="l_name">Last Name</label>
        </v-flex>
        <v-flex sm12 class="card__input">
          <input type="email" name="email" id="email" placeholder="Enter Email">
          <label for="email">Enter address</label>
        </v-flex>
        <v-flex sm12 class="card__input">
          <input type="password" name="password" id="password" placeholder="Enter Password">
          <label for="password">Password</label>
        </v-flex>
        <v-flex sm12 class="card__input">
          <input type="password" name="c-password" id="c-password" placeholder="Confirm Paassword">
          <label for="c-password">Confirm Password</label>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables.scss';
@import '@/assets/stylesheets/mixins.scss';
  .register {
    padding: 34px 20px;
    @include mdl() {
      padding: 34px 90px;
    }
    .card {
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.083);
      border-radius: 6px;
      width: 592px;
      max-width: 100%;
      .layout.wrap {
        padding: 30px;
      }
      &__input {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        margin: 10px 0;
        input {
          border: 1px solid $input--black;
          border-radius: 4px;
          padding: 11px 14px;
          background: #fff;
          color: $input-color;
          height: 45px;
          width: 100%;
          outline: none;
        }
        input:focus {
          border: 1px solid $green;
        }
        input:focus + label {
          color: $green;
        }
      }
    }
  }
</style>
