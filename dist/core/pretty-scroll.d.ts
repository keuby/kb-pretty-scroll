import PerfectScrollbar from 'perfect-scrollbar';
export declare class PrettyScroll {
    static defaultConfig: {};
    static setDefaultConfig(config: Partial<PerfectScrollbar.Options>): void;
    private started;
    private selector;
    private root;
    private container;
    private scroll;
    private subscription;
    private config;
    constructor(root: HTMLElement | string, config?: Partial<any>);
    start(selector?: string): void;
    update(): void;
    stop(): void;
    setConfig(config: Object): void;
    private getContainer;
}
