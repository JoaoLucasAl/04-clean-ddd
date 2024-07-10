import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const question = makeQuestion()

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )

    const { value } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(value?.questionComments).toHaveLength(2)
  })

  it('should be able to fetch paginated question comments', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: question.id }),
      )
    }

    const { value } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(value?.questionComments).toHaveLength(2)
  })
})
