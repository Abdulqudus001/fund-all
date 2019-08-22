<template>
  <div class="landing">
    <nav class="navbar">
      <img src="@/assets/images/main-logo.svg" alt="Fundall Logo">
      <div class="auth-control">
        <router-link
          to="/login"
          class="auth-control__link"
        >Log In</router-link>
        <router-link
          to="/register"
          class="auth-control__link auth-control__link--button"
        >Sign up</router-link>
      </div>
      <Toggle @showNav="showNav=!showNav" />
      <div v-show="showNav" class="side-nav">
        <Toggle class="toggle" @showNav="showNav=!showNav" />
        <div class="side-nav__controls">
          <router-link
            to="/login"
            class="auth-control__link"
          >Log In</router-link>
          <router-link
            to="/register"
            class="auth-control__link auth-control__link--button"
          >Sign up</router-link>
        </div>
      </div>
    </nav>
    <div class="landing__body">
      <img src="@/assets/images/register-img.svg" alt="Background-Image">
      <div class="content">
        <p class="content__title">
          Fundall Expense Tracker
        </p>
        <p class="content__subtitle">
          Mini Project Frontend
        </p>
        <p class="content__footer">
          by Babatunde Fashola
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from '@/components/toggle.vue';

export default {
  name: 'home',
  components: {
    Toggle,
  },
  data() {
    return {
      showNav: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables.scss';
@import '@/assets/stylesheets/mixins.scss';
.landing {
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 34px 20px;
    @include mdl() {
      align-items: center;
      padding: 34px 90px;
    }
    .auth-control {
      display: none;
      @include mdl() {
        display: block;
      }
      &__link {
        text-transform: uppercase;
        font-size: 18px;
        text-decoration: none;
        color: #000;
        font-weight: bold;
        &--button {
          background: $green;
          border-radius: 10px;
          padding: 10px;
          margin-left: 24px;
        }
      }
    }
    .side-nav {
      width: 200px;
      background: #fff;
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      .toggle {
        padding: 50px 0;
        width: 50px;
        left: 130px;
        position: relative;
      }
      &__controls {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        top: 100px;
        align-items: center;
        a {
          margin: 20px 0;
        }
      }
    }
  }
  &__body {
    .content {
      color: #000;
      &__title {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 35px;
      }
      &__subtitle {
        font-size: 25px;
        margin-bottom: 44px
      }
      &__footer {
        font-weight: bold;
      }
      @include mdl() {
        &__title, &__subtitle {
          font-size: 40px;
        }
        &__title {
          margin-bottom: 45px;
        }
        &__subtitle {
          margin-bottom: 54px;
        }
        &__footer {
          font-size: 24px
        }
      }
    }
  }
}
</style>
