# skoda human

## Execution
1. npm install
2. gulp 

## Modular Build
1. all webparts are split so you know where to find relative code
2. app/webparts/xxx contains folders with html, js and scss in
3. the index.html file from each webpart folder gets brought into index.html using nunjacks '{% include '_webparts/webparts/webpart-name/index.html' %}'
4. remember to incude the sass into the main.scss style sheet
5. the scss and js get concatinated and put straight into the dist folder

## Gulp Tasks
1. `gulp dev` - building locally with style sourcemaps
2. `gulp` - builds pattern library and webparts (style and javascript) for `https://skodauk.github.io/dist/index.htmlk2`
3. `gulp deploy-desktop` - builds css for webparts with desktop CMS overwrites (excluding pattern library style / js)
4. `gulp deploy-mobile` - builds css for webparts (excluding pattern library style / js)
5. `gulp nav-desktop` - builds the primary and secondary sitewide nav for k2 (note that the new third level thicker nav is made in the `gulp deploy-desktop` build)

## K2 CMS Details
1. Set up new pages with a single paragraph repeater in
2. Remove the default top image from the page
3. With a paragraph repeater you can add multiple 'sub-webparts' to the main paragraph repeater
4. This allows you to add / move webparts with ease

## Mixins / Classes
1. Use `class="content_zone"` to keep content within the 1100px 'safe zone'
2. Use `@include content_absolute;` when content sits on top of background image