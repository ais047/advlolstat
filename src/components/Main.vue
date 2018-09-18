<template>
  <div class="Main">
    <b-card @click="searchmark()" v-if="markedprofile !== ''" class="col-md-3 marked">
      <b-media>
        <h6 class="mt-0">Marked Summoner: {{markedprofile}}</h6>
      </b-media>
    </b-card>
    <img id="logo" src="../assets/Chimera_Logo.png">
    <h1>{{ msg }}</h1>
    <div class="col-md-12 d-flex justify-content-center align-items-center">
    <b-input v-model="summonername" class="summoninput" placeholder="Enter Summoner Name"></b-input>
    </div>
    <b-btn class="padded" @click="searchsummoner()">Search!</b-btn>
    <b-card v-if="searched" class="col-md-12">
      <b-media>
        <img width="64" height="64" alt="placeholder" :src='require("../assets/profileicon/" + info.profileIconId + ".png")'/>
        <h3 class="mt-0">Summoner: {{info.name}}</h3>
        <p>
        <h5> Summoner Level: {{info.summonerLevel}} </h5>
      </b-media>
      <b-btn class="padded" @click="marksummoner()">Mark this Profile</b-btn>
    </b-card>
    <matches v-bind:summid="info"></matches>
  </div>
</template>

<script>
import axios from 'axios'
import Matches from './Matches.vue'
import Headers from './Header.vue'

export default {
  name: 'Main',
  components: {
    Matches,
    Headers
  },
  created () {
    this.markedprofile = localStorage.getItem('markedsummoner')
  },
  data () {
    return {
      msg: 'Welcome to the LoL Stat Demo',
      summonername: '',
      searched: false,
      info: {things: 'empty'},
      markedprofile: ''
    }
  },
  methods: {
    searchsummoner: function () {
      axios
        .get('/name?summoner=' + this.summonername)
        .then(response => {
          this.info = JSON.parse(response.data.body)
          this.searched = true
        })
    },
    marksummoner: function () {
      localStorage.setItem('markedsummoner', this.summonername)
    },
    searchmark: function () {
      this.summonername = localStorage.getItem('markedsummoner')
      this.searchsummoner()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.padded {
  margin: 20px;
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
