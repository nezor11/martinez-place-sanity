import {at, defineMigration, set} from 'sanity/migrate'

/**
 * In the ConKansei slide the bold run started one letter late
 * ("…focused on c" + "**reating…**"). Move that letter into the bold span in
 * both languages so the mark starts on a word boundary.
 *
 *   npx sanity migration run fix-conkansei-bold --no-dry-run
 */
const slideId = '1630bfd2-fbf5-4abd-854d-3f3bcfbcede5'
const block = {_key: '8074d4092879'}
const plain = {_key: '2da2d0b8d2b8'}
const bold = {_key: 'b2c9547d4f4d'}

const fixes = {
  en: {
    plain: 'This project focused on ',
    bold: 'creating a visually appealing and highly functional online store that reflects the brand's dedication to quality and craftsmanship',
  },
  es: {
    plain: 'El proyecto se centró en ',
    bold: 'crear una tienda online atractiva y muy funcional que reflejara la apuesta de la marca por la calidad y la artesanía',
  },
}

export default defineMigration({
  title: 'ConKansei: start the bold run on a word boundary in both languages',
  documentTypes: ['slide'],
  filter: `_id == "${slideId}"`,
  migrate: {
    document() {
      return Object.entries(fixes).flatMap(([lang, text]) => [
        at(['slideDesc', lang, block, 'children', plain, 'text'], set(text.plain)),
        at(['slideDesc', lang, block, 'children', bold, 'text'], set(text.bold)),
      ])
    },
  },
})
