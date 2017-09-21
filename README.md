# Transition Height

## Installation and use
Install into your project with `npm i @samsch/transition-height` (for Node.js), or `npm i -D @samsch/transition-height` (for Webpack/Browserify or other bundled projects).

To use TransitionHeight, it expects a `trigger` prop and children (or you can do a [Full collapse](#full-collapse) with `collapsed`), and can take an optional `transitionTimeSeconds` prop.

### Basic example
```jsx
const SomeComponent = props => (
  <TransitionHeight trigger={props.content}>
    {props.content}
  </TransitionHeight>
);
```
For any subsequent renders where props.content is not referentially the same, TransitionHeight will attach the current wrapper height to a wrapper div, allow the child to render, then set the wrapper div to the new height of the child (pulled from an inner wrapper div). The wrapper div has the height and transition css properties set via the style attribute.

By default, the transition time is .2 seconds. You can override this by passing a number (time in seconds) as `transitionTimeSeconds`.

### Array example
```jsx
const SomeComponent = props => (
  <ul>
    <TransitionHeight trigger={props.list}>
      {props.list.map(listItem => (
        <li>{listItem}</li>
      ))}
    </TransitionHeight>
  </ul>
);
```
In this example, for any new array in (or an immutable change to) `props.list`, the list will transition to the new required size.

## Full collapse

If you want to just toggle the animation from real height to completely closed (height: 0px), then you can use the `collapsed` prop. When it changes to true, the component will collapse wrapper to 0px tall. When it changes to false, the wrapper will transition from 0px to the height of the contents.

### Collapse example
```jsx
const SomeComponent = props => (
  <TransitionHeight collapsed={!props.open}>
    {props.content}
  </TransitionHeight>
);
```

You can use both `trigger` and `collapsed`, but attempting to transition both at the same time isn't currently supported (it *might* work).

## API

### default export TransitionHeight
- A React component.

### props.children
- A React node.

Because TransitionComponent wraps it's contents in two divs and doesn't rely on the children DOM directly, this can be anything which React can render.

### props.trigger
- Any

This prop is simply compared against it's previous reference as the decision to transition for a prop change or not. If your content is just a string, you can pass the string to this prop as well. Otherwise, you can pass any value which will change when your content changes height.

### props.transitionTimeSeconds
- Number [default: `.2`]

This is a numeric value in seconds which controls how long the transition takes.

### props.collapsed
- Boolean

The prop allows you to transition between 0px height and the content height without changing the contents (which are hidden with `overflowY: hidden`).

## ES support
This library is compiled with Babel to support IE11, last 3 Safari, and last 2 Chrome and Firefox. Publically, it expects ES6 methods/objects to exist (natively or polyfilled). Realistically, you could test it and find that it might work in a pure ES5 environment.

If a case is found which doesn't work in pure ES5 environments, and it doesn't require drastic changes or much uglier code, I'll pull those changes in.

## Getting help
You can frequently find me (samsch) hanging out in ##javascript, #Node.js, and #reactjs on Freenode, especially during US working hours. This is a small library, so it's likely someone else could help you as well if you point them at the source file and your code.

## Contributing
Code is formatted to the local prettier/eslint config.

Run tests once with `npm test`, or continuously with `npm test -- --watch`.

The projects builds with `npm run build`, which is also called on pre-publish.

## Random info

Currently, it does not use prop-types, and that eslint rule is disabled.

Children margins are not allowed to collapse out of the wrapper. This is handled by `overflow-x: auto` on the inner wrapper.
