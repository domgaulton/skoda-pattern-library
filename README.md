# skoda human

## Execution
1. npm install
2. gulp 

## Gulp Tasks
1. gulp - builds the updated subnav and the webparts (style and javascript)
2. gulp nav - builds the sitewide nav (note that the new 3rd level thicker nav is made in the main.css)
3. gulp dev - building locally with style sourcemaps

## Modular Build
1. all webparts are split so you know where to find relative code
2. app/webparts/xxx contains folders with html, js and scss in
3. the index.html file from each webpart folder gets brought into index.html using nunjacks '{% include '_webparts/webpart/index.html' %}'
4. remember to incude the sass into the main.scss style sheet
5. the scss and js get concatinated and put straight into the dist folder

## K2 CMS Details
1. Set up new pages with a single paragraph repeater in
2. Remove the default top image from the page
3. With a paragraph repeater you can add multiple 'sub-webparts' to the main paragraph repeater
4. This allows you to add / move webparts with ease

## Mixins / Classes
1. Use `class="content_zone"` to keep content within the 1100px 'safe zone'
2. Use `@include content_absolute;` when content sits on top of background image