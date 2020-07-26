import { looseEqual } from '../shared/tools';
import { PrettyScroll } from '../core/pretty-scroll';
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options';

interface PrettyScrollHTMLElement extends HTMLElement {
  __scroll: PrettyScroll;
}

export class PrettyScrollDirective implements DirectiveOptions {
  inserted(el: PrettyScrollHTMLElement, binding: DirectiveBinding) {
    const { selector, ...config } = binding.value || {};
    const scroll = (el.__scroll = new PrettyScroll(el, config));
    scroll.start(selector);
  }

  update(el: PrettyScrollHTMLElement, binding: DirectiveBinding) {
    const selector = binding.value;
    const oldSelctor = binding.oldValue;
    if (!looseEqual(selector, oldSelctor)) {
      const { selector, ...config } = binding.value || {};
      el.__scroll.setConfig(config);
      el.__scroll.start(selector);
    }
  }

  componentUpdated(el: PrettyScrollHTMLElement) {
    el.__scroll && el.__scroll.update();
  }

  unbind(el: PrettyScrollHTMLElement) {
    const scroll = el.__scroll;
    scroll && scroll.stop();
    el.__scroll = null;
  }
}
