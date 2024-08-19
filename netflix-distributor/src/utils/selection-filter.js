export default function selectionFilter({ series, films, watchLists, recommendationLists } = {}) {
  // Helper function to filter and format data for a specific genre
  const filterAndFormatData = (items, genre) => ({
    title: genre,
    data: items ? items.filter(item => item.genre === genre) : []
  });

  return {
    series: [
      filterAndFormatData(series, 'documentaries'),
      filterAndFormatData(series, 'comedies'),
      filterAndFormatData(series, 'children'),
      filterAndFormatData(series, 'crime'),
      filterAndFormatData(series, 'feel-good'),
    ],
    films: [
      filterAndFormatData(films, 'drama'),
      filterAndFormatData(films, 'thriller'),
      filterAndFormatData(films, 'children'),
      filterAndFormatData(films, 'suspense'),
      filterAndFormatData(films, 'romance'),
    ],
    watchLists: [
      filterAndFormatData(watchLists, 'drama'),
      filterAndFormatData(watchLists, 'thriller'),
      filterAndFormatData(watchLists, 'children'),
      filterAndFormatData(watchLists, 'suspense'),
      filterAndFormatData(watchLists, 'romance'),
      filterAndFormatData(watchLists, 'documentaries'),
      filterAndFormatData(watchLists, 'comedies'),
      filterAndFormatData(watchLists, 'children'),
      filterAndFormatData(watchLists, 'crime'),
      filterAndFormatData(watchLists, 'feel-good'),
    ].filter(category => category.data.length > 0), // Filter out categories with no data
    recommendationLists: [
      filterAndFormatData(recommendationLists, 'drama'),
      filterAndFormatData(recommendationLists, 'thriller'),
      filterAndFormatData(recommendationLists, 'children'),
      filterAndFormatData(recommendationLists, 'suspense'),
      filterAndFormatData(recommendationLists, 'romance'),
      filterAndFormatData(recommendationLists, 'documentaries'),
      filterAndFormatData(recommendationLists, 'comedies'),
      filterAndFormatData(recommendationLists, 'children'),
      filterAndFormatData(recommendationLists, 'crime'),
      filterAndFormatData(recommendationLists, 'feel-good'),
    ].filter(category => category.data.length > 0) // Filter out categories with no data

  };
}
