import axios from 'axios';

export const instance = axios.create({
	baseURL: '/api/',
});

export const getTest = testId => instance.get(`/test/${testId}`);

export const getQuestion = testId => instance.get(`/questions?test=${testId}`).then(({ data }) => data);