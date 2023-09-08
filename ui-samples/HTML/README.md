# HTML FUNDAMENTALS

## Anatomy of an HTML element
---
- **The opening tag**: This consists of the name of the element (in this case, p), wrapped in opening and closing angle brackets. This states where the element begins or starts to take effect — in this case where the paragraph begins.
- **The closing tag**: This is the same as the opening tag, except that it includes a forward slash before the element name. This states where the element ends — in this case where the paragraph ends. Failing to add a closing tag is one of the standard beginner errors and can lead to strange results.
- **The content**: This is the content of the element, which in this case, is just text.
- **The element**: The opening tag, the closing tag, and the content together comprise the element.
- **Attributes** contain extra information about the element that you do not want to appear in the actual content. Here, class is the attribute name and editor-note is the attribute value. The class attribute allows you to give the element a non-unique identifier that can be used to target it (and any other elements with the same class value) with style information and other things. Some attributes have no value, such as required.

```html
<p class='grumpy-css-class'>My cat is very grumpy</p>
```

## HTML document structure
---

- **Header - `<header>`** - Usually, a big strip across the top with a big heading, logo, and perhaps a tagline. This usually stays the same from one webpage to another.
- **Navigation bar - `<nav>`** - Links to the site's main sections; usually represented by menu buttons, links, or tabs. Like the header, this content usually remains consistent from one webpage to another — having inconsistent navigation on your website will just lead to confused, frustrated users.
- **Main content - `<main>`** - A big area in the center that contains most of the unique content of a given webpage, for example, the video you want to watch, or the main story you're reading, or the map you want to view, or the news headlines, etc. This is the one part of the website that definitely will vary from page to page.
- **Sidebar - `<aside>`** - Some peripheral info, links, quotes, ads, etc. Usually, this is contextual to what is contained in the main content (for example on a news article page, the sidebar might contain the author's bio, or links to related articles) but there are also cases where you'll find some recurring elements like a secondary navigation system.
- **Footer - `<footer>`** - A strip across the bottom of the page that generally contains fine print, copyright notices, or contact info. It's a place to put common information (like the header) but usually, that information is not critical or secondary to the website itself. The footer is also sometimes used for SEO purposes, by providing links for quick access to popular content.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head> ... </head>

  <body>
    <header> ... </header>
    <nav> ... </nav>
    <main>
        ...
      <aside>  ... </aside>
    </main>

    <footer> ... </footer>
  </body>
</html>

```

## Text elements
---

**Heading elements**:
- Heading information can be used by user agents to construct a table of contents for a document automatically.
- Do not use heading elements to resize text. Instead, use the CSS font-size property.
- Do not skip heading levels: always start from `<h1>`, followed by `<h2>` and so on.
- While using multiple `<h1>` elements on one page is allowed by the HTML standard (as long as they are not nested), this is not considered a best practice. A page should generally have a single `<h1>` element that describes the content of the page (similar to the document's `<title>` element).
- Nesting multiple `<h1>` elements in nested sectioning elements was allowed in older versions of the HTML standard. However, this was never considered a best practice and is now non-conforming.


**Bold/Italic elements**:
- When bolding text, it’s considered a best practice to use the `<strong>` tag. This is because it is a semantic element, whereas `<b>` is not. Non-semantic elements are worse for accessibility and can make content localization and future-proofing difficult. Additionally, if the text bolding is purely stylistic, it’s better to use CSS and keep all page styling separate from the content.
- Like `<strong>` and `<b>`, the `<em>` tag is generally preferred over the `<i>` tag as it is a semantic element.


**Hyperlinks**

A basic link is created by wrapping the text or other content inside an `<a>` element and using the href attribute, also known as a Hypertext Reference, or target, that contains the web address.

Type of hyperlinks:
- **Block-level links** - Almost any content can be made into a link, even block-level elements. If we want to make a heading element a link, then we need to wrap it in an anchor (`<a>`).

```html
<a href="https://www.endava.com/en/" target="”_blank”">
  <h5>Endava Website</h5>
</a>
```

- **Image links** - If we have an image we want to make into a link, we will use the `<a>` element to wrap the image file referenced with the `<img>` element.

```html
<a href="https://www.endava.com/en/" target="”_blank”">
  <img src="images/EndavaLogo.png" alt="Endava homepage" />
</a>
```

- **Document fragments** - It is possible to link to a specific part of an HTML document, known as a document fragment, rather than just to the top of the document. To do this we first have to assign an id attribute to the element we want to link to. It normally makes sense to link to a specific heading.
Then to link to that specific id, we include it at the end of the URL, preceded by a hash/pound symbol (#). We can even use the document fragment reference on its own to link to another part of the current document

```html
<p>
  Want to see the first paragraph?
  <a href="html-elements.html#first-paragraph">Document fragment</a>.
</p>
```