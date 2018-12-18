/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are placing within the $() function, since 
 * some of these tests may require DOM elements. This way,
 * they don't run until the DOM is ready.
 */
$(function() {
    // First Test Suite: is all about the RSS feeds definitions
    describe('RSS Feeds', () => {
        // Test 1: It tests that the allFeeds variable has been defined and that it is not empty
        it('The variable is defined and is not empty', () => {
            // It checks if the variable "allFeeds" has been defined
            expect(allFeeds).toBeDefined();
            // It checks that the variable "allFeeds" is greater than zero, that is, it is not empty
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        // Test 2: It tests that each feed in the allFeeds object has a URL defined and is not empty
        it("URL is defined and is not empty", () => {
            for (let feed of allFeeds) {
                // It checks if the URL has been defined
                expect(feed.url).toBeDefined();
                // It checks that the URL is greater than zero, that is, it is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        // Test 3: It tests that each feed in the allFeeds object has a name defined and is not empty
        it('Name is defined and is not empty', () => {
            for (let feed of allFeeds) {
                // It checks if the name has been defined
                expect(feed.name).toBeDefined();
                // It checks that the name is greater than zero, that is, it is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    // Second Test Suite: is all about the Menu
    describe("The Menu", () => {
        // Test 4: It tests that the menu element is hidden by default
        // https://api.jquery.com/hasClass/
        it("Is hidden by default", () => {
            // It checks that the menu element is hidden by default
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });

        // Test 5: It tests that the menu changes visibility when the menu icon is clicked
        const menuIconLink = $(".menu-icon-link");

        it("Is hiding/showing when the menu icon is clicked", () => {
            // It checks that the menu is shown when the menu icon is clicked
            menuIconLink.click();
            expect($("body").hasClass("menu-hidden")).toBeFalsy();
            // It checks that the menu is hidden when the menu icon is clicked
            menuIconLink.click();
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });
    });

    // Second Test Suite: is all about the initial entries
    describe("Initial Entries", () => {
       /* Test 6: It tests that there is at least a single ".entry" element within the ".feed" container,
        *         when the loadFeed function is called and completes its work
        */ 

        // loadFeed() is asynchronous so this test will require use Jasmine's beforeEach and asynchronous done() function
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it("Has at least a single entry element", () => {
            // It checks that there is at least one ".entry" element within the ".feed" container
            expect($(".feed .entry").length).not.toBe(0);
        });
    });

    // Third Test Suite: is all about the new feed selection
    describe("New Feed Selection", () => {
        /* Test 7: It tests that the loadFeed function that the content actually changes,
         *         when a new feed is loaded
         */

        // loadFeed() is asynchronous so this test will require use Jasmine's beforeEach and asynchronous done() function
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = $(".feed").html();
                loadFeed(1, () => {
                    newFeed = $(".feed").html();
                    done();
                });
            });
        });

        it("The content actually changes", () => {
            // It checks that the content actually change when a new feed is loaded
            expect(oldFeed).not.toEqual(newFeed);
        });
    });
}());
