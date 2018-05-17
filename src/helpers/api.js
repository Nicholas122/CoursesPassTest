import axios from 'axios';

export const instance = axios.create({
	baseURL: '/api/',
});

export const getTest = testId => instance.get(`/test/${testId}`);

export const getQuestion = testId => instance.get(`/questions?test=${testId}`).then(({ data }) => data);

export const finishTest = data => (
  instance.post('/test/pass', data).then(res => res.data)
);