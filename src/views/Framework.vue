<template>
  <div class="framework">
    <main id="framework">
      <section class="framework-form-area">
        <img src="../assets/alice_logo.png" width="91rem"/>
        <h1 class="framework-title">Select your impact measurement framework</h1>
        <h3 class='framework-sub-title'>Select one, add one, or indicate your own</h3>
        <form class="dropdown-form">
          <div class="dropdown">
            <button type="button" class="dropdown-toggle" @click="toggleDropdown">
              Select option
            </button>
            <ul class="dropdown-menu">
              <li class="dropdown-item" v-for="(option, index) in selectList" v-bind:key="index">
                <button type="button" :value="option" class="dropdown-option" @click="getText">
                  {{option}} <a v-if="index === 0 || index === 1 || index === 2 || index === 3 || index === 4" href="#"> - link</a>
                </button>
              </li>
            </ul>
          </div>
        </form>
        <form class="add-link-form" v-if="textInputShow === true">
          <h3 class='framework-sub-title'>Add a link to the framework you’re using</h3>
          <input class='text-form' type='text' placeholder="https://www.sopact.com/social-impact-measurement-framework">
          <button class='text-submit'>Add</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'framework',
  data () {
    return {
      selectList: ['SDG - Sustainable Development Goals',
        'SROI - Social Return on Investment',
        'ESG - Environmental, Social, Governance',
        'IRIS - Impact Reporting & Investment Standards',
        'GIIRS - Global Impact Investing Rating System',
        'Other',
        'Add your own',
        'No impact measurement framework'],
      textInputShow: false,
      selectedOption: ''
    }
  },
  mounted () {
    this.hideNavBar()
  },
  methods: {
    hideNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'none'
    },
    toggleDropdown () {
      const menu = document.querySelector('.dropdown-menu')
      menu.classList.toggle('show')
    },
    getText (e) {
      this.selectedOption = e.target.value
      const toggleBtn = document.querySelector('.dropdown-toggle')
      toggleBtn.textContent = this.selectedOption
      toggleBtn.style.color = '#3f4150'

      const SHOW_CONDITION = ['Other', 'Add your own', 'No impact measurement framework']
      SHOW_CONDITION.includes(this.selectedOption) ? this.textInputShow = true : this.textInputShow = false
      this.toggleDropdown()
    }
  },
  watch: {
    selectedOption () {
      this.getText()
    }
  }
}
</script>

<style>
#framework {
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

.framework-form-area {
  position: absolute;
  top: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.framework-title { 
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;  
  }

.framework-sub-title {
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  text-align: center;
  margin: 0.2rem 0 0 0;
}

#framework#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 30px;
  color: #3f4150;
  background-color: #f4f7fa;
}

#framework ul,
#framework li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

#framework button {
  font-size: 15px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #3f4150;
  background-color: #fff;
  border: none;
  cursor: pointer;
}

#framework button:focus,
#framework button:active {
  outline: none;
  box-shadow: none;
}

#framework .title {
  width: 20rem;
  margin-bottom: 1.6rem;
}

#framework .title img {
  width: 100%;
  height: auto;
}

#framework .dropdown-form {
  background-color: #fff;
  margin-top: 2rem;
  width: 45rem;
}

#framework form h1 {
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #3f4150;
}

#framework .dropdown {
  position: relative;
  z-index: 1;
}

#framework .dropdown-item {
  padding: 0 1.6rem 0 1.6rem;
  margin: 0;
  border-bottom: 1px solid #DCE2F0;
}

#framework .dropdown-toggle {
  width: 100%;
  height: 5rem;
  color: rgba(133, 136, 150, 0.5);
  text-align: left;
  transition: border-color 100ms ease-in;
  padding: 0 1.6rem 0 1.6rem;
  background-image: url('../assets/Dropdown.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
}

#framework .dropdown-toggle.selected {
  color: #3f4150;
  border-color: rgba(224, 226, 231, 1);
}

#framework .dropdown-toggle:active {
  border-color: rgba(224, 226, 231, 1);
}

#framework .dropdown-menu {
  position: absolute;
  z-index: 2;
  left: 0;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid transparent;
  transition: border-color 200ms ease-in, padding 200ms ease-in,
    max-height 200ms ease-in, box-shadow 200ms ease-in;
}

#framework .dropdown-menu.show {
  max-height: 38.2rem;
}

#framework .dropdown-option {
  width: 100%;
  height: 4.6rem;
  padding: 0;
  line-height: 2.88rem;
  text-align: left;
  font-size: 1.68rem;
  font-family: Helvetica;
  color: #686868;
  margin: 0;
}

#framework .dropdown-option:hover {
  background-color: #f8f9fa;
}

#framework .add-link-form {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
}

#framework .add-link-form h3 {
  margin-bottom: 4rem;
}

#framework .text-form {
  width: 50.7rem;
  height:  7.3rem;
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  outline: none;
}

#framework .text-form::placeholder {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: rgba(0,0,0,0.25);
  text-align: center;
}

#framework .text-submit {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  position: absolute;
  top: 95%;
  left: 80%;
}

#framework button::after {
  display: none;
}

.add-link-form {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}

</style>
