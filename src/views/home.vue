<template>
  <v-container grid-list-md class="dashboard">
    <div class="details">
      <img src="@/assets/images/main-logo.svg" alt="Fundall Logo">
      <div class="user">
        <div @click="showModal = true" class="user__photo">
          <img :src="userData.avatar" alt="User image">
        </div>
        <div class="user__name">
          <p class="name">
            {{ `${userData.firstname} ${userData.lastname}` }}
          </p>
          <p class="email">{{ userData.email }}</p>
        </div>
      </div>
      <div class="expense">
        <p class="name">Total Monthly Expenses</p>
        <p class="expense__count">
          {{ formatCurrency }}
        </p>
        <v-progress-linear
          v-model="progressCount"
          color="#4ce895"
          height="6"
        ></v-progress-linear>
      </div>
      <v-alert
        v-model="showAlert"
        dismissible
        :type="type"
        class="alert"
        transition="scale-transition"
      >
        {{ alertMessage }}
      </v-alert>
      <div class="table">
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="3"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Daily Expenses Summary</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.name="{ item }">
            <v-avatar color="#4ce895" size="10"></v-avatar>
          </template>
          <template>
            <td :colspan="headers.length">Peek-a-boo!</td>
          </template>
        </v-data-table>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="welcome-back">
          <div class="welcome-back__text">
            <p class="bolder">
              <strong>Welcome Back,</strong> {{ userData.firstname }}
            </p>
            <p>Now, let's get your expenses for this month</p>
          </div>
          <img src="@/assets/images/dashboard-img.svg" alt="Bg-image">
        </div>
        <v-layout wrap>
          <form @submit.prevent.stop="addExpense()" autocomplete="on">
            <v-layout wrap>
              <v-layout wrap align-end>
                <v-flex xs8 class="card__input">
                  <input
                    v-model.number="monthlyExpenses"
                    type="number"
                    name="monthly-expenses"
                    id="monthly-expenses"
                    v-validate="'numeric'"
                    placeholder="Enter monthly-expenses" />
                  <label for="monthly-expenses">
                    Target Monthly Expenses
                  </label>
                  <span>{{ errors.first('monthly-expenses') }}</span>
                </v-flex>
                <v-flex
                  xs4
                  @click.prevent.stop="addMonthlyExpense"
                >
                  <Button class="save-monthly">
                    <img
                      v-show="isLoading"
                      src="@/assets/images/loader.svg"
                      alt="Loading..."
                    />
                    <p v-show="!isLoading">Save</p>
                  </Button>
                </v-flex>
              </v-layout>
              <v-flex xs12 sm8 md8 class="card__input">
                <input
                  v-model="date"
                  type="date"
                  name="date"
                  id="date"
                  required
                  placeholder="mm/dd/yyyy" />
                <label for="date">
                  Date
                </label>
                <span>{{ errors.first('date') }}</span>
              </v-flex>
              <div class="expenses__today">
                <p>Today's Expenses</p>
                <v-layout wrap>
                  <v-flex xs7 class="card__input">
                    <input
                      type="text"
                      placeholder="Pizza"/>
                  </v-flex>
                  <v-flex xs5 class="card__input">
                    <input
                      v-model.number="expense1"
                      type="number"
                      placeholder="10,000"/>
                  </v-flex>
                  <v-flex xs7 class="card__input">
                    <input
                      type="text"
                      placeholder="Textbook"/>
                  </v-flex>
                  <v-flex xs5 class="card__input">
                    <input
                      v-model.number="expense2"
                      type="number"
                      placeholder="10,000"/>
                  </v-flex>
                  <v-flex xs7 class="card__input">
                    <input
                      type="text"
                      placeholder="Tuition fee"/>
                  </v-flex>
                  <v-flex xs5 class="card__input">
                    <input
                      v-model.number="expense3"
                      type="number"
                      placeholder="15,000"/>
                  </v-flex>
                </v-layout>
              </div>
              <v-layout
                justify-end
                align-center
                class="total__expenses card__input"
              >
                <label for="total">Total Actual Expenses: #</label>
                <v-flex xs12 sm6 md4>
                  <input
                    :value="totalExpense"
                    type="number"
                    name="total"
                    id="total" />
                </v-flex>
              </v-layout>
              <v-layout justify-center>
                <v-flex xs12 sm6>
                  <Button class="save">
                    <img
                      v-show="isLoading"
                      src="@/assets/images/loader.svg"
                      alt="Loading..."
                    />
                    <p v-show="!isLoading">Save today's expenses</p>
                  </Button>
                </v-flex>
              </v-layout>
            </v-layout>
          </form>
        </v-layout>
      </div>
    </div>
    <change-photo
      :image="userData.avatar"
      :dialog="showModal"
      v-show="showModal"
      @closeDialog="showModal = false"
      @changed="getProfile" />
  </v-container>
