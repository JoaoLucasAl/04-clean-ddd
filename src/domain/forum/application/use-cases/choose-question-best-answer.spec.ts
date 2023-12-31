import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswer } from './choose-question-best-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswer

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new ChooseQuestionBestAnswer(
      inMemoryQuestionsRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })
})

it('should not be able to choose another user question best answer', async () => {
  const question = makeQuestion(
    {
      authorId: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('question-1'),
  )
  const answer = makeAnswer({
    questionId: question.id,
  })

  await inMemoryQuestionsRepository.create(question)
  await inMemoryAnswerRepository.create(answer)

  expect(() => {
    return sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })
  }).rejects.toBeInstanceOf(Error)
})
