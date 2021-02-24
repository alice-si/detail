<template>
  <div class="project-objective-add">
    <input type="text" @keyup="getText(userInputSubComp)" v-model="userInputSubComp" class="objective-text" :placeholder="placeholderTextProp">
    <input v-if="onKeyupEvent !== true" type="button" class="add-objective-button" />
    <input v-if="onKeyupEvent === true" type="button" class="save-objective-button" @click="addObjectives(userInputSubComp)"/>
    <input v-if="noOfIndex > 1 && noOfIndex === inputLength" type="button" class="remove-button" @click="removeObjectives(userInputSubComp, noOfIndex)"/>
    <loading-spinner v-if="loadingspinnerShow === true"></loading-spinner>
  </div>
</template>

<script>
// TODO: 목표를 추가하는 버튼 처음엔 SAVE -> 클릭되고나면 + 버튼으로 바뀜, + 버튼으로 바뀌었을때 눌리면 새로운 폼 추가

import { store } from '../store/store'
import LoadingSpinner from './LoadingSpinner.vue'
export default {
  name: 'objective-input',
  components: {
    LoadingSpinner
  },
  props: {
    inputText: {
      type: String
    },
    addedText: {
      type: String
    },
    index: {
      type: Number
    },
    objectives: {
      type: Array
    },
    placeholderText: {
      type: Array
    }
  },
  data () {
    return {
      userInput: null,
      userInputSubComp: null,
      noOfIndex: this.index,
      inputLength: this.objectives.length,
      placeholderTextProp: '',
      loadingspinnerShow: false,
      onKeyupEvent: false
    }
  },
  mounted () {
    this.setText()
  },
  methods: {
    setText () {
      if (store.state.objectives[0] !== "") {
        this.userInputSubComp = store.state.objectives[this.index - 1]
        try {
          this.setPlaceholder()
          this.loadingspinnerShow = false
        } catch (error) {
          // loader calling
          this.loadingspinnerShow = true
          return null
        }
      } else {
        this.setPlaceholder()
        this.userInputSubComp = this.objectives[this.index - 1]
      }
    },
    getText (userInputText) {
      if (userInputText.length > 0) {
        this.onKeyupEvent = true
      } else {
        this.onKeyupEvent = false
      }
    },
    removeObjectives (userInputSubComp, noOfIndex) {
      this.$emit('remove-objectives', { userInputSubComp, noOfIndex })
    },
    addObjectives (inputText) {
      this.$emit('add-objectives', inputText)
    },
    setPlaceholder () {
      if (this.placeholderText.length === 1) {
        this.placeholderTextProp = this.placeholderText
      } else {
        const randomIndex = Math.floor(Math.random() * (this.placeholderText.length - 0) + 0)
        this.placeholderTextProp = this.placeholderText[randomIndex]
      }
    }
  },
  watch: {
    objectives () {
      this.setText()
    }
  }
}
</script>

<style>
.project-objective-add {
  display: flex;
  flex-direction: row !important;
  width: 100%;
  align-items: center;
  margin-bottom : 2rem;
}

.objective-text {
  background-color: #ffffff;
  width: 39.8rem;
  height: 4.6rem;
  padding: 0 2.3rem;
  border: none;
  border-radius: 0.2rem;
  margin: 0 !important;
}

.project-objective-add .add-objective-button {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3rem;
  padding: 0;
  background-image: url('../assets/ObjectAddBtn.svg');
  background-position: 48% 38%;
  background-size: 10rem 10rem;
}

.save-objective-button {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3rem;
  padding: 0;
  background-image: url('../assets/ObjectSaveBtn.svg');
  background-position: 55% 27%;
  background-size: 10rem 10rem;  
}

.remove-button {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3rem;
  padding: 0;
  background-image: url('../assets/ObjectRemoveBtn.svg');
  background-position: 48% 38%;
  background-size: 10rem 10rem;
  margin-left: 1rem;
}
</style>