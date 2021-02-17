<template>
  <main id="creat-project">
    <section class="creat-project-form-area">
      <img src="../assets/alice_logo.png" width="91rem"/>
      <h1 class="creat-project-title">Create your project</h1>
      <form>
        <h1>Your company's name</h1>
        <input type="text" class="companyname-text" placeholder="eg Vodafone Foundation">
        <h1>Your project's name</h1>
        <input type="text" class="projectname-text" placeholder="eg Instant Network Schools - INS">
        <h1>Your project’s impact objective(s)</h1>
        <div class="project-objective-input">
          <input type="text" class="objective-text" placeholder="eg How many lessons use INS">
          <input type="button" value="+" class="add-button-1"/>
        </div>
        <div class="project-objective-input">
          <input type="text" class="objective-text" placeholder="eg How many students have ICT skills ">
          <input type="button" value="+" class="add-button-2"/>
        </div>
      </form>
    <button class="project-create-button">Create</button>
    <button @click="logOut" class="logout-button">Logout</button>
    </section>
    <upload-module></upload-module>
    <button class="file-upload-button">Upload</button>
  </main>
</template>

<script>
import router from '../router'
import { store } from '../store/store'
import UploadModule from '../components/UploadModule.vue'

export default {
  name: 'creat-project',
  components: {
    UploadModule
  },
  // data () {
  //   return {

  //   }
  // },
  mounted () {
    this.hideNavBar()
  },
  methods: {
    hideNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'none'
    },
    logOut () {
      console.log(store.state.loggedIn)
      this.$firebase.auth().signOut().then(() => {
        this.$firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            store.commit('setLogOut')
            alert('You have logged out')
            router.push('/login')
          }
        })
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style>
textarea:focus,
input:focus,
button:focus {
  outline: none !important;
}

#creat-project {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100vh; */
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  vertical-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6.5rem 0 30rem 0;
}

/* .creat-project-form-area {
  position: absolute;
  top: 6%;
} */

.companyname-text,
.projectname-text {
  margin-top : 1.2rem;
  margin-bottom : 5rem;
  border: none;
  height: 4.6rem;
  width: 39.8rem;
  padding: 1.8rem 2.3rem;
}

.creat-project-title {
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;
  margin-bottom: 0;
}

#creat-project form {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.00);
  margin-top: 3.5rem;
  align-items: left;
  width: 100%;
  font-family: Helvetica;
  font-size: 1.68rem;
  color: rgba(104,104,104,0.70);
  line-height: 2.4rem;
}

#creat-project form h1{
  font-family: Helvetica;
  font-size: 2.6rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.creat-project-text{
  border: none;
}

#creat-project .add-button-1,
#creat-project .add-button-2 {
  background-color: #ffffff;
  border: none;
  border-radius: 60px;
  font-size: 3.5rem;
  width: 5.4rem;
  height: 5.4rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3rem;
}

.project-objective-input {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.objective-text {
  border: none;
  height: 4.6rem;
  width: 39.8rem;
  padding: 1.8rem 2.3rem;
}

.creat-project-form-area .logout-button {
  /* margin-right: 2rem; */
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  font-size: 1.68rem;
  /* position: absolute;
  top: 5rem;
  right:2rem; */
}

.project-create-button {
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.68rem;
}

.creat-project-form-area .logout-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.88rem;
}

.project-create-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #efefef;
  color: #000000;
  font-size: 1.88rem;
}

.project-create-button,
.creat-project-form-area .logout-button {
  margin-top: 3rem;
  height: 5.5rem;
}

.creat-project-form-area .logout-button {
  position: relative;
  left: -3rem;
}

.project-create-button {
  position: relative;
  right: -22rem;
  /* height: 5.5rem; */
  width: 12rem;
}

.file-upload-button {
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  font-size: 1.68rem;
  position: relative;
  right: -18rem;
  width: 12rem;
  height: 5.5rem;
}

.file-upload-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.88rem;
}
</style>
