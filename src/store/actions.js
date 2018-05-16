import {
  SET_TEST_DATA,
  SET_QUESTION_DATA,
} from './mutationTypes';
import * as api from '../helpers/api';


export const fetchTest = ({commit}, testId) => {
  return api.getTest(testId).then(data => commit(SET_TEST_DATA, data));
}

export const fetchQuestion = ({commit}, testId) => {
  return api.getQuestion(testId).then(data => commit(SET_QUESTION_DATA, data));
}
