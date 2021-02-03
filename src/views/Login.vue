<template>
  <div class="login">
    <main id="login">
      <section class="login-form-area">
        <img src="../assets/alice_logo.png" width="91rem"/>
        <h1 class="login-title">Connect to turn your data to knowledge</h1>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'login',
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
    }
  }
}
</script>

<style>
#login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  vertical-align: center;
}

.login-form-area {
  position: absolute;
  top: 12%;
}

.login-title { 
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;  
  }
</style>
