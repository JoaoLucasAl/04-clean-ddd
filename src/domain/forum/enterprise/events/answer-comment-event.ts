import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

export class AnswerCommentEvent implements DomainEvent {
  public ocurredAt: Date
  public answerId: UniqueEntityID

  constructor(answerId: UniqueEntityID) {
    this.answerId = answerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerId
  }
}
