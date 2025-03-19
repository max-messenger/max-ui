export class BackButton {
    private visible = false;
    private postBackButtonEvent;
    public onClick;
    public offClick;

    get isVisible() {
        return this.visible;
    }
    constructor({
        postBackButtonEvent,
        onClick,
        offClick,
    }: {
        postBackButtonEvent: (isVisible: boolean) => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
    }) {
        this.postBackButtonEvent = postBackButtonEvent;
        this.onClick = onClick;
        this.offClick = offClick;
    }

    public show() {
        this.visible = true;
        this.postBackButtonEvent(true);
    }

    public hide() {
        this.visible = false;
        this.postBackButtonEvent(false);
    }
}
