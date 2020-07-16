Cross-Origin Resource Sharing

If you have been playing around with some external APIs in your web application,
you have probably encountered an error polluting your console saying that
reading remote source can't be done due to Same Origin Policy.

This happens when XMLHttpRequest tries to make request to another domain than
the one specified in the URL. For example, your website www.yourwebsite.com
tries to access a resource from www.someotherwebsite.com/data.json

