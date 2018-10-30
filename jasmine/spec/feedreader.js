/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // check if each feed has a URL defined and URL is not empty
        it('have a URL defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // check if each feed has a name defined and name is not empty
        it('have a name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });

    });

    // New test suite 'The menu'
    describe('The menu', function () {

        // Check if menu is hidden by default
        it('is hidden by default', function () {
            body = $('body');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // Check if menu is toggling by clicking the menu icon
        let menuIcon = $('.menu-icon-link');
        it('changes visibility when the menu icon is clicked', function () {
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    // New test suite 'Initial Entries'
    describe('Initial Entries', function () {

        // wait for loadFeed() done
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('Loadfeed function is called and completes its work', function () {
            let entry = $('.feed .entry');
            console.log(entry);
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    // New test suite 'New Feed Selection'
    describe('New Feed Selection', function () {

        let currentFeed, newFeed;

        // define old feed and new feed
        beforeEach(function (done) {
            loadFeed(0, function () {
                currentFeed = $('.feed').html();

                loadFeed(1, function () {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        // check if new feed is loaded
        it('A new feed is loaded and content changes', function (done) {
            expect(currentFeed !== newFeed).toBe(true);
            done();
        });
    });
}());
