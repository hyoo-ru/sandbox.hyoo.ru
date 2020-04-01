namespace $.$$ {
	export class $hyoo_sandbox_movable_demo extends $.$hyoo_sandbox_movable_demo {

		coordinates() {
			return `X: ${this.Box().pos_x()} Y: ${this.Box().pos_y()}`;
		}

		start(event: PointerEvent) {
			(this.dom_node() as HTMLElement).style.opacity = '1';
			return event;
		}

		done(event: PointerEvent) {
			(this.dom_node() as HTMLElement).style.opacity = '0.5';
			return event;
		}

	}
}
