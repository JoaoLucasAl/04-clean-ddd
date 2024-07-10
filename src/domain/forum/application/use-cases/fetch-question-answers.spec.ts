import { makeQuestion } from 'test/factories/make-question'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch answers from an question', async () => {
    const question = makeQuestion()

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    const { value } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(value?.answers).toHaveLength(2)
  })

  it('should be able to fetch answers from an question', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const { value } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(value?.answers).toHaveLength(2)
  })
})
