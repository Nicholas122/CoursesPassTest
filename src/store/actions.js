import {
	SET_TEST_DATA,
	SET_QUESTION_DATA,
	START_TEST,
	CHANGE_ACTIVE_QUESTION,
	FINISH_TEST,
	UPDATE_SUBQUESTION_ID
} from './mutationTypes';
import * as api from '../helpers/api';


export const fetchTest = ({commit}, testId) => {
	return api.getTest(testId).then(data => commit(SET_TEST_DATA, data));
}

export const fetchQuestion = ({commit}, testId) => {
	return api.getQuestion(testId).then(data => commit(SET_QUESTION_DATA, data));
}


export const startTest = ({commit}, testId) => {
	return api.startTest(testId).then(data => commit(START_TEST, data));
}

export const changeActiveQuestion = ({ commit }, questionId) => (
	commit(CHANGE_ACTIVE_QUESTION, questionId)
);

export const finishTest = ({commit}, postData) => {
	return api.finishTest(postData).then(data => commit(FINISH_TEST, data));
}

export const updateSubQuestionId = ({ commit }, questionId) => (
	commit(UPDATE_SUBQUESTION_ID, questionId)
);