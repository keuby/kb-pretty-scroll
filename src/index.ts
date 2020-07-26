import PerfectScrollbar from 'perfect-scrollbar';
import { PrettyScroll } from './core/pretty-scroll';
import { PrettyScrollDirective } from './directives/pretty-scroll';
import { PrettyScrollContainer } from './components/pretty-scroll';

function install(Vue: any, options: Partial<PerfectScrollbar.Options> = {}) {
  PrettyScroll.setDefaultConfig(options);
  Vue.directive('pretty-scroll', new PrettyScrollDirective());
  Vue.component('KbPrettyScroll', PrettyScrollContainer);
}

export default {
  install,
};
