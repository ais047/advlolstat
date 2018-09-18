<template>
  <div class="Main">
    <h1>{{ msg }}</h1>
    <div class="col-md-12 d-flex justify-content-center align-items-center">
    <b-input v-model="summonername" class="summoninput" placeholder="Enter Summoner Name"></b-input>
    </div>
    <b-btn class="padded" @click="searchsummoner()">Search!</b-btn>
    <b-card v-if="searched" class="col-md-12">
      <b-media>
        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"/>
        <h5 class="mt-0">Welcome</h5>
        <p>
          Summoner Level
        </p>
      </b-media>
    </b-card>
    <matches v-bind:summid="this.info"></matches>
  </div>
</template>

<script>
import axios from 'axios'
import Matches from './Matches.vue'

export default {
  name: 'Main',
  components: {
    Matches
  },
  created () {},
  data () {
    return {
      msg: 'Welcome to the LoL Stat Demo',
      summonername: '',
      searched: false,
      info: {things: 'empty'}
    }
  },
  methods: {
    searchsummoner: function () {
      axios
        .get('/name?summoner=' + this.summonername)
        .then(response => {
          this.info = response.data.body
        })
      console.log(this.info)
      this.searched = true
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
