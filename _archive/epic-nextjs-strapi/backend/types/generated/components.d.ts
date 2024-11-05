import type { Attribute, Schema } from '@strapi/strapi';

export interface AtomsLink extends Schema.Component {
  collectionName: 'components_atoms_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    url: Attribute.String;
  };
}

export interface LayoutsFeaturesSection extends Schema.Component {
  collectionName: 'components_layouts_features_sections';
  info: {
    description: '';
    displayName: 'Features Section';
  };
  attributes: {
    description: Attribute.Text;
    feature: Attribute.Component<'molecules.feature', true>;
    title: Attribute.String;
  };
}

export interface LayoutsFooter extends Schema.Component {
  collectionName: 'components_layouts_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    logo: Attribute.Component<'atoms.link'>;
    socialLink: Attribute.Component<'atoms.link', true>;
    text: Attribute.Text;
  };
}

export interface LayoutsHeader extends Schema.Component {
  collectionName: 'components_layouts_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    ctaButton: Attribute.Component<'atoms.link'>;
    logo: Attribute.Component<'atoms.link'>;
  };
}

export interface LayoutsHeroSection extends Schema.Component {
  collectionName: 'components_layouts_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
    icon: 'picture';
  };
  attributes: {
    heading: Attribute.String;
    image: Attribute.Media<'images'>;
    link: Attribute.Component<'atoms.link'>;
    subHeading: Attribute.Text;
  };
}

export interface MoleculesFeature extends Schema.Component {
  collectionName: 'components_molecules_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    heading: Attribute.String;
    icon: Attribute.Enumeration<['CLOCK_ICON', 'CHECK_ICON', 'CLOUD_ICON']>;
    subHeading: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'atoms.link': AtomsLink;
      'layouts.features-section': LayoutsFeaturesSection;
      'layouts.footer': LayoutsFooter;
      'layouts.header': LayoutsHeader;
      'layouts.hero-section': LayoutsHeroSection;
      'molecules.feature': MoleculesFeature;
    }
  }
}
