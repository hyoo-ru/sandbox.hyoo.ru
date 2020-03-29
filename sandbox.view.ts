namespace $.$$ {
	export class $hyoo_sandbox extends $.$hyoo_sandbox {
		type = 'vertical';
		@$mol_mem
		size(val?: any, force?: $mol_mem_force) {
			return (val !== void 0) ? val : 0
		}
		@$mol_mem
		pos(val?: any, force?: $mol_mem_force) {
			const min = 100 * (40 / this.size());
			const max = 100 - min;
			val = (val !== void 0) ? val : 50;
			val = this.clamp(val, min, max);

			($hyoo_sandbox.Root(0).Input().dom_node() as HTMLElement).style.width = `${val}%`;
			($hyoo_sandbox.Root(0).Output().dom_node() as HTMLElement).style.width = `${100 - val}%`;
			return val
		}



		clamp(num: number, min: number, max: number) {
			return num < min ? min : num > max ? max : num;
		}
		setPos(event: MouseEvent) {
			const { top, left } = $hyoo_sandbox.Root(0).dom_node().getBoundingClientRect();
			const px = this.type === 'vertical'
				? (event.clientY - top)
				: (event.clientX - left);
			$hyoo_sandbox.Root(0).pos(100 * px / $hyoo_sandbox.Root(0).size($hyoo_sandbox.Root(0).dom_node().clientWidth));
		}
		render() {
			this.drag(this.Divider().dom_node() as HTMLElement, this.setPos)
			super.render()
		}

		@$mol_mem
		Book(pages?: any) {
			return ((obj) => {
				obj.Placeholder = () => null as any
				obj.event_front_up = (val?: any) => this.event_front_up(val)
				obj.event_front_down = (val?: any) => this.event_front_down(val)
				obj.pages = () => this.prepare_Pages(obj.width()) as readonly any[]
				return obj
			})(new this.$.$mol_book())
		}

		prepare_Pages(obj?: any) {
			if (obj <= 768) {
				(this.Mobile().dom_node() as HTMLElement).style.display = 'grid';
				if (this.Mobile().is_check()) {
					return [this.Output()]
				} else {
					this.Output().dom_node().setAttribute('mol_book_page_visible', 'true')
					this.Input().dom_node().removeAttribute('mol_book_page_visible')
					return [this.Input()]
				}
			} else {
				(this.Mobile().dom_node() as HTMLElement).style.display = 'none';
			}
			return [this.Input(), this.Divider(), this.Output()]
		}


		drag(node: HTMLElement, callback: any) {
			const mousedown = (event: MouseEvent) => {
				if (event.which !== 1) return;
				event.preventDefault();
				const onmouseup = () => {
					window.removeEventListener('mousemove', callback, false);
					window.removeEventListener('mouseup', onmouseup, false);
					this.Frame().dom_node().style.display = 'block'
				};
				this.Frame().dom_node().style.display = 'none'

				window.addEventListener('mousemove', callback, false);
				window.addEventListener('mouseup', onmouseup, false);
			}
			node.addEventListener('mousedown', mousedown, false);
			return {
				destroy() {
					node.removeEventListener('mousedown', onmousedown, false);
				}
			};
		}
	}


}
