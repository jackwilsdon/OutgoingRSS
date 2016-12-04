/**
 * A renderable object.
 *
 * <p>
 *   Properties must be set on the subclass constructor for them to function
 *   as expected:
 * </p>
 *
 * <pre><code>class MyView extends View {}
 * MyView.template = <blink>Hello!</blink>';</code></pre>
 *
 * @property {jQuery} $element the jQuery element for {@link View#$element} and
 *                             {@link View#element}
 * @property {Element} element the element for {@link View#$element} and
 *                             {@link View#element}
 * @property {jQuery} $template the jQuery template to store in
 *                              {@link View#$element} and {@link View#element}
 * @property {Element} template the template to store in {@link View#$element}
 *                              and {@link View#element}
 *
 * @constructor
 */
function View() {
  if (this.constructor.hasOwnProperty('$element')) {
    this.$element = this.constructor.$element;
  } else if (this.constructor.hasOwnProperty('element')) {
    this.$element = $(this.constructor.element);
  } else if (this.constructor.hasOwnProperty('$template')){
    this.$element = this.constructor.$template.clone();
  } else if (this.constructor.hasOwnProperty('template')) {
    this.$element = $(this.constructor.template);
  } else {
    this.$element = $('<div></div>');
  }

  this.element = this.$element.get(0);
}

/**
 * The jQuery element for the view.
 *
 * @member {jQuery} $element
 * @memberof View
 * @instance
 */

/**
 * The element for the view.
 *
 * @member {Element} element
 * @memberof View
 * @instance
 */

/**
 * Registers the provided event listeners and callbacks on the view.
 *
 * <p>
 *   The key of each event data entry must be in the form of
 *   <code>'&lt;eventName&gt; &lt;selector...&gt;'</code>. If no selector is
 *   provided then the the event is attached to the view's element directly.
 * </p>
 *
 * The value of each event data entry can be either the name of an instance
 * method of the view or a callback function.
 *
 * @param {Object} events the event data to register
 * @returns {undefined}
 */
View.prototype.listen = function(events) {
  for (var key in events) {
    // Split up the event name into it's event and selector.
    var matches = key.match(/^(\S+)\s*(.*)$/),
        name = matches[1],
        selector = matches[2],
        value = events[key],
        callback = typeof(value) === 'string' ? this[value] : value;

    // Use jQuery's event delegation to register the event.
    this.$element.on(name, selector, callback.bind(this));
  }
};

/**
 * Renders the view to it's element.
 *
 * @returns {View} the current view for chaining calls
 */
View.prototype.render = function() {
  return this;
};
