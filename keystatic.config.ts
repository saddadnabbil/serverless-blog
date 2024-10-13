import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        pathPrefix: 'prod',
        repo: 'saddadnabbil/serverless-blog',
    },
    ui: {
        brand: {
            name: 'Saddad Nabbil',
        },
        navigation: {
            blog: ['posts', 'authors', 'categories', 'tags'],
        },
    },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
            label: 'Description',
            multiline: true,
            validation: { isRequired: false },
          }),
          heroImage: fields.image({
            label: 'Hero Image',
            directory: '/thumbnail',
            validation: { isRequired: false },
          }),
          pubDate: fields.date({
            label: 'Publish Date',
            validation: { isRequired: true },
          }),
        categories: fields.array(
          fields.relationship({ 
            collection: 'categories', 
            label: 'Category',
            validation: { isRequired: true },
           }),
          { 
            label: 'Categories',
            itemLabel: (item) => item.value || 'Please select an category',
           }
        ),
        authors: fields.array(
          fields.relationship({ collection: 'authors', label: 'Author', validation: { isRequired: true },  }),
          { label: 'Authors',
            itemLabel: (item) => item.value || 'Please select an author'
           }
        ),
        tags: fields.array(
          fields.relationship({ collection: 'tags', label: 'Tag', validation: { isRequired: true }, }),
          { label: 'Tags',
            itemLabel: (item) => item.value || 'Please select an tag'
           }
        ),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/content/categories/*',
      schema: {
        name: fields.text({ label: 'Category Name' }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      schema: {
        name: fields.text({ label: 'Author Name' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.image({ label: 'Avatar', directory: '/avatars' }),
      },
    }),
    tags: collection({
      label: 'Tags',
      slugField: 'name',
      path: 'src/content/tags/*',
      schema: {
        name: fields.text({ label: 'Tag Name' }),
      },
    }),
  },
});
