import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

export class QuestionCommentEvent implements DomainEvent {
  public ocurredAt: Date
  public questionId: UniqueEntityID

  constructor(questionId: UniqueEntityID) {
    this.questionId = questionId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.questionId
  }
}
