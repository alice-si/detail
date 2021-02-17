<template>
  <div class="creat-project">
    <main id="creat-project">
      <section class="creat-project-form-area">
        <img src="../assets/alice_logo.png" width="91rem"/>
        <h1 class="creat-project-title">Create your project</h1>
        <form>
          <h1>Your company's name</h1>
          <input type="text" class="companyname-text" placeholder="eg Vodafone Foundation">
          <h1>Your project's name</h1>
          <input type="text" class="projectname-text" placeholder="eg Instant Network Schools - INS">
          <h1>Your project's name</h1>
          <input type="text" class="objective-text" placeholder="eg How many lessons use INS">
          <input type="button" value="+" class="add-button"></input>
        </form>
      </section>
    </main>
    <button @click="logOut">Logout</button>
  </div>
</template>

<script>
import router from '../router'
import { store } from '../store/store'

export default {
  name: 'creat-project',
  // components: {

  // },
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
  width: 100vw;
  height: 100vh;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  vertical-align: center;
}

.creat-project-form-area {
  position: absolute;
  top: 6%;
}

.companyname-text,
.projectname-text,
.objective-text  {
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
  align-items: center;
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
}

.creat-project-text{
  border: none;
}

#creat-project .sign-up {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  position: absolute;
  top: 49.5%;
  left: 89%;
  border: none;
  font-family: .SFNS-Regular;
  font-size: 1.68rem;
}

#creat-project .add-button {
  background-color: #ffffff;
  border: none;
  border-radius: 60px;
  font-size: 3.5rem;
  width: 5.4rem;
  height: 5.4rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
}

.signing-up-text {
  font-size: 1.68rem;
  color: #8954BA;
  margin: 9.4rem;
}

.signing-up-text a {
  display: inline;
  text-decoration: underline;
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #8954BA;
}

input[id='rememberme-checkbox'] {
  display: none;
}

input[id='rememberme-checkbox'] + label {
  background-color:rgb(255, 255, 255, 0);
  border: 0.1rem solid #8954BA;
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
  color: rgb(255, 255, 255, 0);
  margin: 0 1rem 0 0 ;
  position: relative;
  top: 0.3rem;
}

input[id='rememberme-checkbox']:checked + label { 
  color: #8954BA;
  width: 2rem;
  height: 2rem;
}

.rememberme-checkbox-div {
  width: 2rem;
  height: 2rem;
  margin: 0;
  padding: 0;
}

.rememberme-checkbox-v {
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  position: relative;
  top: -0.35rem;
}

.rememberme-area {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #8954BA;
  margin-top: 1.5rem;
  display: flex;
  padding: 0 1.9rem;
}

.rememberme-area h3 {
  display: inline;
  margin: 0;
}

.remember-me {
  padding: 0;
  margin: 0;
}

.remember-me a {
  text-decoration: underline;
  margin-left: 0.5rem;
  color: #8954BA;  
}

.sign-in-with-google {
  width: 50.7rem;
  height: 2rem;
  background-color : white;
  border: none;
  font-size: 1.68rem;
  text-align: left;
  padding: 1.6rem 2rem;
  color:  #686868;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0.5rem 3rem 0 rgba(52,77,178,0.34);
}

</style>
