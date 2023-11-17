import { makeQuestion } from 'test/factories/make-question'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch answers from an question', async () => {
    const question = makeQuestion()

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(2)
  })

  it('should be able to fetch answers from an question', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
