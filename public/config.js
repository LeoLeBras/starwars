export default {
    server: {
        port: 8000
    },
    dir: {
        srcDir: __dirname + '/src/',
        buildDir: __dirname + '/__build__/',
        cssDir: 'css/',
        imgDir: 'img/',
        jsDir: 'js/',
        sassDir: 'sass/',
        fontsDir: 'fonts/'
    },
    fonts: {
        formats: 'woff woff2',
        custom: {
            'Open Sans': [400, 600]
        }
    },
    css: {
        autoprefixer: ['> 98%']
    },
    javascript: {
        entry: ['desktop.js', 'mobile.js'],
        babel: { presets: ['es2015', 'stage-0'] }
    }
};
