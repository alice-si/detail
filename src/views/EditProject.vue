<template>
  <main id="edit-proejct">
    <div class="back">
      <router-link to="/home">
        <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
      </router-link>
    </div>
    <section class="your-project">
      <h1 class="edit-project-title">Your projects</h1>
      <h3 class="edit-project-subtitle">Your company's name</h3>
        <article class="editproject-dropdown" v-if="showCompanySelectBox===true">
          <select-box
            :cssId="companyCssId"
            :selectboxOption="companyNames"
            @get-selectbox-text="getSelectboxText">
          </select-box>
        </article>
        <article class="objective-vfor-wrapper" v-if="showCreatenewCompany === true">
          <object-input-div v-for="i in noOfInputForm" v-bind:key="i + noOfInputForm*99"
            @add-objectives="addCompany"
            @remove-objectives="removeObjectives"
            :objectives="companyNameInput"
            :addedText="addedCompany"
            :removeText="removedItem"
            :index="i"
            :placeholderText="companyPlaceholder"
            v-bind:class="i"
          ></object-input-div>
        </article>
      <h3 class="edit-project-subtitle">Your project’s name</h3>
        <article class="editproject-dropdown" v-if="showProjectSelectBox === true">
          <select-box
            :cssId="projectCssId"
            :selectboxOption="projectNames"
            @get-selectbox-text="getSelectboxText">
          </select-box>
        </article>
        <h3 class="objective-vfor-wrapper-subtitle-2" v-if="showProjectNotice === true">Please select company first</h3>
        <article class="objective-vfor-wrapper" v-if="showCreateNewProject === true">
          <h3 class="objective-vfor-wrapper-subtitle">Please type the name of the new project</h3>
          <object-input-div v-for="i in noOfInputForm" v-bind:key="i + noOfInputForm*98"
            @add-objectives="addObjectives"
            @remove-objectives="removeObjectives"
            :objectives="projectNameInput"
            :addedText="addedObj"
            :removeText="removedItem"
            :index="i"
            :placeholderText="projectPlaceholder"
            v-bind:class="i"
          ></object-input-div>
        </article>
      <h3 class="edit-project-subtitle">Your project’s impact objective(s)</h3>
        <h3 class="objective-vfor-wrapper-subtitle-2" v-if="showObjectNotice === true">Please select company & project first</h3>    
        <article class="objective-vfor-wrapper" v-if="showCreateNewObject === true">
          <object-input-div v-for="i in noOfObjInputForm" v-bind:key="i + noOfObjInputForm*97"
            @add-objectives="addObjectives"
            @remove-objectives="removeObjectives"
            :objectives="objectives"
            :addedText="addedObj"
            :removeText="removedItem"
            :index="i"
            :placeholderText="objectivePlaceholder"
            v-bind:class="i"
          ></object-input-div>
        </article>
      <button @click="projectUpdate" class="project-update-button">Update</button>
    </section>
    <section class="upload-module-area">
      <upload-module></upload-module>
      <button @click="projectUpdate" class="project-update-button">Upload</button>      
    </section>
    <section class="framework-area">
      <h3 class="framework-area-title">Your project's dashboards</h3>
        <row :gutter="12" class="framework-thumbnails-wrapper">
          <column class="framework-thumbnail-tile" :lg="3" :md="2" :xs="5">
            <router-link to="/ins">
            <div @mouseover="mouseHover(1)" @mouseout="mouseOut(1)">
              <div class="framework-link-title">
                <h1>INS Lessons</h1>
                <h1 style="color:#8954BA;">{{insGrowthRate}}</h1>
              </div>
              <h3>Showing data till {{lastUpdate}}</h3>
              <img src="../../src/assets/dummy1.svg"/>
              </div>
            </router-link>
            <div class="framework-thumbnail-hover" v-if="editHoverboxShow1 === true">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
          <column class="framework-thumbnail-tile-2" :lg="3" :md="2" :xs="5">
            <router-link to="/attendance">
            <div @mouseover="mouseHover(2)" @mouseout="mouseOut(2)">
              <div class="framework-link-title">
                <h1>Students attendance</h1>
              </div>
              <h3>Showing data till {{lastUpdate}}</h3>
              <h1 style="color:#8954BA;"></h1>
              <img src="../../src/assets/dummy2.svg"/>
            </div>  
            </router-link>
            <div class="framework-thumbnail-hover-2" v-if="editHoverboxShow2 === true">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
          <column class="framework-thumbnail-tile-3" :lg="3" :md="2" :xs="5">
            <router-link to="/ict">
            <div @mouseover="mouseHover(3)" @mouseout="mouseOut(3)">
              <div class="framework-link-title">
                <h1>ICT skills acquired</h1>
                <h1 style="color:#8954BA;">{{ictGrowthRate}}</h1>
              </div>            
              <h3>Showing data till {{lastUpdate}}</h3>
              <img src="../../src/assets/dummy3.svg"/>
            </div>
            </router-link>
            <div class="framework-thumbnail-hover-3" v-if="editHoverboxShow3 === true">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
        </row>
      <h3 class="edit-project-subtitle-2">Your impact measurement framework(s)</h3>
      <h3 class="edit-project-subtitle-3">Your framework</h3>
      <framework-select-box></framework-select-box>
    </section>
  </main>
