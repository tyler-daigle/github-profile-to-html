# Convert Github Profile Markdown To HTML

This is just a small node script that uses **showdown** markdown to
convert my README.md to an HTML page. It just creates an html version
of the same exact content as can be seen at [github.com/tyler-daigle](https://github.com/tyler-daigle).

It has a very simple template and stylesheet. There is some strange
CSS selectors though due to the way that showdown generates the html.
Showdown wraps everything in <p> tags.

The page is not hosted yet.
