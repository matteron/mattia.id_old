<div class="postTitle">
    <date>January 14, 2020</date>
    <h2>Haipa (ハイパー)</h2>
    <div></div>
</div>

Haipa is a quick little project to make writing HTML a bit quicker and less painful (I really hate writing all those tags twice). I'm sure something like this has been done before, I just couldn't find it, so I built my own.

The idea came to me when I was writing a static site generator for this website.  Originally I was using [mustache](https://mustache.github.io/) for templating, but I found having to work around the logic-less nature of it frustrating.  So, I just decided to just use JavaScript template strings and write raw html in those, but that came with the issue of being easily error prone and also managing conditional layouts and variables still proved to be a pain point.  

Haipa was (quickly) conceived to fix these issues by having a more structured way to produce html strings. 

The initial prototype was done in about 5 minutes, then spent some time porting my static site over to give Haipa a semi realistic test.  I really didn't think the idea through for very long, but was very pleased to find out how intuitive it was to write.

The [Haipa readme](https://github.com/matteron/Haipa) is a good place to understand it fully I think, but here's a quick example.

The following:
```javascript
h().div(h()
    .id('example')
    .a(h().id('link-example').href('/projects/haipa')
        .txt('Haipa')
    )
);
```

Produces a string with:
```html
<div id="example">
    <a id="link-example" href="/projects/haipa">Haipa</a>
</div>
```

I find that writing Haipa is way faster and more natural.  For me writing html tags seems to break my flow and is slow.  Modern text editors will sometimes try and rectify this with autocompletion, but I'd rather just be able to write it quickly in any environment.

Haipa also allows for extensions to component-ize your templates.  For example, say you have a bunch of `li` tags with `a` tags inside to form a basic navbar.  You can make a `navLink` component to avoid repeating yourself.

After a while of using Haipa for all my side projects, I quickly found a bunch of pain points and eventually went back to the drawing board and came up with Haipa v2.  This was a complete rewrite of the library, including completely different syntax.  I also included some components to address the common patterns I was finding myself copying from project to project, like loops and stylesheet links.

Finally, I'd like to mention, you may have noticed the excessive use of first person nouns in this post.  Haipa is entirely built for myself and not intended to be a general purpose tool at all, so sorry if you hate it.

