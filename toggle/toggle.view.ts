namespace $.$$ {
	export class $hyoo_sandbox_toggle extends $.$hyoo_sandbox_toggle {

		@$mol_mem
		is_check(val?: any, force?: $mol_mem_force) {
			if (val) {
				(this.Right().dom_node() as HTMLElement).style.color = "";
				(this.Left().dom_node() as HTMLElement).style.color = "#ccc"
			} else {
				(this.Left().dom_node() as HTMLElement).style.color = "";
				(this.Right().dom_node() as HTMLElement).style.color = "#ccc"
			}
			return (val !== void 0) ? val : false
		}
		
		left_click(event: Event) {
			this.is_check(false);
		}
		right_click(event: Event) {
			this.is_check(true);
		}
	}
}
