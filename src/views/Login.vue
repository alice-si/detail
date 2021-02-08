<template>
  <div class="login">
    <main id="login">
      <section class="login-form-area">
        <img src="../assets/alice_logo.png" width="91rem"/>
        <h1 class="login-title">Connect to turn your data to knowledge</h1>
        <form>
          <input type="email" class="login-email" placeholder="Username">
          <input type="text" class="login-text" placeholder="Password">
          <input type="button" class="sign-in" value="Sign In"></input>
        </form>
        <!-- <img src="../assets/btn_google_signin_light_normal_web.png"> -->
        <div class="rememberme-area">
          <span class="remember-me">
            <input type="checkbox" id="rememberme-checkbox">
              <label class='rememberme-checkbox' for='rememberme-checkbox'>
                <div class='rememberme-checkbox-div' for='rememberme-checkbox'>
                  <span class='rememberme-checkbox-v' for='rememberme-checkbox'>V</span>
                </div>
              </label>
              <h3>Remember me</h3>
          </span>
          <a href="#"> Forgot Password?</a>
        </div>
        <!-- <input type="button" class="google-login"> -->
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
  margin-bottom: 0;
}

#login form {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.00);
  box-shadow: 0 22px 46px 0 #E1EAFC;
  margin-top: 5.3rem;
}

.login-email,
.login-text {
  width: 50.7rem;
  border-radius: 0.2rem;
  font-size: 1.68rem;
  padding: 2.6rem;
}

.login-email {
  border-bottom: 0.1rem solid #DCE2F0;
  border-top: 0;
  border-right: 0;
  border-left: 0;
}

.login-text{
  border: none;
}

#login .sign-in {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  position: absolute;
  top: 57.5%;
  left: 88%;
  border: none;
  font-family: .SFNS-Regular;
  font-size: 1.68rem;
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

/* .rememberme-area {
  display: flex;
} */

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
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 0 2.4rem;
}

.rememberme-area h3 {
  display: inline;
  margin: 0;
}

.remember-me {
  padding: 0;
  margin: 0;
}

.google-login {
  background: url('../assets/btn_google_signin_light_normal_web.png') no-repeat;
  width: 20rem;
  height: 5rem;
  border: none;
}

</style>
