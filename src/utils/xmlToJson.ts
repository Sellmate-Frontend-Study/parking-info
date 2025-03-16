export function xmlToJson(xml) {
	let obj = {};
	if (xml.nodeType === 1) {
		// 요소 노드
		if (xml.attributes.length > 0) {
			obj['@attributes'] = {};
			for (let i = 0; i < xml.attributes.length; i++) {
				let attr = xml.attributes.item(i);
				obj['@attributes'][attr.nodeName] = attr.nodeValue;
			}
		}
	} else if (xml.nodeType === 3) {
		// 텍스트 노드
		return xml.nodeValue.trim();
	}

	if (xml.hasChildNodes()) {
		for (let i = 0; i < xml.childNodes.length; i++) {
			let item = xml.childNodes.item(i);
			let nodeName = item.nodeName;
			let jsonValue = xmlToJson(item);

			if (typeof jsonValue === 'string' && jsonValue === '') continue;

			if (obj[nodeName] === undefined) {
				obj[nodeName] = jsonValue;
			} else {
				if (!Array.isArray(obj[nodeName])) {
					obj[nodeName] = [obj[nodeName]];
				}
				obj[nodeName].push(jsonValue);
			}
		}
	}
	return obj;
}
