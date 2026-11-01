interface ContactLink {
	label: string;
	href: string;
}

export const getWebsiteContact = (value: string): ContactLink => {
	const href = /^https?:\/\//i.test(value) ? value : `https://${value}`;
	try {
		return { label: new URL(href).hostname, href };
	} catch {
		return { label: value, href };
	}
};

export const getToneContact = (value: string): ContactLink | null => {
	try {
		const url = new URL(value);
		const deepLink = url.protocol === 'tone:';
		if (!deepLink && (url.protocol !== 'https:' || url.hostname !== 'tone.onl')) return null;
		const type = deepLink ? url.hostname : url.pathname.split('/')[1];
		if (!['user', 'group', 'channel'].includes(type)) return null;
		const handle = decodeURIComponent(deepLink ? url.pathname.slice(1) : url.hash.slice(1));
		if (!handle) return null;
		const display = handle.startsWith('@')
			? handle
			: !deepLink || /^[a-f0-9]{8,}$/i.test(handle)
				? `${handle.slice(0, 4)}-${handle.slice(-4)}`.toUpperCase()
				: `@${handle}`;
		return { label: `${type[0].toUpperCase()}${type.slice(1)}: ${display}`, href: value };
	} catch {
		return null;
	}
};

export const getWhatsappContact = (value: string): ContactLink => {
	const isLink = /^(?:https?:\/\/|whatsapp:)/i.test(value);
	if (isLink) {
		try {
			const url = new URL(value);
			const phone = url.searchParams.get('phone') || (url.hostname === 'wa.me' ? url.pathname.slice(1) : '');
			return { label: phone ? `+${phone.replace(/\D/g, '')}` : value, href: value };
		} catch {
			return { label: value, href: value };
		}
	}
	return { label: value, href: `https://wa.me/${value.replace(/\D/g, '')}` };
};
