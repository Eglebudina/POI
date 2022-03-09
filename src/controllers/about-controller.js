export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Poi",
        };
        return h.view("about-view", viewData);
      },
    },
  };