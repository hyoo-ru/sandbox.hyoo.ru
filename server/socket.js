const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const port = 9001;

const wss = new WebSocket.Server({ port: port });
function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function get_dir(_path) {
	return path.join(require.main.filename, '../../', `./page/${_path}`)
}

function write(_path, data) {
	fs.writeFileSync(get_dir(_path), data, 'utf-8')
}

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		const parsed = JSON.parse(message);
		if (parsed.tree) {
			let module = parsed.tree.trim().substr(0, parsed.tree.trim().indexOf(' '));
			let module_name = module.substr(module.lastIndexOf('_') + 1);
			if (module.indexOf('hyoo_sandbox_page') == -1) {
				module_name = makeid(6);
				const module_new = `$hyoo_sandbox_page`;
				parsed.tree = parsed.tree.replace(module, module_new);
				module = module_new;

			}
			if (!parsed.ts) {
				parsed.ts = '' //getTsTemplate(module);
			}
			if (!parsed.css) {
				parsed.css = '';
			}
			if (!fs.existsSync(get_dir(module_name))) {
				fs.mkdirSync(get_dir(module_name));
			}
			write(`${module_name}/${module_name}.view.tree`, parsed.tree);
			write(`${module_name}/${module_name}.view.ts`, parsed.ts);
			write(`${module_name}/${module_name}.view.css`, parsed.css);

			ws.send(JSON.stringify({ ...parsed, module: module_name }));
		}

	});

});
