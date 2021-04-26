# COMPONENTS

The components directory contains your Vue.js Components.

---

## Component: Card

```sh
Description: A card with an image and a structured description
Props:
├── image: card image path (headign prop is used as alt attribute)
├── icon: the icon to be shown (optional)
├── heading: main heading of the card
├── destination-link: destination link of the heading and image (optional)
├── subheading: subheading of the card
├── subheading-icon: icon to be shown before the subheading (optional)
├── subheading-link: link of the subheading (optional)
├── label: additional label of the card (optional)
└── summary: short paragraph to be shown inside the card (optional)
```

---

## Component: Grid

```sh
Description: A grid of cards
Props:
├── featured-element: featured card component props
└── elements: array of card component props
```

---

## Component: Button

```sh
Description: A general purpose button with an optional icon
Props:
├── label: the button label
├── icon: the icon to be shown (optional)
└── hover-flag: substitute the icon with the outline version on mouse hover. True by default.
```

---

## Component: Paragraph

```sh
Description: A general purpose paragraph with an (optional) image
Named slots:
└── default slot: paragraph`s text
Props:
├── image: image for the paragraphs (optional)
├── image-cap: alt attribute of the image for SEO purposes (optional)
└── postion: position of the paragraph`s text. Either `right` or `left`. Right by default (optional)
```

---

## Component: TheFooter

```sh
Description: Footer of the website with company icon and social icons
```

---

## Component: TheHeader

```sh
Description: Header of the website with company logo and responsive navbar
```
