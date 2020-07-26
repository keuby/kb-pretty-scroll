import PerfectScrollbar from 'perfect-scrollbar';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { override, merge } from '../shared/tools';

export class PrettyScroll {
  static defaultConfig = {};

  static setDefaultConfig(config: Partial<PerfectScrollbar.Options>) {
    this.defaultConfig = override(this.defaultConfig, config);
  }

  private started = false;

  private selector: string;

  private root: HTMLElement;

  private container: HTMLElement;

  private scroll: PerfectScrollbar;

  private subscription: Subscription;

  private config: Partial<any> = {};

  constructor(root: HTMLElement | string, config: Partial<any> = {}) {
    if (root instanceof HTMLElement) {
      this.root = root;
    } else {
      this.root = document.querySelector(root);
    }

    this.config = { ...config };
  }

  start(selector?: string) {
    if (selector !== undefined) {
      this.selector = selector;
    }

    if (this.started) this.stop();

    this.container = this.getContainer(selector);

    if (this.container != null) {
      const config = merge(PrettyScroll.defaultConfig, this.config);
      this.scroll = new PerfectScrollbar(this.container, config);
      this.subscription = fromEvent(window, 'resize')
        // .pipe(debounceTime(300))
        .subscribe(() => {
          this.scroll.update();
        });
    }

    this.started = true;
  }

  update() {
    if (!this.started) return;
    this.scroll == null && this.start();
    this.scroll && this.scroll.update();
  }

  stop() {
    if (this.scroll != null) {
      this.scroll.destroy();
      this.scroll = null;
    }
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.container = null;
    this.started = false;
  }

  setConfig(config: Object) {
    this.config = override(this.config, config);
  }

  private getContainer(selector: string = this.selector) {
    if (selector == null) {
      return this.root;
    } else if (selector === 'parent') {
      return this.root.parentElement;
    } else {
      return this.root.querySelector(selector) as HTMLElement;
    }
  }
}
