import {
  SET_TEST_DATA,
  SET_QUESTION_DATA,
  START_TEST,
  CHANGE_ACTIVE_QUESTION,
  FINISH_TEST,
  UPDATE_QUESTION_ANSWER
} from './mutationTypes';

export default {
  [SET_TEST_DATA](state, data) {
    state.courseId = data.data.section.course.id;
    state.test.data.title = data.data.title;
    state.test.data.description = data.data.description;
    state.test.data.section = data.data.section;
    state.test.data.timeLimit = data.data.timeLimit;
    state.test.data.passingScorePercent = data.data.passingScorePercent;
    state.test.data.retakeTimeout = data.data.retakeTimeout;
  },

  [SET_QUESTION_DATA](state, data) {
    state.questions = data;

    state.activeQuestion = data[0];
  },

  [START_TEST](state) {
    state.test.started = true;
  },

  [CHANGE_ACTIVE_QUESTION](state, questionId) {
    state.activeQuestion = state.questions.find(item => item.id === questionId);
  },

  [FINISH_TEST](state, data) {
    state.test.started = false;
    state.test.passed = true;
    state.test.result = data.result;
  },

  [UPDATE_QUESTION_ANSWER](state, value) {
    var answer = state.answers.find(answer => answer.questionId === state.activeQuestion.id)


    if (answer) {
      answer.value = value;
    }
    else {
     state.answers.push({
      'questionId': state.activeQuestion.id,
      'value': value
    });
   }
 },


};
