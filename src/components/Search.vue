<template>
  <div class="Search">
    <b-card v-if="(markedprofile !== '')" class="col-md-3 marked">
      <b-media>
        <h6 class="mt-0">Marked Summoner: {{markedprofile}}</h6>
        <b-btn @click="searchmark()">Search</b-btn>
        <b-btn @click="clearmark()">Clear</b-btn>
      </b-media>
    </b-card>
    <img id="logo" src="../assets/Chimera_Logo.png">
    <h1>{{ msg }}</h1>
    <div class="col-md-12 d-flex justify-content-center align-items-center">
    <b-input v-on:keyup.enter="searchsummoner()" v-model="summonername" class="summoninput" placeholder="Enter Summoner Name"></b-input>
    </div>
    <b-btn class="padded" @click="searchsummoner()">Search!</b-btn>
    <b-btn v-if="(markedprofile !== '')" class="padded" @click="comparesummoner()">Compare to Marked Player!</b-btn>
    <div v-if="!compare"  class="col-md-12">
    <matches @marked="markedcard" v-model="markedprofile" v-bind:summid="info" :searched="searched" :markedprofile="markedprofile" :summonername="summonername"></matches>
    </div>
    <div v-if="compare" class="col-md-12">
      <div class="row">
      <div class="col-md-6">
        <matches class="padded" @marked="markedcard" v-model="markedprofile" v-bind:summid="compareinfo" :searched="searched" :markedprofile="markedprofile" :summonername="markedprofile"></matches>
      </div>
      <div class="col-md-6">
        <matches class="padded" @marked="markedcard" v-model="markedprofile" v-bind:summid="info" :searched="searched" :markedprofile="markedprofile" :summonername="summonername"></matches>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Matches from './Matches.vue'

export default {
  name: 'Search',
  components: {
    Matches
  },
  created () {
    if (localStorage.getItem('markedprofile') !== null) {
      this.markedprofile = localStorage.getItem('markedprofile')
    }
  },
  data () {
    return {
      msg: 'Welcome to the LoL Stat Demo',
      summonername: '',
      searched: false,
      info: {things: 'empty'},
      markedprofile: '',
      compare: false,
      compareinfo: {things: 'empty'}
    }
  },
  methods: {
    searchsummoner: function () {
      this.compare = false
      axios
        .get('/name?summoner=' + this.summonername)
        .then(response => {
          this.info = JSON.parse(response.data.body)
          this.searched = true
        })
    },
    markedcard: function (markprofile) {
      this.markedprofile = markprofile
    },
    searchmark: function () {
      this.summonername = localStorage.getItem('markedprofile')
      this.searchsummoner()
    },
    comparesummoner: function () {
      console.log('compare to marked')
      this.compare = true
      axios
        .get('/name?summoner=' + this.summonername)
        .then(response => {
          this.info = JSON.parse(response.data.body)
          this.searched = true
        })
      axios
        .get('/name?summoner=' + this.markedprofile)
        .then(response => {
          this.compareinfo = JSON.parse(response.data.body)
        })
    },
    clearmark: function () {
      localStorage.removeItem('markedprofile')
      this.markedprofile = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
  width: 150px;
  height: 150px;
}
.padded {
  margin: 20px;
  padding: 20px;
}
.summoninput {
  text-align: center;
  width: 450px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