</template>

<script>
import { getLessons, getStudentAvgAcrossSchools } from '../data/data-provider.js'
import { compareDataByYear, calcDifference } from '../data/data-handler'
import { store } from '../store/store'
import UploadModule from '../components/UploadModule.vue'
import ObjectInputDiv from '../components/ObjectiveInputDiv.vue'
import FrameworkSelectBox from '../components/Framework.vue'
import SelectBox from '../components/Selectbox.vue'

export default {
  components: {
    ObjectInputDiv,
    UploadModule,
    FrameworkSelectBox,
    SelectBox
  },
  data () {
    return {
      companyCssId: 'company-selectbox',
      companyNames: [],
      companyNameInput: [''],
      selectedCompany: null,
      companyPlaceholder: ['eg Vodafon foundation'],
      projectCssId: 'project-selectbox',
      projectNames: null,
      projectNameInput: [''],
      selectedProject: null,
      projectPlaceholder: ['eg INS project'],
      objectiveCssId: 'objective-selectbox',
      objectives: [''],
      objectivePlaceholder: ['eg How many lessons use INS', 'eg How many students have ICT skills', 'How many students have ICT skills'],
      removedItem: '',
      addedCompany: '',
      addedObj: null,
      dashboardName: 'INS Lessons',
      lastUpdate: '31/12/2019',
      insGrowthRate: '',
      ictGrowthRate: '',
      editHoverboxShow1: false,
      editHoverboxShow2: false,
      editHoverboxShow3: false,
      showCompanySelectBox: false,
      showProjectSelectBox: false,
      showCreatenewCompany: false,
      showCreateNewProject: false,
      showCreateNewObject: false,
      showProjectNotice: false,
      showObjectNotice: false,
      viewMode: null,
      editMode: null
    }
  },
  mounted () {
    this.showNavBar()
    this.getInsGrowthRate()
    this.showNavBar()

    const database = this.$database.ref('spqo4phrmdUbvKf722BiQdld3R12') // naver login
    // const database = this.$database.ref('0M1kcgIWytPWL1UNzHfSyb1YQvh2') // google login
    database.on('value', (snapshot) => {
      try { // create company selectbox
        const createdCompanies = [...Object.keys(snapshot.val().projectInfo), 'Create new company']
        this.companyNames = createdCompanies
        this.viewMode = 'Company'
        this.updatePage()
      } catch (error) {
        this.viewMode = 'null'
        console.log('No company name')
        // show add module
      }
    })
  },
  methods: {
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },
    toggleDropdown (cssSelectorId) {
      const menu = document.getElementById(`${cssSelectorId}`)
      menu.classList.toggle('show')
    },
    addCompany (addedCompanyFromComp) {
      // const userId = 'spqo4phrmdUbvKf722BiQdld3R12'
      // const update = {}
      // update[`/${userId}/projectInfo/${addedCompanyFromComp}/`] = {}
      this.companyNames.unshift(addedCompanyFromComp)
    },
    // addProject (addedProject) {
    //   console.log(addedProject)
    // },
    addObjectives (addedObj) {
      store.commit('setObjectives', {
        addedObj
      })
      this.objectives = store.state.objectives
      this.$forceUpdate()
    },
    removeObjectives (removeIndex) {
      this.objectives.splice(removeIndex - 1, 1)
    },
    getInsGrowthRate () {
      const prevYear = getLessons([], [], [], '2018')
      const currYear = getLessons([], [], [], '2019')
      this.insGrowthRate = compareDataByYear(Object.values(prevYear.lessons[0]), Object.values(currYear.lessons[0]))
      this.ictGrowthRate = calcDifference([getStudentAvgAcrossSchools('Total', 'Base')], [getStudentAvgAcrossSchools('Total', 'End')])[0]
    },
    projectUpdate () {
      console.log('project created')
    },
    mouseHover (number) {
      switch (number) {
        case 1:
          this.editHoverboxShow1 = true
          break
        case 2:
          this.editHoverboxShow2 = true
          break
        case 3:
          this.editHoverboxShow3 = true
          break
      }
    },
    mouseOut (number) {
      switch (number) {
        case 1:
          this.editHoverboxShow1 = false
          break
        case 2:
          this.editHoverboxShow2 = false
          break
        case 3:
          this.editHoverboxShow3 = false
          break
      }
    },
    getSelectboxText (selected) {
      const selectboxType = selected.selectboxType
      const selectedOption = selected.selectedOption

      switch (selectboxType) {
        case 'company-selectbox':
          this.viewMode = 'Company'
          this.selectedCompany = selectedOption
          break
        case 'project-selectbox':
          this.viewMode = 'Project'
          this.selectedProject = selectedOption
          break
      }
    },
    updatePage () {
      console.log(this.viewMode)
      switch (this.viewMode) {
        case 'Company':
          console.log('company change')
          this.projectNames = null
          this.objectives = ['']
          this.showCompanySelectBox = true
          if (this.selectedCompany === null) {
            this.showCreatenewCompany = false
            this.showCreateNewObject = false
            this.showProjectNotice = true
            this.showObjectNotice = true
          } else {
            this.showProjectNotice = false
            this.setProjectSelectbox()
          }
          break
        case 'Project':
          console.log('project change')
          this.objectives = ['']
          if (this.selectedCompany !== null) {
            this.showCreateNewProject = false
            this.setObjectiveInputbox()
          } else {
            this.setObjectiveInputbox()
          }
      }
    },
    setProjectSelectbox () {
      const database = this.$database.ref('spqo4phrmdUbvKf722BiQdld3R12') // naver login
      // const database = this.$database.ref('0M1kcgIWytPWL1UNzHfSyb1YQvh2') // google login
      database.on('value', (snapshot) => {
        try { // set project selectbox
          const projectInfo = snapshot.val().projectInfo
          this.projectNames = [...Object.keys(projectInfo[this.selectedCompany]), 'Create new project']
          this.showCompanySelectBox = true
          this.showCreatenewCompany = false
          this.showProjectSelectBox = true
        } catch (error) {
          console.log('No company name')
          this.switchEditMode('Company')
        }
      })
    },
    setObjectiveInputbox () {
      const database = this.$database.ref('spqo4phrmdUbvKf722BiQdld3R12') // naver login
      // const database = this.$database.ref('0M1kcgIWytPWL1UNzHfSyb1YQvh2') // google login
      database.on('value', (snapshot) => {
        try { // set project selectbox
          const projectInfo = snapshot.val().projectInfo
          const objectList = projectInfo[this.selectedCompany][this.selectedProject].projectObjectives
          this.objectives = objectList
          this.showCreateNewObject = true
          this.showObjectNotice = false
        } catch (error) {
          console.log('No project name')
          this.switchEditMode('Project')
        }
      })
    },
    switchEditMode (editArea) {
      switch (editArea) {
        case 'Company':
          this.showCreatenewCompany = true
          this.showProjectSelectBox = false
          this.showCreateNewProject = false
          this.showCreateNewObject = false
          this.showProjectNotice = true
          this.showObjectNotice = true
          break

        case 'Project':
          console.log(editArea)
          this.showCreateNewProject = true
          this.showCreatenewCompany = false
          this.showCreateNewObject = true
          this.showObjectNotice = false
          break
      }
    }
  },
  watch: {
    selectedCompany () {
      this.viewMode = 'Company'
      this.updatePage()
    },
    selectedProject () {
      this.viewMode = 'Project'
      this.updatePage()
    },
    companyNames () {
      console.log(this.companyNames)
      this.selectedCompany = this.companyNames[0]
      // TODO: 셀렉트박스가 this.companyNames[0]로 선택되도록 하고
      // Project name create 박스가 활성화된다
      // project name이 저장되면 objective 저장 박스가 활성화된다
      // update를 누르면 업로드영역이 활성화된다
      // TODO: objective까지 있어야만 파일 업로드 영역과 대시보드가 활성화된다
    }
  },
  computed: {
    noOfInputForm () {
      return 1
      // return store.state.objectives.length
    },
    noOfObjInputForm () {
      return this.objectives.length
    }
  }
}
</script>

