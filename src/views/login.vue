<template>
  <v-container grid-list-md class="register">
    <div class="welcome">
      <img src="@/assets/images/main-logo.svg" alt="Fundall Logo">
      <div class="welcome__greeting">
        <img src="@/assets/images/login-img.svg" alt="BG-image">
        <p class="welcome__title">
          <router-link to="/">Welcome back!</router-link>
          We miss you.
        </p>
      </div>
    </div>
    <div>
      <div class="card">
        <p class="greet greet--bg">Holla</p>
        <p class="greet">Sign in to the vibe!</p>
        <v-alert
          v-model="showAlert"
          dismissible
          :type="type"
          class="alert"
        >
          {{ alertMessage }}
        </v-alert>
        <v-layout wrap>
          <v-flex sm12 class="card__input">
            <input
              v-model="username"
              type="text"
              name="username"
              id="username"
              placeholder="Enter email or username" />
            <label for="username">Email or Username</label>
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
          <v-flex @click="login()" sm12>
            <Button>Login</Button>
          </v-flex>
          <p>
            Don't have an account?
            <router-link to="/register">Register Here</router-link>
          </p>
        </v-layout>
        <p class="terms">
          By clicking on login, you agree to our
          <router-link to="/login">Terms & conditions and privacy policy
          </router-link>
        </p>
      </div>
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
    username: '',
    password: '',
    showAlert: true,
    type: 'error',
    alertMessage: 'Test alert',
  }),
  methods: {
    login() {
      this.axios.post('/login', {
        email: this.username,
        password: this.password,
      }).then((res) => {
        const { user } = res.data.success;
        this.$cookies.set('api_token', user.access_token, -1);
      }).catch((error) => {
        console.log(error);
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
      position: relative;
      @include lg() {
        padding: 20px 50px 0;
      }
      .greet {
        color: #30443c;
        text-align: left;
        font-size: 20px;
        position: relative;
        left: 25px;
        &--bg {
          color: #1b2420;
          font-weight: bold;
          font-size: 30px;
        }
      }
      .layout.wrap {
        padding: 30px 30px 0;
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
        .welcome__title, .subtitle {
          width: 60%;
          margin: 0 auto;
          text-align: left;
          color: #000;
          font-weight: bold;
        }
        .welcome__title {
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
        width: 70%;
        text-align: center;
        margin: 15px auto;
        padding-bottom: 30px;
      }
    }
  }
  .alert {
    position: absolute;
    z-index: 1;
    top: 130px;
    left: 80px;
    right: 80px;
  }
</style>
