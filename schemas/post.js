import Tabs from "sanity-plugin-tabs";

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: "tabs",
      type: "object",
      inputComponent: Tabs,
      fieldsets: [
        { name: "main", title: "Main", options: { sortOrder: 10 } },
        { name: "secondary", title: "Secondary", options: { sortOrder: 20 } },
        { name: "seo", title: "SEO", options: { sortOrder: 30 } }
      ],
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          fieldset: "main"
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          fieldset: "seo",
          validation: Rule => Rule.required(),
          options: {
            source: (doc, options) => {
              return doc.tabs.title;
            },
            maxLength: 96
          }
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          fieldset: "secondary",
          to: {type: 'author'}
        },
        {
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          fieldset: "main",
          options: {
            hotspot: true
          }
        },
        {
          name: 'categories',
          title: 'Categories',
          type: 'array',
          fieldset: "secondary",
          of: [{type: 'reference', to: {type: 'category'}}]
        },
        {
          name: 'publishedAt',
          title: 'Published at',
          type: 'datetime',
          fieldset: "secondary"
        },
        {
          name: 'body',
          title: 'Body',
          type: 'blockContent',
          fieldset: "main"
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'tabs.title',
      author: 'tabs.author.name',
      media: 'tabs.mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}