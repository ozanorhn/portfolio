import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * Router-URLs mit Schrägstrich am Ende, so wie der Server sie ausliefert (siehe seiteUrl).
 * Ohne ihn zeigen alle routerLinks auf /pfad, das Apache per 301 auf /pfad/ umleitet.
 */
export class SchraegstrichSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    const url = super.serialize(tree);
    const ende = url.search(/[?#]/);
    const pfad = ende === -1 ? url : url.slice(0, ende);
    const rest = ende === -1 ? '' : url.slice(ende);
    // Dateien wie /llms.txt bleiben, wie sie sind
    if (pfad.endsWith('/') || /\.[a-z0-9]+$/i.test(pfad)) return url;
    return `${pfad}/${rest}`;
  }
}
