import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { SpyInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"
import { OnAnswerComment } from "./on-answer-comment"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<[
    SendNotificationUseCaseRequest], 
    Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Comment', () => {

    beforeEach(() => {
        inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnAnswerComment(inMemoryAnswersRepository,inMemoryQuestionsRepository, sendNotificationUseCase)
    })

    it('should send a notification when an answer has a new comment', async () => {

        const answer = makeAnswer()
        const answerComment = makeAnswerComment({
            answerId: answer.id
        })

        inMemoryAnswersRepository.create(answer)
        inMemoryAnswerCommentsRepository.create(answerComment)
        
        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })

    })
})