<style>
#edit-proejct {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 0 8rem 8rem;
  max-width: 144rem;
}

.back {
  align-self: start;
  padding: 0;
}

.back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

.your-project {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.your-project h1 {
  margin-bottom: 4.2rem;
}

.your-project h3 {
  margin-bottom: 1.3rem;
}

.edit-project-title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.editproject-dropdown {
  margin-bottom: 2rem;
}

#edit-proejct > section.framework-area > div.container {
  display: flex;
  max-width: 144rem;
}

.framework-thumbnails-wrapper {
  padding: 1rem;
}

.framework-thumbnails-wrapper a {
  text-decoration: none;
}

.edit-project-subtitle {
  margin-bottom: 1rem;
}

.edit-project-subtitle-2 {
  margin-top: 8.3rem;
}

.edit-project-subtitle-3 {
  margin-top: 3.3rem;
}

.edit-project-subtitle,
.edit-project-subtitle-2,
.edit-project-subtitle-3,
.framework-area-title {
  font-family: Helvetica;
  font-size: 2.6rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.framework-area-title {
  margin-bottom: 4.8rem;
  text-align: left;
}

.your-project .objective-vfor-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 2rem 0;
  /* margin-bottom: 2.7rem; */
}

.objective-vfor-wrapper-subtitle {
  text-align: left;
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  margin: 0.3rem 0 1.1rem 0;
}

