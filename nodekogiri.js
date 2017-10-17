var libxmljs = require("libxmljs");
var cssToXPath = require('css-to-xpath');

class HTML{
  constructor(html){
    if(html !== undefined){
      this.doc = libxmljs.parseHtml(html);
      this.node = this.doc.root()
    }
  }
  at(css){
    return this.search(css)[0]
  }
  search(css){
    let xpath = this.xpath_for(css)
    return this.node.find(xpath).map(node => new Node(node))
  }
  text(){    
    return this.node.text()
  }
  attr(name){    
    return this.node.attr(name)
  }
  attrs(){    
    return this.node.attrs()
  }
  next(){ return new Node(this.node.nextSibling()) }
  previous(){ return new Node(this.node.previousSibling()) }
  xpath_for(css){
    let match
    if(css.match(/^[+~]/)) return cssToXPath('*' + css).replace(/^.\/\/\*/, '.')
    if(match = css.match(/:contains\((.*?)\)/)){
      css = css.replace(/:contains\(.*?\)/, '[z]')
      return cssToXPath(css).replace('[./@z]', '[contains(child::text(), "' + match[1].replace(/^['"]|['"]$/g,'') + '")]')
    }
    return cssToXPath(css)
  }
  html(){ return this.node.toString() }
  toString(){ return this.node.toString() }
}

class Node extends HTML{
  constructor(node){
    super()
    this.node = node
    if(this.node.attrs !== undefined){
      this.node.attrs().map( attr => this[attr.name()] = attr.value())
    }
  }
}

module.exports = {
  HTML : HTML,
  Node : Node
}

