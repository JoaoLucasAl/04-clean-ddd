import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (_answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    content: 'any_content',
    instructorId: 'any_instructor_id',
    questionId: 'any_question_id',
  })

  expect(answer.content).toEqual('any_content')
})