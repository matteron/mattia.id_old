----
title: Davit
date: July 19, 2020
desc: Lightweight, live-reload, development server
----

[Repository](https://github.com/matteron/davit)

```JavaScript
const dv = new Davit({
	root: 'out'
	source: 'src',
});
dv.watch('/media/style.css');
dv.start();
```

The inspiration to build this was due to the tool I was previously using, [Browser-Sync](https://browsersync.io), seemed to stop being maintained.  It also always felt I was using a fraction of the features included with it.

After trying a few other libraries, I couldn't find anything that was both lightweight and supported running some code before the reload kicked in, so that I can maintain a separate source folder to the compiled code which is served.

So, I built Davit.  It's fairly bare-bones with only one dependency, [ws](https://www.npmjs.com/package/ws).  I might get around to replacing ws with my own implementation, as it too does way more than I need for this project.