export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About CoastalLegend",
      };
      return h.view("about-view", viewData);
    },
  },
};
