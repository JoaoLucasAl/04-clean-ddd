import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/entities/types/optional";
import dayjs from "dayjs";

interface QuestionProps {
    authorId: UniqueEntityID
    bestAwnserId?: UniqueEntityID
    title: string 
    content: string
    slug: Slug 
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
    get authorId() {
        return this.props.authorId;
    }

    get bestAwnserId() {
        return this.props.bestAwnserId;
    }

    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get slug() {
        return this.props.slug;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get isNew(): boolean {
        return dayjs().diff(this.props.createdAt, 'days') <= 3;
    }

    get excerpt() {
        return this.props.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    private touch(){
        this.props.updatedAt = new Date();
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)

        this.touch()    
    }
    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    set bestAnswerId(bestAnswerId: UniqueEntityID) {
        this.props.bestAwnserId = bestAnswerId;
        this.touch();
    }

    static create(
        props: Optional<QuestionProps, 'createdAt' | 'slug'>, 
        id?: UniqueEntityID
        ) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: new Date(),
        }, id)

        return question
    }
}