namespace $.$$ {
	export class $hyoo_sandbox extends $.$hyoo_sandbox {

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
					return [this.Input()]
				}
			} else {
				(this.Mobile().dom_node() as HTMLElement).style.display = 'none';
			}
			return [this.Input(), this.Divider(), this.Output()]
		}

		start() {
			this.Frame().dom_node().style.pointerEvents = 'none'
		}
		done() {
			this.Frame().dom_node().style.pointerEvents = 'auto'
		}

	}


}
