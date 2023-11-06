import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({})

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: newQuestion.authorId.toString(),
        content: 'new content',
        title: 'new title',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
        content: 'new content',
        title: 'new title',
    })
  })

it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({})

    await inMemoryQuestionsRepository.create(newQuestion)

    expect( () => {
        return sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'wrong-author-id',
            content: 'new content',
            title: 'new title',
        })
    }).rejects.toBeInstanceOf(Error)
      
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
