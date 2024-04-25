import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { value } = await sut.execute({
      questionId: 'any_question_id',
      instructorId: 'any_instructor_id',
      content: 'any_content',
    })

    expect(value?.answer.content).toEqual('any_content')
    expect(value?.answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(value?.answer.id)
  })
})
