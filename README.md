# h

generate HTML from javascript array structures

like hyperscript but with arrays instead of functions.
runs easily on the server and web workers, without a HtmlElement polyfil.

## Example

``` js

var toHTML = require('h')

toHTML(
  ['div#page',
    ['div#header',
      ['h1.classy', 'h')),
    ['div#menu', { style: 'float: left, width: 200px' } },
      ['ul',
        ['li', 'one'],
        ['li', 'two'],
        ['li', 'three']]],
    ['div#content', {style: 'float: left;' },
      ['h2', 'content title'],
      ['p', 
        "so it's just like a templating engine,\n",
        "but easy to use inline with javascript\n"],
      ['p', 
        "the intension is for this to be used to create\n",
        "reusable, interactive html widgets. "]]]
)

```

## toHTML (ary)

Create some html from an array structure.
If the first element in the array is a string, that's the tag name.
if it is an array of arrays, each item is mapped through `toHTML`
and the results are concatenated.

### classes & id

If the tag name is of form `name.class1.class2#id` that is a short cut
for setting the class and id.

### attributes

If an `{}` object is passed in, it's values will be used to set attributes.

``` js
h('a', {href: 'https://npm.im/h'}, 'h')
```

html attributes names must be alphanumeric but may have hypens.
attribute values will be escaped with `html-escape`.

### innerHTML: non-escaped html content.

sometimes it is necessary to output non-escaped html,
for example, rendered markdown, or the output of another templating library.
to do this, use the `{innerHTML:html}` attribute. Note, this will cause any
following children to be ignored.

### children - string

If an argument is a string, it will be escaped with `html-escape`

### children - null.

This is just ignored.

### children - Array

Each item in the array is treated like a ordinary child. (string or HTMLElement)
this is uesful when you want to iterate over an object:

```
['table',
  Object.keys(obj).map(function (k) {
    return ['tr'
      ['th', k],
      ['td', obj[k]]
    ]
  }]

```

## License

MIT
