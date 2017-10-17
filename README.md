# nodekogiri
This class is a wrapper to xmllibjs that acts like Nokogiri

## Install

```
npm install nodekogiri
```
## Usage
```
const { HTML } = require('nodekogiri')

let html = `
<div class="foo">My List</div>
<ul>
  <li>aaa</li>
  hi
  <li>bbb</li>
  <li>ccc</li>
</ul>
<div>xxx</div>
`
let doc = new HTML(html)

let data = doc.search('.foo').map(div => {
   return {
     title: div.text(),
     list: div.search('+ ul li').map(li => li.text())
   }
})

console.log(data)
```
It's only for extraction at this point (no DOM manipulation) and it can do some things that cheerio can't do (like the above example). It also performs a bit better than cheerio.
```
data = doc.search('.foo').map(div => {
```