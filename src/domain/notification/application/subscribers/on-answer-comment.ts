import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswerCommentEvent } from '@/domain/forum/enterprise/events/answer-comment-event'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

export class OnAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepositoty: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerCommentNotification.bind(this),
      AnswerCommentEvent.name,
    )
  }

  private async sendAnswerCommentNotification({
    answerId,
  }: AnswerCommentEvent) {
    const answer = await this.answersRepository.findById(answerId.toString())

    if (answer) {
      const question = await this.questionsRepositoty.findById(
        answer.questionId.toString(),
      )

      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentario em sua resposta`,
        content: `A resposta que você enviou em "${question?.title.substring(0, 20).concat('...')}" tem um novo comentario!`,
      })
    }
  }
}
