<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "title": "{{ title or metadata.title }}",
      "url": "https://aussieextensions.com.au{{ page.url or post.url or permalink }}",
       "description": "{{ description or metadata.description or eleventyComputed.description }}",
      "image": "{{ image or metadata.image or eleventyComputed.image }}",
      "datePublished": "{{ page.datecreated or datecreated }}",
      "dateModified": "{{ page.date }}"
    }
    </script>


