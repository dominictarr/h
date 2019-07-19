var tape = require('tape')
var toHTML = require('..')
var input = [
  ['a', {href: 'http://example.com'}, 'example link'],
  ['ol', ['li', 'one'], ['li', 'two'], ['li', 'three']],
  ['ol', [['li', 'one'], ['li', 'two'], ['li', 'three']]],
  ['pre', '<pre> escaped html </pre>'],
  ['div', {innerHTML: '<foo>bar</foo>'}],
  ['a', {href: 'http://example.com/"</a><script>alert(1)</script>'}, 'danger'],
  ['div.content', ['h1', 'hello world']],
  [['div'], ['span'], ['section']],
]

var expected = [
  '<a href="http://example.com">example link</a>',
  '<ol><li>one</li><li>two</li><li>three</li></ol>',
  '<ol><li>one</li><li>two</li><li>three</li></ol>',
  '<pre>&lt;pre> escaped html &lt;/pre></pre>',
  '<div><foo>bar</foo></div>',
  '<a href="http://example.com/&quot;&lt;/a>&lt;script>alert(1)&lt;/script>">danger</a>',
  '<div class="content"><h1>hello world</h1></div>',
  '<div></div><span></span><section></section>'
]

var invalid = [
  ['<tag></tag>']
]

tape('inputs', function (t) {
  for(var i = 0; i < input.length; i++)
    t.equal(toHTML(input[i]), expected[i])
  t.end()
})

tape('throws is name is tag', function (t) {
  for(var i = 0; i < invalid.length; i++)
    t.throws(function () {
      console.log('invalid', invalid[i])
      toHTML(invalid[i])
    })
  t.end()
})
