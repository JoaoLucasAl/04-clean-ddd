export class Slug {

    public value: string

    constructor(value: string ) {
        this.value = value
    }

    /** 
     * Recieves a string and normalize it as a slug
     * 
     * Example: "An example of slug" -> "an-example-of-slug"
     * 
     * @param text {string}
    */
    static createFromText(text: string) {
        const slugText = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            


        return new Slug(slugText)
    }
}