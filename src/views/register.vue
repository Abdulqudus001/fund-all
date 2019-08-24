<template>
  <v-container grid-list-md class="register">
    <div class="welcome">
      <img src="@/assets/images/main-logo.svg" alt="Fundall Logo">
      <div class="welcome__greeting">
        <img src="@/assets/images/register-img.svg" alt="BG-image">
        <p class="welcome__title">
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
        <v-alert
          v-model="showAlert"
          dismissible
          :type="type"
          class="alert"
          transition="scale-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <v-layout wrap>
          <form @submit.prevent="register()" autocomplete="on">
            <v-layout wrap>
            <v-flex xs12 sm6 md6 class="card__input">
              <input
                v-model="firstName"
                type="text"
                name="first name"
                id="first name"
                required
                v-validate="'alpha'"
                placeholder="Enter First Name" />
              <label for="first name">First Name</label>
              <span>{{ errors.first('first name') }}</span>
            </v-flex>
            <v-flex xs12 sm6 md6 class="card__input">
              <input
                v-model="lastName"
                type="text"
                name="last name"
                id="last name"
                required
                v-validate="'alpha'"
                placeholder="Enter Last Name" />
              <label for="last name">Last Name</label>
              <span>{{ errors.first('last name') }}</span>
            </v-flex>
            <v-flex sm12 class="card__input">
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                required
                v-validate="'email'"
                placeholder="Enter Email" />
              <label for="email">Enter address</label>
              <span>{{ errors.first('email') }}</span>
            </v-flex>
            <v-flex sm12 class="card__input">
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                required
                autocomplete="on"
                v-validate="'min:6'"
                ref="password"
                placeholder="Enter Password" />
              <label for="password">Password</label>
              <span>{{ errors.first('password') }}</span>
            </v-flex>
            <v-flex sm12 class="card__input">
              <input
                v-model="cPassword"
                type="password"
                name="confirm-password"
                id="confirm-password"
                required
                autocomplete="on"
                v-validate="'min:6|confirmed:password'"
                placeholder="Confirm Password" />
              <label for="confirm-password">Confirm Password</label>
              <span>{{ errors.first('confirm-password') }}</span>
            </v-flex>
            <v-flex @click="register()" sm12>
              <Button>
                <img
                  v-show="isLoading"
                  src="@/assets/images/loader.svg"
                  alt="Loading..."
                />
                <p v-show="!isLoading">Sign up</p>
              </Button>
            </v-flex>
            </v-layout>
          </form>
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
    isLoading: false,
    showAlert: false,
    alertMessage: 'Default message',
    type: 'success',
  }),
  methods: {
    register() {
      this.isLoading = true;
      this.axios.post('/register', {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.cPassword,
        // eslint-disable-next-line
      }).then((res) => {
        this.isLoading = false;
        this.$router.push('home').catch((err) => {
          console.error(err);
        });
      }).catch((error) => {
        const { response } = error;
        if (response.status === 400) {
          this.showAlert = true;
          this.type = 'error';
          this.alertMessage = response.data.error.message;
        }
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables.scss';
@import '@/assets/stylesheets/mixins.scss';
  form {
    padding: 30px;
  }
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
        padding: 0px 50px;
      }
      .layout.wrap {
        // padding: 30px;
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
        width: 60%;
        text-align: center;
        margin: 15px auto 0;
      }
    }
  }
  .alert {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 0px;
    right: 0px;
    font-size: 0.8rem;
    font-weight: bold;
    @include mdl() {
      left: 80px;
      right: 80px;
    }
  }
</style>
