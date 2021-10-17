import { ExplainTranslate } from './explainTranslate';

export class Translate {
    private explainTranslate;

    constructor() {
        this.explainTranslate = new ExplainTranslate();
    }

    translateList(): string {
        return this.explainTranslate.list();
    }
}
