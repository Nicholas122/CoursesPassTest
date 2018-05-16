import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';
import * as types from './questionTypes';

Vue.use(Vuex);

const state = {
  test: {
    fetching: false,
    creating: false,
    error: false,
    errors: {},
    data: {
      title: '',
      questions: [],
      description: '',
      section: '',
      timeLimit: '',
      passingScorePercent: 60,
      retakeTimeout: ''
    }
  },
  questions: [],
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
