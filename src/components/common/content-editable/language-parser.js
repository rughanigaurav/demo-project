import { default as grammar } from "./grammer"
import { LRLanguage, LanguageSupport } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight";
import { buildParser } from '@lezer/generator';

const parser = buildParser(grammar);
export const EXAMPLELanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Keyword: t.keyword,
        brackets: t.bracket,
        Identifier: t.string
      })
    ]
  })
})

export function LangParser() {
  return new LanguageSupport(EXAMPLELanguage)
}
