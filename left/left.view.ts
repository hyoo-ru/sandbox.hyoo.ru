namespace $.$$ {

	export class $hyoo_sandbox_left extends $.$hyoo_sandbox_left {
		host = `http://${location.hostname}:9080`
		// host = `https://${location.hostname}`
		ws = `ws://${location.hostname}:9001`
		// ws = `wss://${location.hostname}/ws`
		socket = new WebSocket(this.ws)
		is_auto_save = false;

		@$mol_mem
		connection() {
			var self = this;
			this.socket.onclose = function () {
				setTimeout(() => self.socket = new WebSocket(self.ws), 5000)
			}
			this.socket.onmessage = (event: any) => {
				const parsed = JSON.parse(event.data)
				if (!parsed.tree) {
					this.$.$mol_state_arg.value('tree_source', parsed.tree);
					this.$.$mol_state_arg.value('ts_source', parsed.ts);
					this.$.$mol_state_arg.value('css_source', parsed.css);
					this.$.$mol_state_arg.value('meta_source', parsed.meta);
				}
			}

			this.sending_source.tree = this.$.$mol_state_arg.dict()['tree_source'];
			this.sending_source.ts = this.$.$mol_state_arg.dict()['ts_source'];
			this.sending_source.css = this.$.$mol_state_arg.dict()['css_source'];
			this.sending_source.meta = this.$.$mol_state_arg.dict()['meta_source'];

			if (this.handle_checked() && this.is_auto_save) {
				this.auto_save();
			}
			setTimeout(() => {
				this.send_source();
			}, 1000);

			return {
				destructor: () => {
					// this.socket.close()
				}
			}
		}

		send_source() {
			if (!this.$.$mol_state_arg.dict()['tree_source']) {
				this.sending_source.tree = `$my_page $mol_view\n\tsub /\n\t\t\\ hello world`
				this.$.$mol_state_arg.value('tree_source', `$my_page $mol_view\n\tsub /\n\t\t\\ hello world`);
			}
			if (
				(this.current_source.tree !== this.sending_source.tree ||
					this.current_source.css != this.sending_source.css ||
					this.current_source.meta != this.sending_source.meta ||
					this.current_source.ts != this.sending_source.ts)
				&& new Date().getTime() - this.typing > 1500) {
				this.current_source = Object.assign({}, this.sending_source);

				if (this.socket.readyState === this.socket.OPEN) {
					this.socket.send(JSON.stringify(this.sending_source));
					// const frame = $hyoo_sandbox.Root(0).App().Spinner().dom_node() as HTMLElement;
					// frame.style.display = ""
				}
			}
		}
		render() {
			this.connection();
			super.render();
		}
		ctrl_s_press(event: KeyboardEvent) {
			if (event.ctrlKey || event.metaKey) {
				switch (String.fromCharCode(event.which).toLowerCase()) {
					case 's':
						event.preventDefault();
						this.send_source();
						break;
				}
			}

		}
		handle_click(event: any) {
			this.send_source();
		}
		@$mol_mem
		handle_checked(val?: any, force?: $mol_mem_force) {
			if (val ) {
				this.auto_save()
			} else {
				this.stop_auto_save()
			}
			return (val !== void 0) ? val : false
		}

		button_visibility(is_visible = true) {
			const button = this.Button().Button().dom_node() as HTMLElement;
			button.style.visibility = is_visible ? "" : "hidden";
		}

		auto_save_service: any
		auto_save(next?: any, force?: $mol_mem_force) {
			this.button_visibility(false);
			this.auto_save_service = setInterval(() => {
				this.send_source();
			}, 1000)
		}

		stop_auto_save() {
			this.button_visibility();
			this.is_auto_save = false;
			clearInterval(this.auto_save_service);
		}

		@$mol_mem
		outbox(next?: { tree: string, css: string, ts: string }, ) {
			if (this.socket.readyState === this.socket.OPEN)
				this.socket.send(JSON.stringify(next))
			return next
		}
		typing = new Date().getTime();
		sending_source = { tree: '', ts: '', css: '', meta: '' };
		current_source = { tree: '', ts: '', css: '', meta: '' };;

		tree_source(next?: string) {
			let source = this.$.$mol_state_arg.value('tree_source', next)
			this.typing = new Date().getTime();
			this.sending_source.tree = source;
			return source || ''
		}
		css_source(next?: string) {
			let source = this.$.$mol_state_arg.value('css_source', next)
			this.typing = new Date().getTime();
			this.sending_source.css = source;
			return source || ''
		}
		meta_source(next?: string) {
			let source = this.$.$mol_state_arg.value('meta_source', next)
			this.typing = new Date().getTime();
			this.sending_source.css = source;
			return source || ''
		}
		ts_source(next?: string) {
			let source = this.$.$mol_state_arg.value('ts_source', next)
			this.typing = new Date().getTime();
			this.sending_source.ts = source;
			return source || ''
		}
	}

}
