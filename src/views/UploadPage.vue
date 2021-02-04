<template>
  <div class='upload'>
    <main id='upload'>
      <section class='upload-form-area'>
        <img src='../assets/alice_logo.png' width='91rem'/>
        <h1 class='upload-title'>Upload your impact data files</h1>
        <h3 class='upload-sub-title'>File should be excel or csv</h3>
        <!-- <img src='../assets/UploadIcon.svg' /> -->
        <div class='upload-drop-area'>
          <vue-dropzone
            ref="imgDropZone"
            id="customdropzone"
            :options="dropzoneOptions"
            @vdropzone-complete="afterComplete"
          ></vue-dropzone>
          <div v-if="images.length > 0" class="image-div">
            <div v-for="image in images" :key="image.src">
              <img :src="image.src" class="image" />
            </div>
          </div>          
        </div>
        <div class='terms-checkbox-area'>
          <input type='checkbox' id='terms-checkbox' >
            <label class='terms-checkbox' for='terms-checkbox'>
              <div class='terms-checkbox-div' for='terms-checkbox'>
                <span class='terms-checkbox-v' for='terms-checkbox'>V</span>
              </div>
            </label>
          <h3 class='upload-sub-title'>Please tick the box to agree with our </br> <a href='#'>Data Processing Terms & Conditions</a> </h3>
        </div>
        <h1 class='upload-title'>ΟR Connect to your database on:</h1>
        <div class='upload-logo-area'>
          <img src="../assets/AwsLogo.svg">
          <img src="../assets/SalesforceLogo.svg">
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'upload',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: '.csv, .xlsx',
        dictDefaultMessage: `<p class="drag-drop-text">Drag & Drop Files Here</p>`
      },
      images: []
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
    async afterComplete (upload) {
      this.isLoading = true
      try {
        // save image
        let file = upload
        console.log(file)
        const metadata = {
          contentType: file.type
        }
        const storageRef = firebase.storage().ref()
        const imageRef = storageRef.child(`files/${file.upload.filename}`)
        await imageRef.put(file, metadata)
        var downloadURL = await imageRef.getDownloadURL()
        this.images.push({ src: downloadURL })
        this.$refs.imgDropZone.removeFile(upload)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style>
#upload {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  padding-top: 12vh;
}

.upload-title {
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;
  }

.upload-sub-title  {
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  text-align: center;
  margin: 0.2rem 0 0 0;
  }

.upload-sub-title a {
  color:#2FB9EF;
}

.terms-checkbox-area {
  margin: 2rem 0 0 0;
  align-items: center;
  display: flex;
  justify-content: center;
}

input[id='terms-checkbox'] {
  display: none;
}

input[id='terms-checkbox'] + label {
  background-color:rgb(255, 255, 255, 0);
  border: 0.1rem solid #2FB9EF;
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
  color: rgb(255, 255, 255, 0);
  margin: 0 1rem 0 0 ;
}

input[id='terms-checkbox']:checked + label { 
  color: #2FB9EF;
  width:20px;
  height:20px;
}

.terms-checkbox-div {
  align-items: center;
  vertical-align: center;
  width: 1.8rem;
  height: 1.8rem;
  margin: 0.2rem 0 0 0;
}

.terms-checkbox-v {
  position: relative;
}

.upload-drop-area {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.drag-drop-text {
  align-self: flex-end;
}

.image-div {
  display: none;
}

#customdropzone {
  border: 1px dashed #2FB9EF;
  background-color: #ffffff;
  transition: background-color .2s linear;
  background-image: url('../assets/UploadIcon.svg');
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem;
  font-family: Helvetica;
  font-size: 12px;
  color: #686868;
  width: 300px;
  padding: 20% 0 0 0 ;
}

.upload-logo-area {
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 0 0;
}

</style>
