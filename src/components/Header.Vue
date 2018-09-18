<template>
  <div class="Header">
    <b-card v-if="markedprofile !== ''" class="col-md-3 marked">
      <b-media>
        <h6 class="mt-0">Marked Summoner: {{markedprofile}}</h6>
      </b-media>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Header',
  created () {
    this.markedprofile = localStorage.getItem('markedsummoner')
    console.log(this.markedprofile)
  },
  data () {
    return {
      markedprofile: ''
    }
  }
}
</script>

<style scoped>
.marker {
    float: right;
    position: relative;
    right: 0px;
    width: 300px;
    padding: 10px;
}
</style>
