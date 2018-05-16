import {
  SET_TEST_DATA,
  SET_QUESTION_DATA,
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

    var maxId = parseInt(Math.max.apply(Math,state.questions.map(function(o){return o.id;}))) || 0;

    state.questionId = maxId + 1;
  },

};