.objective-vfor-wrapper-subtitle-2 {
  text-align: left;
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  margin: 0.3rem 0 2rem 0 !important;
}

.upload-module-area {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.project-update-button {
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  background-color: #8954BA;
  color: #ffffff;
  font-size: 1.68rem;
  position: relative;
  left: 33rem;
  width: 12rem;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
}

.project-create-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #efefef;
  color: #000000;
  font-size: 1.88rem;
}

.framework-area {
  margin-top: 5.4rem;
}

.framework-area .container {
  max-width: 144rem;
}

.framework-thumbnail-tile,
.framework-thumbnail-tile-3 {
  background-color: #ffffff;
  min-width: 32.4rem !important;
  max-width: 32.4rem !important;
  height: 21.8rem;
  box-shadow: -13px 11px 25px 0 #adb6d92b;
  padding: 3rem 1.8rem !important;
  /* margin-bottom: 2rem; */
}

.framework-thumbnail-tile-3,
.framework-thumbnail-tile {
  margin: 0 7rem 2rem 0;
}

.framework-thumbnail-hover-3,
.framework-thumbnail-hover {
  background-color:  rgb(137, 84, 186, 0.9);
  min-width: 32.4rem;
  height: 6.3rem;
  position: relative;
  left: -1.8rem;
  top: -6rem;
  padding: 2.5rem;
  color: #ffffff;
}

.framework-thumbnail-hover-3 span,
.framework-thumbnail-hover span {
  color: #ffffff;
  font-family: Helvetica;
  font-size: 1.8rem;
}

.framework-thumbnail-tile-2 {
  background-color: #ffffff;
  min-width: 32.4rem !important;
  max-width: 32.4rem !important;
  height: 21.8rem;
  margin: 0 7rem 2rem 0;
  padding: 3rem 2.4rem !important;
}

.framework-thumbnail-hover-2 {
  background-color:  rgb(137, 84, 186, 0.9);
  min-width: 32.4rem;
  height: 6.3rem;
  position: relative;
  left: -2.5rem;
  top: -6rem;
  padding: 2.5rem;
  color: #ffffff;
}

.framework-thumbnail-hover-2 span {
  color: #ffffff;
  font-family: Helvetica;
  font-size: 1.8rem;
}

.framework-thumbnail-tile a {
   text-decoration: none;
 }

.framework-thumbnail-tile-3 img,
.framework-thumbnail-tile-2 img,
.framework-thumbnail-tile img {
  width: 27.6rem;
  height: 13.6rem;
  object-fit: cover;
}

.framework-thumbnail-tile-3 h1,
.framework-thumbnail-tile-2 h1,
.framework-thumbnail-tile h1 {
  font-family: Helvetica;
  font-size: 2.16rem;
  color: #585858;
  line-height: 2.4rem;
  text-align: left;
  margin-bottom: 0;
}

.framework-thumbnail-tile-3 h3,
.framework-thumbnail-tile-2 h3,
.framework-thumbnail-tile h3 {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #A6A7A8;
  line-height: 2.4rem;
  text-align: left;
  margin-bottom: 0;
}

.framework-link-title {
  display: flex;
  justify-content:space-between;
}

.framework-link-title h1 {
  display: inline;
}

</style>