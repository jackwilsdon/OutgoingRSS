class View {
  constructor() {
    if (this.constructor.hasOwnProperty('$element')) {
      this.$element = this.constructor.$element;
    } else if (this.constructor.hasOwnProperty('element')) {
      this.$element = $(this.constructor.element);
    } else {
      this.$element = this.$template();
    }

    this.element = this.$element.get(0);
  }

  listen(events) {
    for (const key in events) {
      const [ _all, name, selector ] = key.match(/^(\S+)\s*(.*)$/),
            callback = typeof(events[key]) === 'function' ?
              events[key] : this[events[key]].bind(this);

      this.$element.on(name, selector, callback);
    }
  }

  $template() {
    return $(this.constructor.template);
  }

  template() {
    return this.$template().get(0);
  }

  render() {
    return this;
  }
}
