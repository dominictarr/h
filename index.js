var escape = require('html-escape')
var cssesc = require('cssesc')

function isString(s) {
  return 'string' === typeof s
}

var rx_tagname = /^[a-zA-Z]+(?:[\-a-zA-Z0-9])*$/
var rx_tagname = /^[a-zA-Z]+(?:[\-a-zA-Z0-9])*$/
var rx_tagname_with_class = /^[a-zA-Z]+(?:[\-a-zA-Z0-9])*([\.#][^\s#.]+)+$/

function isName(t) {
  return isString(t) && rx_tagname.test(t)
}

function isNameWithClass (n) {
  return isString(n) && rx_tagname_with_class.test(n)
}

var isArray = Array.isArray

function isObject (o) {
  return o && 'object' == typeof o && !isArray(o)
}

module.exports = function toHTML (ary) {
  if(isString(ary)) return escape(ary)
  var str = '', innerHTML
  if(isArray(ary) && ary.every(isArray)) {
    return ary.map(toHTML).join('')
  }
  if(isArray(ary)) {
    var i = 1, tag, attrs, innerHTML
    if(isName(ary[0]))
      var tag = ary[0]
    else if(isNameWithClass(ary[0])) {
      var parts = ary[0].split(/([\.#])/g)
      var tag = parts.shift()
      var id = '', _class = ''
      for(var j = 0; j < parts.length; j+=2)
        if(parts[j] === '.')
          _class = (_class +' '+cssesc(parts[j+1], {isIdentifier: true})).trim()
        else if(parts[j] === '#')
          id = cssesc(parts[j+1], {isIdentifier: true})
    }
    else
      throw new Error('expected tag name, got:'+ary[0])

    if(isObject(ary[1])) {
      attrs = ary[1]
      if(attrs.className) {
        _class = attrs.className
        delete attrs.className
      }
      i = 2
    }
    str = '<'+tag

    if(_class) str += ' class="'+_class+'"'
    if(id) str += ' id="'+id+'"'

    console.log("ARY", isObject(ary[1]), ary, attrs, innerHTML)
    if(!attrs) str += '>'
    else if(attrs.innerHTML) {
      str +='>'
      innerHTML = attrs.innerHTML
      delete attrs.innerHTML
    }
    else {
      for(var k in attrs) {
        if(!isName(k)) throw new Error('attribute key not a name:'+k)
        if(attrs[k] === true)
          str += ' ' + k
        else if(attrs[k] != null)
          str += ' ' + k + '="' + escape(attrs[k]) + '"'
      }
      str += '>'
    }
    if(innerHTML)
      str += innerHTML //CAUTION: explicitly not escaped.
    else
      for(;i < ary.length; i++) {
        if(isArray(ary[i]) && isArray(ary[i][0]))
          str += ary[i].map(toHTML).join('')
        else
          str += toHTML(ary[i])
      }
    str += '</'+tag+'>'
    return str
  }
  else return ''
}
