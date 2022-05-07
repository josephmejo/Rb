import Onyx, { Image as OnyxPreview } from './onyx';
import Pikachu, { Image as PikachuPreview } from './pikachu';
import Gengar, { Image as GengarPreview } from './gengar';
import Castform, { Image as CastformPreview } from './castform';
import Glalie, { Image as GlaliePreview } from './glalie';
import Celebi, { Image as CelebiPreview } from './celebi';
import Charizard, { Image as CharizardPreivew } from './charizard';
import Togepi, { Image as TogepiPreivew } from './togepi';
import Eevee, { Image as EeveePreview } from './eevee';

export default [
  {
    key: 'onyx',
    name: 'Onyx',
    component: Onyx,
    preview: OnyxPreview,
  },
  {
    key: 'charizard',
    name: 'Charizard',
    component: Charizard,
    preview: CharizardPreivew,
  },
  {
    key: 'pikachu',
    name: 'Pikachu',
    component: Pikachu,
    preview: PikachuPreview,
  },
  {
    key: 'gengar',
    name: 'Gengar',
    component: Gengar,
    preview: GengarPreview,
  },
  {
    key: 'castform',
    name: 'Castform',
    component: Castform,
    preview: CastformPreview,
  },
  {
    key: 'glalie',
    name: 'Glalie',
    component: Glalie,
    preview: GlaliePreview,
  },
  {
    key: 'celebi',
    name: 'Celebi',
    component: Celebi,
    preview: CelebiPreview,
  },
  {
    key: 'togepi',
    name: 'Togepi',
    component: Togepi,
    preview: TogepiPreivew,
  },
  {
    key: 'eevee',
    name: 'Eevee',
    component: Eevee,
    preview: EeveePreview,
  },
  // sort templates by name in alphabetic order
].sort((t1, t2) => (t1.name > t2.name ? 1 : -1));
