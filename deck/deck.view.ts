namespace $.$$ {
	export class $hyoo_sandbox_deck extends $.$hyoo_sandbox_deck {
		
		current( next? : string ) {
			return $mol_state_session.value( `${ this }.current()` , next ) || '0'
		}
		
		switch_options() {
			let options : Record< string , string > = {}
			this.items().forEach( ( item , index ) => {
				options[ String( index ) ] = item.title
			} )
			return options
		}
		
		@ $mol_mem
		Content() {
			return this.items()[ this.current() ].Content
		}
		
	}
}
