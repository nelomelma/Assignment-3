What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
=
getElementById() is used to select a single element by its unique ID
getElementsByClassName → multiple elements by class
querySelector() selects the first element that matches a CSS selector
querySelectorAll- all matching elements


How do you create and insert a new element into the DOM?
=
To create and insert a new element into the DOM, we follow three steps.
First, create the element using document.createElement().
Then add content or attributes to the element, such as text or a class name.
After that, insert the element into the webpage using methods like appendChild() or append().

What is Event Bubbling? And how does it work?
=
Event bubbling is the process by which an event starts from the target element and then moves upward through its parent elements. 
Event bubbling is the process where an event starts from the target element and then moves upward through its parent elements.

What is Event Delegation in JavaScript? Why is it useful?
=
Event delegation is a technique where we attach an event listener to a parent element instead of attaching 
it to multiple child elements. Because of event bubbling, the parent can detect events that happen on its children.
This is useful because it reduces the number of event listeners, improves performance, and also works for dynamically created elements.

What is the difference between preventDefault() and stopPropagation() methods?
= 
preventDefault - stops default browser action
stopPropagation - stops the event from bubbling to the parent elements

