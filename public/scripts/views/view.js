class View {
  constructor() {
    if (this.constructor.hasOwnProperty('$element')) {
      this.$element = this.constructor.$element;
    } else if (this.constructor.hasOwnProperty('element')) {
      this.$element = $(this.constructor.element);
    } else if (this.constructor.hasOwnProperty('$template')){
      this.$element = this.constructor.$template.clone();
    } else if (this.constructor.hasOwnProperty('template')) {
      this.$element = $(this.constructor.template);
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

  render() {
    return this;
  }
}
