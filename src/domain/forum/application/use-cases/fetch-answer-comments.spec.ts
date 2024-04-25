import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    const { value } = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    })

    expect(value?.answerComments).toHaveLength(2)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const answer = makeAnswer()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const { value } = await sut.execute({
      answerId: answer.id.toString(),
      page: 2,
    })

    expect(value?.answerComments).toHaveLength(2)
  })
})
