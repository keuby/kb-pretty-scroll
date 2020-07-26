import { PrettyScroll } from '../core/pretty-scroll';
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options';
interface PrettyScrollHTMLElement extends HTMLElement {
    __scroll: PrettyScroll;
}
export declare class PrettyScrollDirective implements DirectiveOptions {
    inserted(el: PrettyScrollHTMLElement, binding: DirectiveBinding): void;
    update(el: PrettyScrollHTMLElement, binding: DirectiveBinding): void;
    componentUpdated(el: PrettyScrollHTMLElement): void;
    unbind(el: PrettyScrollHTMLElement): void;
}
export {};