</template>

<script>
import Button from '@/components/button.vue';
import ChangePhoto from '@/components/change-photo.vue';

export default {
  components: {
    Button,
    ChangePhoto,
  },
  data: () => ({
    monthlyExpenses: '',
    date: new Date(),
    count: 30,
    isLoading: false,
    showAlert: false,
    expense1: '',
    expense2: '',
    expense3: '',
    totalMonthlyExpense: 0,
    alertMessage: 'Default message',
    type: 'success',
    userData: {
      avatar: '@/assets/images/User.svg',
      firstname: 'Abdulqudus',
      lastname: 'Abubakre',
      email: 'mymail@email.com',
      monthly_target: '500',
    },
    headers: [
      {
        text: '',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Date',
        align: 'left',
        sortable: false,
        value: 'date',
      },
      {
        text: 'Amount',
        align: 'left',
        sortable: false,
        value: 'amount',
      },
    ],
    data: [
      {
        name: 0,
        date: '8/25/2019',
        amount: '30,000',
      },
      {
        name: 2,
        date: '8/25/2019',
        amount: '30,000',
      },
      {
        name: 3,
        date: '8/25/2019',
        amount: '30,000',
      },
    ],
    showModal: false,
  }),
  mounted() {
    this.getProfile();
    this.getExpense();
  },
  computed: {
    totalExpense() {
      const expenses = [this.expense1, this.expense2, this.expense3];
      return expenses.reduce((total, expense) => total + expense) || 0;
    },
    formatCurrency() {
      const amount = this.userData.monthly_target;
      return amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    },
    progressCount() {
      return (this.totalMonthlyExpense / this.userData.monthly_target) * 100;
    },
  },
  methods: {
    getTotalMonthlyExpense(data) {
      const currentMonth = new Date().getMonth();
      const monthlyExpenses = data.filter(expense => new Date(expense.date).getMonth() == currentMonth);
      if (monthlyExpenses.length > 0) {
        return monthlyExpenses.reduce((total, expense) => total += parseFloat(
          expense.price.replace(/,/g, ''),
        ), 0);
      }
    },
    getProfile() {
      this.axios.get('/base/profile')
        .then((res) => {
          const { data } = res.data.success;
          this.userData = data;
        }).catch((err) => {
          const { response } = err;
          if (response.status === 400) {
            this.showAlert = true;
            this.type = 'error';
            this.alertMessage = response.data.error.message;
          }
        });
    },
    addMonthlyExpense() {
      const monthly_target = this.monthlyExpenses;
      this.axios.post('/base/monthly-target', {
        monthly_target,
      }).then((res) => {
        this.isLoading = true;
        this.showAlert = true;
        this.type = 'success';
        this.alertMessage = 'Monthly target updated';
        this.getProfile();
        this.isLoading = false;
      }).catch((err) => {
        if (response.status === 400) {
          this.showAlert = true;
          this.type = 'error';
          this.alertMessage = response.data.error.message;
        }
        this.isLoading = true;
      });
    },
    getExpense() {
      // Get user expenses
      this.axios.get('/base/expenses')
        .then((res) => {
          const { data } = res.data.success;
          const expenses = [];
          data.forEach((expense) => {
            expenses.push({
              name: expense.id,
              date: new Date(expense.date).toLocaleDateString(),
              amount: expense.price,
            });
          });
          this.totalMonthlyExpense = this.getTotalMonthlyExpense(data);
          this.data = expenses;
        }).catch((err) => {
          const { response } = err;
          if (response.status === 400) {
            this.showAlert = true;
            this.type = 'error';
            this.alertMessage = response.data.error.message;
          }
        });
    },
    addExpense() {
      this.isLoading = true;
      const date = this.formatDate();
      const amount = this.totalExpense;
      this.axios.post('/base/expense', {
        date,
        amount,
      }).then((res) => {
        this.isLoading = true;
        this.showAlert = true;
        this.type = 'success';
        this.alertMessage = 'Expense added successfully';
        this.getExpense();
        this.isLoading = false;
      }).catch((err) => {
        const { response } = err;
        if (response.status === 400) {
          this.showAlert = true;
          this.type = 'error';
          this.alertMessage = response.data.error.message;
        }
        this.isLoading = false;
      });
    },
    formatDate() {
      const date = new Date(this.date);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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
  .dashboard {
    padding: 34px 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @include lg() {
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
    .details {
      position: relative;
      text-align: left;
      > img {
        text-align: left;
        margin-bottom: 10px;
        @include lg() {
          position: relative;
          top: 0;
        }
      }
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        @include lg() {
          flex-direction: row;
          justify-content: space-between;
        }
        &__photo {
          background: #c4c4c4;
          border-radius: 20px;
          width: 93px;
          height: 89px;
          img {
            width: 100%;
            border-radius: 20px;
          }
        }
        &__name {
          flex-direction: column;
          color: #30443c;
          font-size: 18px;
          @include lg() {
          }
          p {
            margin: 0;
          }
          .name {
            font-size: 25px;
            font-weight: bold;
          }
        }
      }
      .expense {
        color: #30443c;
        font-size: 18px;
        margin-top: 20px;
        p {
          margin: 0;
        }
        &__count {
          font-size: 30px;
          font-weight: bold;
          margin: 0 0 10px;
        }
        .v-progress-linear {
          margin: 20px 0;
        }
      }
    }
    .card {
      background: #f2f2f7;
      box-shadow: 0 0 10px rgba(0,0,0,0.083);
      border-radius: 6px;
      width: 592px;
      max-width: 100%;
      margin: 0 auto;
      position: relative;
      @include lg() {
        padding: 0px 50px;
        margin: 0;
        margin-left: auto;
      }
      .welcome-back {
        width: 100%;
        position: relative;
        top: 40px;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0,0,0,0.083);
        display: flex;
        justify-content: space-between;
        padding: 2px 16px;
        margin-bottom: 10px;
        p {
          margin: 8px 0;
          color: $input-color;
          font-size: 15px;
          text-align: left;
          &.bolder {
            font-size: 20px;
            font-weight: bold;
            strong {
              color: $green;
            }
          }
        }
        img {
          display: none;
          position: absolute;
          width: 170px;
          bottom: 12px;
          right: 0;
          @include lg() {
            display: block;
          }
        }
      }
      .expenses__today {
        width: 100%;
        p {
          text-align: left !important;
          margin: 0;
        }
      }
      .total__expenses.card__input {
        flex-direction: row;
        justify-content: flex-end;
      }
      .save {
        padding-top: 3px;
        padding-bottom: 9px;
        border-radius: 15px;
        white-space: nowrap;
      }
      .layout.wrap {
        // padding: 30px;
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
  }

  .table::v-deep {
    .v-toolbar__title {
      font-size: 16px;
    }
  }
  .save-monthly {
    padding: 5px 0;
    position: relative;
    bottom: 12px;
    background: $green;
  }
</style>
