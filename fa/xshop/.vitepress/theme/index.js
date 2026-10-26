import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import SectionFeatures from './SectionFeatures.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(SectionFeatures),
    })
  },
}