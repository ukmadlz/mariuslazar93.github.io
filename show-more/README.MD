# Show more/less plugin

Small JavaScript plugin to use whenever you need the functionality of showing more/less items inside a container.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* jQuery > 1.4.3

### Usage

1. Add jQuery to your page/project.

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
```

2. Add the "_view-more.js" file to the page/project.

```
<script src="js/_view-more.js"></script>
```

3. The items that need to be shown/hidden and the `view-less` button should be initially hidden from css.

```css
.view-more-element, .view-less{
	display: none;
}
```

4. Initialize the plugin.

```javascript
var initViewMoreComponent = new ViewMoreComponent();
```

## Configuration

The plugin has some useful options:

* `component` - the class selector of the parent container
* `elements` - the class selector of the blocks that need to be shown/hidden which have to be placed inside parent container
* `moreBtn` and `lessBtn` - the class selector of the `view more` and `view less` buttons which have to be placed inside the parent container
* `mobile`, `tablet`, `desktop`
  * `breakpoint` - specify where the breakpoint start (exclusive)
  * `elementsToLoad` - specify how many elements to show/hide at current breakpoint when you press the more/less button
  * `initialVisibleElements` - specify how many blocks are visible when the plugin is initialized

### Default configuration

When you don't specify any options at initialization, the default configuration is applied.

```javascript
var defaults = {
            component: '.view-more-component',
            elements: '.view-more-element',
            moreBtn: '.view-more',
            lessBtn: '.view-less',
            mobile: {
                breakpoint: 768,
                elementsToLoad: 1,
                initialVisibleElements: 1
            },
            tablet: {
                breakpoint: 992,
                elementsToLoad: 2,
                initialVisibleElements: 2
            },
            desktop: {
                elementsToLoad: 3,
                initialVisibleElements: 3
            }
        };
```

### Changing the defaults

You can specify your own configuration which will override the default one when you initialize the plugin.

```javascript
var options = {
            component: '.container',
            elements: '.element',
            moreBtn: '.more',
            lessBtn: '.less',
            mobile: {
                breakpoint: 554,
                elementsToLoad: 1,
                initialVisibleElements: 1
            },
            tablet: {
                breakpoint: 1024,
                elementsToLoad: 2,
                initialVisibleElements: 4
            },
            desktop: {
                elementsToLoad: 2,
                initialVisibleElements: 4
            }
        };
        
var initViewMoreComponent = new ViewMoreComponent(options);
        
```

## Example

Clone or download this repo locally and open index.html inside a browser. 

**_Please use a modern browser because the current example uses flexbox for the minimal page styling._**

## Next steps

* Strong testing with differents configurations
* Replacing jQuery slideDown and slideUp functions with CSS transitions
* Complete replace of jQuery with vanilla JavaScript
* More configuration

## Authors

* **Marius Lazar**

## License

This project is licensed under the MIT License

