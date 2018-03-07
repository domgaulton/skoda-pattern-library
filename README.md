# ŠKODA Pattern Library and Webpart Repository

## Execution
1. npm install
2. gulp 

## Modular Build
1. all webparts are split so you know where to find relative code
2. app/_webparts/webparts/xxx contains folders with html, javascript and scss in
3. the index.html file from each webpart folder gets brought into index.html using nunjacks `{% include '_webparts/webparts/webpart-name/index.html' %}` on the `webpart_webpart-name.html` file
4. add this to the `pattern-library/nav/index.html` file to display on the navigation
5. incude the sass into the webpart.scss style sheet (split into webparts and pattern library styles)
5. the scss and js get concatinated and put straight into the dist folder

## Gulp Tasks
1. `gulp dev` - building locally with style sourcemaps
2. `gulp` - builds pattern library and webparts (style and javascript) for `https://skodauk.github.io/dist/index.html`
3. `gulp deploy-desktop` - builds css for webparts with desktop CMS overwrites (excluding pattern library style / js)
4. `gulp deploy-mobile` - builds css for webparts (excluding pattern library style / js)
5. `gulp nav-desktop` - builds the primary and secondary sitewide nav for k2 (note that the new third level thicker nav is made in the `gulp deploy-desktop` build)

## Process
1. Use branch names from JIRA tickets e.g. `SKMW-0001 - Webpart Name`
2. Commit changes and set up Pull Requests
3. Changes will be seen on `https://skodauk.github.io/dist/index.html` where ŠKODA can review (use `?hide-title` parameter at end of URL to hide title)
4. If happy we can update global scripts and css for desktop and mobile.

## FE Build tips
1. So we can use h1 through to H6 or even p / span tags in hero text (semantically we might want to do this) we have the following variable `#{$text}` which can be used to apply styles to all tags. In this case we need to put a wrapper on the container and a child text tag.
2. Add video to webparts using `id="player"` and `data-ytID="zoRbe2Of9_Y"` where ID is YouTube ID.
3. Add `?hide-title` to any page to remove the black hero banner - this is useful for example pages like `https://skodauk.github.io/dist/example_content-page.html`

## K2 CMS Details
1. Set up new pages with a single paragraph repeater in
2. Remove the default top image from the page
3. With a paragraph repeater you can add multiple 'sub-webparts' to the main paragraph repeater
4. This allows you to add / move webparts with ease

## Mixins / Classes
1. Use `class="content_zone"` to keep content within the `safe zone`