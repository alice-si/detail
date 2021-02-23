<template>
  <div class="project-objective-add">
    <input type="text" v-model="userInputSubComp" class="objective-text" placeholder="eg How many students have ICT skills">
    <input v-if="noOfIndex === inputLength" type="button" class="add-objective-button" @click="addObjectives"/>
    <input v-if="noOfIndex > 1 && noOfIndex === inputLength" type="button" class="remove-button" @click="removeObjectives(noOfIndex)"/>
  </div>
</template>

<script>
// TODO: 목표를 추가하는 버튼 처음엔 SAVE -> 클릭되고나면 + 버튼으로 바뀜, + 버튼으로 바뀌었을때 눌리면 새로운 폼 추가

import { store } from '../store/store'
export default {
  name: 'objective-input',
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
    }
  },
  data () {
    return {
      userInput: null,
      userInputSubComp: null,
      noOfIndex: this.index,
      inputLength: this.objectives.length
    }
  },
  mounted () {
    this.userInputSubComp = store.state.objectives[this.index - 1]
  },
  methods: {
    removeObjectives (noOfIndex) {
      this.$emit('remove-objectives', noOfIndex)
    },
    addObjectives () {
      if (this.userInputSubComp === '') {
        alert('Please insert project objective')
      } else {
        this.$emit('add-objectives', this.userInputSubComp)
      }
    }
  }
}
</script>

<style>
.project-objective-add {
  display: flex;
  flex-direction: row !important;
  width: 100%;
}

.objective-text {
  background-color: #ffffff;
  width: 39.8rem;
  height: 4.6rem;
  padding: 0 2.3rem;
  border: none;
  border-radius: 0.2rem;
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