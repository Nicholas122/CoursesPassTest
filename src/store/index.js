import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  test: {
    fetching: false,
    creating: false,
    error: false,
    errors: {},
    started: false,
    passed: false,
    data: {
      title: '',
      questions: [],
      description: '',
      section: '',
      timeLimit: '',
      passingScorePercent: 60,
      retakeTimeout: '',
    }
  },
  questions: [],
  activeQuestion: {},
  answers: [],
  subQuestionId: 0,
  result: {}
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    getAnswerValue: state => {
     var answer = state.answers.find(answer => answer.questionId === state.activeQuestion.id)
     var response = [];

     if (state.activeQuestion.type == 'USER_INPUT') {
      response = '';
    }


    if (answer) {
      response = answer.value;
    }

    return response;
  },
}
});
