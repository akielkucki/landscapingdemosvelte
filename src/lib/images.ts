/**
 * Resolves photo filenames from the content file to bundled URLs.
 *
 * Put web-ready photos in `src/lib/assets/site/` (sub-folders are fine) and
 * point an image's `file` at the filename, or at `team/name.webp` for files in
 * a sub-folder, in `src/lib/content/site.ts`. Anything that can't be found
 * renders as a labelled placeholder instead of a broken image.
 *
 * Only `site/` is bundled. `rds-assets/` holds the full-size originals the
 * web versions were made from, so they don't ship with the site.
 */
const files = import.meta.glob<string>('./assets/site/**/*.{jpg,jpeg,png,webp,avif,svg}', {
	eager: true,
	query: '?url',
	import: 'default'
});

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
	const relative = path.replace('./assets/site/', '').toLowerCase();
	byName.set(relative, url);
	if (!byName.has(relative.split('/').pop()!)) byName.set(relative.split('/').pop()!, url);
}

export function imageUrl(file: string | undefined): string | undefined {
	if (!file) return undefined;
	return byName.get(file.toLowerCase());
}
