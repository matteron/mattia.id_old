## Haipa (ハイパー)
###### January 14, 2020

Haipa is a quick little project to make writing HTML a bit quicker and less painful (I really hate writing all those tags twice). I'm sure something like this has been done before, I just couldn't find it, so I built my own.

The idea came to me when I was writing a static site generator for this website.  Originally I was using [mustache](https://mustache.github.io/) for templating, but I found having to work around the logic-less nature of it frustrating.  So, I just decided to just use JavaScript template strings and write raw html in those, but that came with the issue of being easily error prone and also managing conditional layouts and variables still proved to be a pain point.  

Haipa was (quickly) conceived to fix these issues by having a more structured way to produce html strings. 

The initial prototype was done in about 5 minutes, then spent some time porting my static site over to give Haipa a semi realistic test.  I really didn't think the idea through for very long, but was very pleased to find out how intuitive it was to write.

The only hiccup ended up being a way to adapt the system to work with attributes which have a dash in the name, like "aria-label", but one quick parsing function later and Haipa was essentially feature complete.

The [Haipa readme](https://github.com/matteron/Haipa) is a good place to understand it fully I think, but here's a quick example.

The following:
```javascript
div([id`example`], [
    p([], ['hiya'])
]);
```

Produces a string with:
```html
<div id="example">
    <p>hiya</p>
</div>
```

I find that writing Haipa is way faster and more natural.  For me writing html tags seems to break my flow and is slow.  Modern text editors will sometimes try and rectify this with autocompletion, but I'd rather just be able to write it quickly in any environment.

The typical response is that haipa suffers with readability, which is true, though I think I've gotten used to it by know because I personally find it scans easy now.

Finally, I'd like to mention, you may have noticed the excessive use of first person nouns in this post.  Haipa is entirely built for myself and not intended to be a general purpose tool at all, so sorry if you hate it.