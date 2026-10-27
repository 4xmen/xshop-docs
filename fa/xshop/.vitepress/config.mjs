import {defineConfig} from 'vitepress'

import {generateSidebar} from 'vitepress-sidebar'

const sections = ['01-getting-started', '02-consumer', '03-developer']

const sidebar = generateSidebar(
    sections.map((dir) => ({
        documentRootPath: '/xshop/',
        // scanStartPath: dir,
        // resolvePath: `/${dir}/`,
        useTitleFromFileHeading: true,
        useFolderTitleFromIndexFile: true,
        useFolderLinkFromIndexFile: true,
        collapsed: true,
        sortMenusByName: false,
        hyphenToSpace: true,
    }))
)
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "xShop v3",
    base: '/xshop-docs/fa',
    description: "xShop consumer & developer document",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Getting started', link: '/01-getting-started'},
            {text: 'Consumer document', link: '/02-consumer'},
            {text: 'Developer document', link: '/03-developer'},
        ],

        sidebar,

        socialLinks: [
            {icon: 'github', link: 'https://github.com/4xmen/xshop'}
        ]
    }
})
