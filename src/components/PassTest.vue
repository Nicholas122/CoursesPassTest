<template>
	<div class="container theme-showcase" v-if="testData.started == false && testData.passed == false">
		<div class="starter-template">
			<div class="page-header">
				<div class="row my-header">
					<h1 class="col-sm-4">{{testData.data.title}}</h1>
				</div>
			</div>
		</div>
		<div class="container ">
			<div class="myTestContainer">
				<div class="testDescription">
					<h3>{{testData.data.description}}</h3>
				</div>
				<div class="form-group startTest">
					<button class="btn btn-primary btn-lg" @click.prevent="startTest">Start test</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container theme-showcase"  v-else-if="testData.started">
		<div class="starter-template">
			<div class="page-header">
				<div class="row my-header">
					<h1 class="col-sm-4">{{testData.data.title}}</h1>
					<div class="col-xs-4 timer">
						<vue-countdown v-on:time-expire="saveTest" :seconds="testData.data.timeLimit" :start="true"></vue-countdown>
					</div>
				</div>
			</div>
			<div class="container ">
				<div class="myTestContainer">
					<div class="row">
						<div class="col-md-6">
							<div id="calendarPagination" v-for="(question, index) in questions" :key="question.id">
								<div :class="['pagination', 'btn', 'btn-default', 'currentQuestion', {'active': activeQuestion.id == question.id}]">
									<a href="#" @click.prevent="changeActiveQuestion(question.id)">{{index + 1}}</a>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="finish-btn clearfix">
								<button type="button" id="finishTest" class="btn-link" data-toggle="modal" data-target="#finishConfirmation">Finish</button>
							</div>
						</div>
					</div>
					<div id="questionContainer"> 
						<div class="questions">
							<h2 class="qHeader">Question {{getCurrentQuestionIndex() + 1}} outof {{questions.length}} </h2>
							<div class="rtDescription">
								<h3>
									<p>{{ activeQuestion.text }}</p>
								</h3>
							</div>
						</div>
						<div class="form-horizontal answerContainers" v-if="activeQuestion.type == 'USER_INPUT'">
							<div class="form-group" >
								<textarea placeholder="Please enter your answers here" class="form-control userInputAnswers results" v-model="questionAnswer"></textarea>
							</div>
						</div>
						<div class="form-horizontal answerContainers" v-else-if="activeQuestion.type == 'MULTIPLE_CHOICE'">
							<div class="answers"  v-for="answer in activeQuestion.answers" :key="answer.id">
								<div class="form-group answerLines">
									<div class="col-sm-1 multiAnswers"> 
										<input class="results input-answer" type="checkbox" v-model="questionAnswer" :value="answer.id">  
									</div>
									<div class="col-sm-10 answerDescriptions"> 
										{{answer.text}} 
									</div>
								</div>
							</div>
						</div>
						<div class="form-horizontal answerContainers" v-else-if="activeQuestion.type == 'READING_TEXT'">
							<div class="reading-text-info">
								<p>{{activeQuestion.readingText}}</p>
							</div>
							<h3><strong>Questions:</strong></h3>
							<div class="reading-text-subquestions" v-for="(subquestion, index) in activeQuestion.subQuestions" :key="subquestion.id">
								<h4>Question {{index + 1}}</h4>
								<p>{{subquestion.text}}</p>
								<div class="reading-text-subquestions-answers" v-for="answer in subquestion.answers" :key="answer.id">
									<div class="form-group answerLines">
										<div class="col-sm-1 multiAnswers"> 
											<input class="results input-answer" type="checkbox" v-model="questionAnswer" :value="answer.id + '|' + subquestion.id"> 
										</div>
										<div class="col-sm-10 answerDescriptions"> 
											{{answer.text}} 
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ul id="prevNextBtn" class="pager">
					<li class="previous" v-if="getPreviousQuestionId()">
						<a type="button" class="btn-link" @click.prevent="changeActiveQuestion(getPreviousQuestionId())">Previous</a>
					</li>
					<li class="next" v-if="getNextQuestionId()">
						<a type="button" class="btn-link" @click.prevent="changeActiveQuestion(getNextQuestionId())">Next</a>
					</li>

				</ul>
			</div>
		</div>
		<div class="modal fade" id="finishConfirmation" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationLabel" aria-hidden="true" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h4 class="modal-title" id="finishConfirmationLabel">Confirm your finishing</h4>
					</div>
					<div class="modal-body">Are you sure you want to finish?</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary confirm-finishing" @click.prevent="saveTest" data-dismiss="modal">Finish</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container theme-showcase" v-else-if="testData.passed">
		<div class="starter-template">
			<div class="page-header">
				<div class="row my-header">
					<h1 class="col-sm-4">Results: 100%</h1>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<p>Test passed!</p>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import * as types from '../store/questionTypes';
import VueCountdown from '@dmaksimovic/vue-countdown';

export default {
	props: ['testId'],
	components: {
		'vue-countdown': VueCountdown
	},
	created() {
		this.fetchTest(this.testId);
		this.fetchQuestion(this.testId);
	},
	computed: { 
		...mapGetters([
			'getAnswerValue',
			]),
		...mapState({
			testData: state => state.test,
			questions: state => state.questions,
			activeQuestion: state => state.activeQuestion,
			answers: state => state.answers
		}),
		questionAnswer: {
			get () {
				return this.getAnswerValue
			},
			set (value) {
				this.$store.commit('UPDATE_QUESTION_ANSWER', value)
			}
		}
	},
	methods: {
		...mapActions([
			'fetchTest',
			'fetchQuestion',
			'startTest',
			'changeActiveQuestion',
			'finishTest',
			]),
		getConst(constName) {
			return types[constName];
		},
		getCurrentQuestionIndex() {
			return this.questions.findIndex(item => item.id === this.activeQuestion.id);
		},
		getPreviousQuestionId() {
			var currentIndex =  this.getCurrentQuestionIndex();

			var response = false;

			if (this.questions[currentIndex - 1]) {
				response = this.questions[currentIndex - 1].id;
			}

			return response;
		},
		getNextQuestionId() {
			var currentIndex =  this.getCurrentQuestionIndex();

			var response = false;

			if (this.questions[currentIndex + 1]) {
				response = this.questions[currentIndex + 1].id;
			}

			return response;
		},
		saveTest() {
			this.finishTest(this.answers);
		}
	}
};
</script>

<style>
.pager li > a {
	cursor: pointer;
}
.timer {
	float: right;
	padding: 0px;
	width: auto;
	margin: auto;
	margin-right: 30px;
	font-size: 30px;
}
</style>
