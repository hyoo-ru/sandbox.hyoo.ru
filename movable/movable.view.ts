namespace $.$$ {
	export class $hyoo_sandbox_movable extends $.$hyoo_sandbox_movable {
		@$mol_mem
		pos_y(val?: number): number {
			return (val !== void 0) ? val : NaN;
		}
		@$mol_mem
		pos_x(val?: number): number {
			return (val !== void 0) ? val : NaN;
		}

		@$mol_mem
		pointer(point?: any) {
			return point
		}
		move(node: HTMLElement, callback = (event: PointerEvent) => {
			this.pos_x(event.clientX)
			this.pos_y(event.clientY)
		}) {
			const pointerdown = (event: PointerEvent) => {
				const onpointerup = (_event: PointerEvent) => {

					window.removeEventListener('pointermove', callback, false);
					window.removeEventListener('pointerup', onpointerup, false);
					window.removeEventListener('pointercancel', onpointerup, false);

					this.done(_event)
				};

				this.start(event)

				window.addEventListener('pointermove', callback, false);
				window.addEventListener('pointerup', onpointerup, false);
				window.addEventListener('pointercancel', onpointerup, false);
			}

			node.addEventListener('pointerdown', pointerdown, false);

			return {
				destroy() {
					node.removeEventListener('pointerdown', onpointerdown, false);
				}
			};
		}

		dom_node_actual() {
			this.move(this.dom_node() as HTMLElement)
			return super.dom_node_actual();
		}

	}
}
