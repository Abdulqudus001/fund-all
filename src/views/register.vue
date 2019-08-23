<template>
  <v-container grid-list-md class="register">
    <div class="welcome">
      <img src="@/assets/images/main-logo.svg" alt="Fundall Logo">
      <div class="welcome__greeting">
        <img src="@/assets/images/register-img.svg" alt="BG-image">
        <p class="title">
          <router-link to="/">Welcome!</router-link>
          Let’s get to know you.
        </p>
        <p class="subtitle">
          Your first step toward a better financial lifestyle
          starts here.
        </p>
      </div>
    </div>
    <div>
      <div class="card">
        <v-layout wrap>
          <v-flex xs12 sm6 md6 class="card__input">
            <input
              v-model="firstName"
              type="text"
              name="f_name"
              id="f_name"
              placeholder="Enter First Name" />
            <label for="f_name">First Name</label>
          </v-flex>
          <v-flex xs12 sm6 md6 class="card__input">
            <input
              v-model="lastName"
              type="text"
              name="l_name"
              id="l_name"
              placeholder="Enter Last Name" />
            <label for="l_name">Last Name</label>
          </v-flex>
          <v-flex sm12 class="card__input">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email" />
            <label for="email">Enter address</label>
          </v-flex>
          <v-flex sm12 class="card__input">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password" />
            <label for="password">Password</label>
          </v-flex>
          <v-flex sm12 class="card__input">
            <input
              v-model="cPassword"
              type="password"
              name="c-password"
              id="c-password"
              placeholder="Confirm Password" />
            <label for="c-password">Confirm Password</label>
          </v-flex>
          <v-flex @click="register()" sm12>
            <Button>Sign up</Button>
          </v-flex>
          <p>
            Already have an account?
            <router-link to="/login">Login Here</router-link>
          </p>
        </v-layout>
      </div>
      <p class="terms">
        By clicking on login, you agree to our
        <router-link to="/login">Terms & conditions and privacy policy
        </router-link>
      </p>
    </div>
  </v-container>
</template>

<script>
import Button from '@/components/button.vue';

export default {
  components: {
    Button,
  },
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: '',
  }),
  methods: {
    register() {
      this.axios.post('/register', {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.cPassword,
      }).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error.response);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables.scss';
@import '@/assets/stylesheets/mixins.scss';
  .register {
    padding: 34px 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @include mdl() {
      padding: 34px 90px;
      flex-direction: row;
    }
    @include lg() {
      .welcome {
        flex: 0 0 50%;
      }
    }
    >div:nth-child(2) {
      width: 100%;
    }
    p {
      margin-top: 15px;
    }
    .card {
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.083);
      border-radius: 6px;
      width: 592px;
      max-width: 100%;
      margin: 0 auto;
      @include lg() {
        padding: 0px 50px;
      }
      .layout.wrap {
        padding: 30px;
        justify-content: center;
        p {
          text-align: center;
          margin-top: 10px;
        }
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
          margin-top: 5px;
        }
        input:focus {
          border: 1px solid $green;
        }
        input:focus + label {
          color: $green;
        }
      }
    }
    .welcome {
      position: relative;
      >img {
        margin-bottom: 20px;
        @include lg() {
          margin: 0;
          position: absolute;
          left: 0;
        }
      }
      &__greeting {
        display: none;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 60px;
        .title, .subtitle {
          width: 60%;
          margin: 0 auto;
          text-align: left;
          color: #000;
          font-weight: bold;
        }
        .title {
          font-size: 35px;
          margin-top: 20px;
        }
        .subtitle {
          font-size: 16px;
          margin-top: 15px;
        }
        img {
          width: 219px;
        }
        @include lg() {
          display: flex;
        }
      }
    }
    .terms {
      color: $black--light;
      @include lg() {
        width: 60%;
        text-align: center;
        margin: 15px auto 0;
      }
    }
  }
</style>
