<template>
  <v-dialog
    v-model="dialog"
    max-width="350"
  >
    <v-card>
      <v-card-title class="headline">Change Photo</v-card-title>

      <v-card-text>
        <v-alert
          v-model="showAlert"
          dismissible
          :type="type"
          class="alert"
          transition="scale-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <div class="photo">
          <img :src="image" alt="">
        </div>
        <img
          v-show="isLoading"
          src="@/assets/images/loader-green.svg"
          alt="Loading..." />
        <form v-show="!isLoading" enctype="multipart/form-data">
          <div class="file">
            <p>{{ imageName }}</p>
            <input
              accept="image/*"
              name="myFile"
              type="file"
              @change="onFileChanged" />
          </div>
          <button @click.prevent.stop="onUpload">Upload!</button>
        </form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn
          color="green darken-1"
          text
          @click="$emit('closeDialog')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog', 'image'],
  data: () => ({
    selectedFile: null,
    isLoading: false,
    showAlert: false,
    alertMessage: 'default message',
    type: 'success',
    imageName: 'Click to browse or drag image here',
  }),
  methods: {
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.imageName = this.selectedFile.name;
    },
    onUpload() {
      this.isLoading = true;
      const avatar = new FormData();
      avatar.append('avatar', this.selectedFile,
        this.selectedFile.name);
      this.axios.post('/base/avatar',
        avatar,
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          this.isLoading = false;
          this.$emit('changed', res.data.success.url);
          this.showAlert = true;
          this.alertMessage = 'Updated';
          this.type = 'success';
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
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables.scss';
.photo {
  width: 100px;
  height: 95px;
  border-radius: 12px;
  margin: 0 auto;
  img {
    border-radius: 12px;
    width: 100%;
  }
}
.file {
  width: 80%;
  margin: 0 auto;
  padding-top: 8%;
  outline: 2px dashed grey;
  min-height: 80px;
  margin-top: 40px;
  position: relative;
}
form {
  input {
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  button {
    background: $green;
    border-radius: 6px;
    outline: none;
    width: 50%;
    margin: 0 auto;
    padding: 10px 0;
  }
}
</style>
