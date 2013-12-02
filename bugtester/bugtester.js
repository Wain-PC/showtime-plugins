/**
 * bugtester plugin for Showtime
 *
 *  Copyright (C) 2013 lprot
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function(plugin) {

    var PREFIX = 'bugtester';
    var BASE_URL = 'http://bugtester';

    var logo = plugin.path + "logo.png";

    function setPageHeader(page, title) {
        if (page.metadata) {
            page.metadata.title = title;
            page.metadata.logo = logo;
        }
        page.type = "directory";
        page.contents = "items";
        page.loading = false;
    }

    var service = plugin.createService("bugtester", PREFIX + ":start", "video", true, logo);

    function startPage(page) {
        setPageHeader(page, 'bugtester - Simple bug tester plugin');

        page.appendItem("", "separator", {
            title: 'Separator'
        });

	showtime.trace("HELLO WORLD!!!");

        page.loading = false;
    };

    plugin.addURI(PREFIX + ":start", startPage);

    plugin.addSearcher("bugtester", logo,

    function(page, query) {
	page.type = "directory";
        page.loading = false;

        var response = showtime.httpGet("http://www.google.com");
	showtime.trace(response);

        page.appendPassiveItem('video', {
            title: 'Test'
        });

	showtime.trace("HELLO WORLD AGAIN !!!");

        page.entries++;
        return false;
    });
})(this);

